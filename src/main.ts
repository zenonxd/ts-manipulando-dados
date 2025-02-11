import {fetchData} from "./fetchData.ts";
import newInterface from "./manipulandoDados.ts";
import Estatisticas from "./estatisticas.ts";
import StatusPagamento from "./manipulandoDados.ts"
import {c} from "vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";



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

function consultStatus(transactions: Transaction[]) {

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

function consultPayment(transactions: Transaction[]) {

    const counts = transactions.reduce(
        (acc, item) => {
            if (item.formaDePagamento === 'Boleto') acc.boleto += 1;
            if (item.formaDePagamento === 'Cartão de Crédito') acc.cartaoCredito += 1;

            return acc;
        }, {cartaoCredito: 0, boleto: 0})
    document.getElementById('cc')!.textContent = `Cartão de Crédito: ${counts.cartaoCredito}`;
    document.getElementById('boleto')!.textContent = `Boleto: ${counts.boleto}`;
}

function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


function bestDaySales(transactions: Transaction[]) {

    const salesByDay = transactions.reduce((acc, item) => {
        const dateString = formatDate(item.data);

        if (acc[dateString]) {
            acc[dateString] += item.valor!;
        } else {
            acc[dateString] = item.valor!;
        }

        return acc;
    }, {} as Record<string, number>);

    let bestDay = '';
    let maxSales = 0;

    for (const date in salesByDay) {
        if (salesByDay[date] > maxSales) {
            maxSales = salesByDay[date];
            bestDay = date;
        }
    }


    document.getElementById('bestDay')!.textContent = `Melhor dia de venda: ${bestDay}
    com vendas totais de ${maxSales.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`;
    
}

async function handleData() {
    const data =  await fetchData<Array<TransactionAPI>>('https://api.origamid.dev/json/transacoes.json');

    if (!data) return;

    const transactions = data.map(newInterface);

    console.log(transactions);

    fillTable(transactions);
    fillStatistics(transactions);

    consultStatus(transactions);
    consultPayment(transactions);
    
    bestDaySales(transactions);

}

handleData();