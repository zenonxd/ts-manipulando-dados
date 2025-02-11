

export default function moedaToNumber(moeda: string): number | null {

    const numero = Number(moeda.replace(".", "").replace(",", "."));

    return isNaN(numero) ? null : numero;

}