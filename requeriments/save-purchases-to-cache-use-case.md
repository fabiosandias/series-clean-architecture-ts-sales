# Gravar Compras no Cache

## Caso de sucesso

1. Sistema Executa o camando "Salvar Comprar"
2. Sistema cria data uma data para ser armazenada no cache
3. ✅ Sistema apaga os dados do Cache atual
4. Sistema grava os novos dados no cache
5. Sistema não retorna nenhum erro

## Excecão - Erro ao apagar dados do Cache

1. ✅ Sistema não grava os novos dados do Cache
2. ✅ Sistema retorna erro

## Excecão - Erro ao gravar dados do cache

1. Sistema retorna erro
