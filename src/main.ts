import {fetchData} from "./fetchData.ts";
import newInterface from "./manipulandoDados.ts";



async function handleData() {
    const data =  await fetchData<Array<TransactionAPI>>('https://api.origamid.dev/json/transacoes.json');

    if (!data) return;

    const transactions = data.map(newInterface);

    console.log(transactions);

}

handleData();