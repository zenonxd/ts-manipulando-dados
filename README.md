# About

Projeto da etapa 06 do curso de TypeScript da Origamid.

O objeto é:

1. Acesse os dados da api: https://api.origamid.dev/json/transacoes.json

2. Mostre em uma tabela os dados de cada transação.

3. Calcule:

  - Soma total dos valores

  - Transações por meio de pagamento.

  - Transações por status.

  - Total de vendas por dia da semana.

  - Dia da semana com mais vendas.

  - Mostre as estatísticas na tela.

  - Organize o código em pequenos módulos.

  - Normalize os dados da API se achar necessário.

# Tips

## Manuseando os dados - Aula2

Inicialmente, podemos criar um módulo responsável por puxar os dados.

Dica para o método de fetch:

Trabalhar com try-catch e checar o status da resposta para cair no catch se tiver algum erro.

Além disso, podemos settar tipos genéricos também ou null caso não tenha nada.

<hr>

Depois, podemos manejar os dados, dicas:

A função para validar pode alocar a função de fetch (deixar numa constante).

Se um forEach quebra, ele PARA o código todo. Então é bom fazer uma verificação se o dado existe.

Como a interface tá quebrada com as propriedades mal escritas, precisamos reformular elas e para isso utilizamos
Interface.

Se tá escrito `Tipo de Dado:`, você pode passar dentro de [] com aspas.

<hr>

**SEMPRE ANALISE A API!**

A forma de pagamento, podemos ter várias, então a gente pode criar um tipo para alocar as formas de pagamento
e inserir na interface depois. Ver outras propriedades que pode ser feito a mesma coisa.

## Normalizando dados - Aula3

Analisando a API, temos uns dados meios... estranhos, correto? Valores retornando em String, por exemplo. Clientes novos
estão como 1 ou 0 e deveriam ser boolean também. E o principal, data está como String e deveria ser do tipo Data.

O que é bacana a partir de agora, é o arquivo ``script.ts`` ficar só com a parte de execução de jogo.

Então faz muito sentido a gente criar um arquivo ``.ts`` responsável por manejar os dados.

Esse arquivo pode conter os tipos criados e a interface, juntamente com uma função responsável por tratar
essa interface.

Para que o script consiga ainda receber a interface que agora pertence a outro arquivo, podemos usar o tipo global
``declare global{}`` e colocando o que queremos ali dentro.

<hr>

No tocante a função responsável por tratar a interface com novas propriedades, podemos criar uma nova no escopo
global.

No método, é simplesmente receber a interface inicial e retornar a nova settando os atributos.

A propriedade boolean se for 0 = false e 1 = true.

<hr>

Voltando para o script, podemos utilizar a função. Vamos a mais dicas:

Se fizemos um if inline assim: ``if(!data) return`` << isso aqui já quebra o código e não precisa fazer um if-else enorme.

Depois podemos criar uma constante para alocar a transação fazendo um map. **Uma dica: o map recebe uma função e dependendo
do seu retorno, ela vai ser o valor de CADA ITEM da array.**

## Moeda (String) pra number - Aula 4

Criaremos um módulo para isso.

A função receberá uma string para retornar um number ou null.

Essa função, ela irá ficar alocada dentro da propriedade valor onde estamos retornando a nova interface (do modulo anterior).

Dentro dela, podemos alocar a string desejada.

No método em sí é simples, só trocar "." por nada e "," por ".", fazendo depois o casting para Number.

Como alguns valores são "-", precisamos verificar se são NaN e caso sejam, retornar null.

## Data (String) para Date - Aula5

Criar um novo módulo.

Utilizar a biblioteca parse para converter de formato americano para o nosso e retornamos a data.

## Preenchendo tabela - Aula6

No próprio arquivo do script podemos criar uma função para preencher a tabela. 

Para indicar que estamos manipulando o DOM, podemos declarar ela com retorno de void.

Essa função ela deve ser ativada dentro de handleData, e vai receber a interface "transacao".

<hr>

No tocante ao HTML precisamos criar a tabela.

Table -> THead -> TR (row) -> TH

E depois, criar o TBody para ser preenchido.

<hr>

Na parte da função é simples, selecionar a tabela, verificar se ela existe e continuar com o forEach.

Só criar um TR e TD e preencher.

Para a estilização ver o final da aula 6.

## Estatística 

### Total - Aula7

Poderíamos fazer com uma função, mas faremos excepcionalmente com uma classe.

Podemos criar um module e uma classe, exportando-a logo no início.

Dicas: 

1. A interface está no escopo global e pode ser utilizada.
2. Pode criar propriedades e atributos dentro da classe
3. Lembrar de criar o construtor e passar os atributos dentro da função
4. Lembrar de getters e setters dentro da classe
5. Filtrar valor, utilizando filter, fazendo verificação de dado com predicate

``toLocaleString("pt-BR", {style: "currency", currency: "BRL"});``, para arrumar o valor/decimal.

### CountBy - Aula8

Função para pegar o total de compras feitas em: cartão, boleto.

Além disso, total de contas que foram: pagas, recusadas, aguardamento pagamento, estornada e dias com mais vendas.

# Dicas Geral

Usar TypePredicate dentro de filter!