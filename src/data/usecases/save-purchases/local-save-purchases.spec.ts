import { CacheStore } from "@/data/protocols/cache";
import { LocalSavePurchases } from "@/data/usecases";
import { SavePurchases } from "@/domain";

class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;
  insertCallsCount = 0;
  deleteKey: string;
  insertKey: string;
  insertValues: Array<SavePurchases.Params> = [];

  delete(key: string): void {
    this.deleteCallsCount++;
    this.deleteKey = key;
  }

  insert(key: string, values: any): void {
    this.insertCallsCount++;
    this.insertKey = key;
    this.insertValues = values;
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      throw new Error();
    });
  }
}

const mackPurchases = (): Array<SavePurchases.Params> => {
  return [
    {
      id: "1",
      date: new Date(),
      value: 50,
    },
    {
      id: "2",
      date: new Date(),
      value: 50,
    },
  ];
};

type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);
  return {
    sut,
    cacheStore,
  };
};

describe("LocalSavePurchases", () => {
  test("Should not delete cache on sut.init", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  test("Should delete old cache on sut.save", async () => {
    const { cacheStore, sut } = makeSut();
    await sut.save(mackPurchases());
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.deleteKey).toBe("purchases");
  });

  test("Should not insert new Cache if delete fails", () => {
    const { cacheStore, sut } = makeSut();
    cacheStore.simulateDeleteError();
    const promise = sut.save(mackPurchases());
    expect(cacheStore.insertCallsCount).toBe(0);
    expect(promise).rejects.toThrow();
  });

  test("Should insert new Cache if delete succeeds", async () => {
    const { cacheStore, sut } = makeSut();
    const purchases = mackPurchases();
    await sut.save(mackPurchases());
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.insertCallsCount).toBe(1);
    expect(cacheStore.insertKey).toBe("purchases");
    expect(cacheStore.insertValues).toEqual(purchases);
  });
});
