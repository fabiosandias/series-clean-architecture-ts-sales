# Carregar Compras Cache

## Case de sucesso

1. Sistema executa o camando "Carregar Compras"
2. Sistema carrega os dados do Cache
3. Sistema valida se o Cache tem menos de 3 dias
4. Sistema cria uma lista de compras a partir dos dados do cache
5. Sistema retorna a lista de compras

## Excecão - Cache expirado

1. Sistema limpa cache
2. Sistema retorna erro
