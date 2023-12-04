const dayInMillis = 1000*60*60*24; // Millisekunden in einem Tag -> 1 sek * 1 min * 60 min * 24 Stunden

export function addDays(date, number) { // date steht hier für datum (als Startwert), number steht für anzahl der Tage
    return new Date(date.getTime() + number*dayInMillis); // date.getTime gibt die Anzahl der Millisekunden zurück seit dem 01.06.1970
}

export function getDayIndex(date) { // Wochenstart wird auf Montag gelegt
    const falseIndex = date.getDay();
    return falseIndex === 0 ? 6 : falseIndex -1; //standardmaessig hat Montag den Index 1 da Sonntag 0 ist, daher ändern wir Montag auf 0 um
}

export function dateString(date) {
    return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}
