import {Transaction} from "./manipulandoDados.ts";

type TransactionValor = Transaction & { valor: number};

function filterValue(transacao: Transaction): transacao is TransactionValor {
    return transacao.valor !== null;

}

export default class Estatisticas {

    private transacoes;
    total = 0;

    constructor(transacoes: Transaction[]) {
        this.transacoes = transacoes;
        this.total = this.setTotal();

    }


    private setTotal() {
        const filtrado = this.transacoes
            .filter(transacao => filterValue(transacao))
            .reduce(
                (acumulador, itemAtual) => {
                    return acumulador + itemAtual.valor;
                }, 0 //valor inicial
            )

        return filtrado;
    }
}