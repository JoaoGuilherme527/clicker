export function formatNumber(number) {
    return new Intl.NumberFormat("de-DE").format(Number(number.toFixed(0)))
    
}