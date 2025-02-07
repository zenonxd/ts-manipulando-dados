import moedaToNumber from "./moedaToNumber.ts";
import dataStringToDate from "./stringDataToDate.ts";

declare global {

    type TipoPagamento = 'Cartão de Credito' | 'Boleto';

    type StatusPagamento =
        'Paga'
        | 'Recusada pela operadora de cartão'
        | 'Aguardando pagamento'
        | 'Estornada';

    interface TransactionAPI {
        Nome: string;
        ID: number;
        Data: string;
        Email: string;
        Status: StatusPagamento;
        ['Forma de Pagamento']: TipoPagamento;
        ['Valor (R$)']: string;
        ['Cliente Novo']: number;
    }

    interface Transaction {
        nome: string;
        id: number;
        data: Date;
        status: StatusPagamento;
        email: string;
        moeda: string;
        valor: number | null;
        formaDePagamento: TipoPagamento;
        clienteNovo: boolean;
    }
}

export default function newInterface(transaction: TransactionAPI): Transaction {
    return {
        nome: transaction.Nome,
        id: transaction.ID,
        data: dataStringToDate(transaction.Data),
        email: transaction.Email,
        status: transaction.Status,
        moeda: transaction["Valor (R$)"], // Assume currency is always 'R$'
        valor: moedaToNumber(transaction["Valor (R$)"]),
        formaDePagamento: transaction['Forma de Pagamento'],
        clienteNovo: Boolean(transaction['Cliente Novo']), // Convert boolean to boolean
    }

}