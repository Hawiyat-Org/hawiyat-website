export function getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }
  
  export function getFirstDayOfMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }
  
  export function addMonths(date: Date, months: number): Date {
    const d = new Date(date)
    d.setMonth(d.getMonth() + months)
    return d
  }
  
  export function format(date: Date, formatStr: string): string {
    const map: { [key: string]: number | string } = {
      mm: date.getMonth() + 1,
      dd: date.getDate(),
      yyyy: date.getFullYear(),
      yy: String(date.getFullYear()).slice(-2),
    }
    
    return formatStr.replace(/mm|dd|yyyy|yy/gi, (matched) => String(map[matched]))
  }
  