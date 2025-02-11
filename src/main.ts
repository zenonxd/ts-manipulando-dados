import {fetchData} from "./fetchData.ts";
import newInterface from "./manipulandoDados.ts";
import Estatisticas from "./estatisticas.ts";
import StatusPagamento from "./manipulandoDados.ts"



function fillTable(transactions: Transaction[]) {
    const tabela = document.getElementById('tabela');

    if (tabela) {

        transactions.forEach(transaction => {
            const row = document.createElement('tr');

            const tdNome = document.createElement('td');
            tdNome.textContent = transaction.nome;

            const tdEmail = document.createElement('td');
            tdEmail.textContent = transaction.email;

            const tdCompra = document.createElement('td');
            const valorFormatado = transaction.valor?.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })!;

            tdCompra.textContent = valorFormatado;


            const tdPagamento = document.createElement('td');
            tdPagamento.textContent = transaction.formaDePagamento;

            const tdStatus = document.createElement('td');
            tdStatus.textContent = transaction.status;

            row.appendChild(tdNome);
            row.appendChild(tdEmail);
            row.appendChild(tdCompra);
            row.appendChild(tdPagamento);
            row.appendChild(tdStatus);

            tabela.appendChild(row);
        })
    }

}

function fillStatistics(transactions: Transaction[]) {
    const data = new Estatisticas(transactions);

    const total = document.getElementById('total');
    if (total) {
        total.textContent = `Total: 
            ${data.total.toLocaleString('pt-BR', 
            {style: 'currency', currency: 'BRL'

        })}`;
    }

    console.log(data.total);
}

function consultData(transactions: Transaction[]) {

    const counts = transactions.reduce(
        (acc, item) => {
            if (item.status === 'Paga') acc.paga +=1;
            if (item.status === 'Estornada') acc.estornada +=1;
            if (item.status === 'Aguardando pagamento') acc.aguardando +=1;
            if (item.status === 'Recusada pela operadora de cartão') acc.recusada +=1;

            return acc;

        }, {paga: 0, estornada: 0, aguardando: 0, recusada: 0});

    document.getElementById('pagas')!.textContent = `Transações pagas: ${counts.paga}`;
    document.getElementById('estornadas')!.textContent = `Transações estornadas: ${counts.estornada}`;
    document.getElementById('aguardando')!.textContent = `Transações aguardando pagamento: ${counts.aguardando}`;
    document.getElementById('recusada')!.textContent = `Transações recusadas pela operadora de cartão: ${counts.recusada}`;

}

async function handleData() {
    const data =  await fetchData<Array<TransactionAPI>>('https://api.origamid.dev/json/transacoes.json');

    if (!data) return;

    const transactions = data.map(newInterface);

    console.log(transactions);

    fillTable(transactions);
    fillStatistics(transactions);

    consultData(transactions);

}

handleData();