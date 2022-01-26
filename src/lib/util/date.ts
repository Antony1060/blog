const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"];

export const format = (date: Date): string => 
    `${monthNames[date.getMonth()]} ${(date.getDate() + "").padStart(2, "0")} ${date.getFullYear()}`