

export function date_time_from_micro(timestamp: number): Date {
    return new Date(timestamp / 1000);
}

export function hhmmss_date_time_from_micro(timestamp: number): string {
    let temp = new Date(timestamp / 1000);
    return `${temp.getHours().toString().padStart(2, '0')}:${temp.getMinutes().toString().padStart(2, '0')}:${temp.getSeconds().toString().padStart(2, '0')}`;
}

export function ddmmyy_date_time_from_micro(timestamp: number): string {
    let temp = new Date(timestamp / 1000);
    return `${temp.getDate().toString().padStart(2, '0')}/${(temp.getMonth()+1).toString().padStart(2, '0')}/${temp.getFullYear()}`;
}

/*
export function date_time_from_micro(timestamp: number): Date {
    return new Date(timestamp / 1000);
}
*/

