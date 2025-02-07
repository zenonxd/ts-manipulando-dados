import { parse } from 'date-fns';

export default function dataStringToDate(data: string): Date {
    const date = parse(data, 'dd/MM/yyyy HH:mm', new Date());

    return date;
}

