import {ThousandByTime} from "./ThousandByTime.class"
import {ValueByClick} from "./ValueByClick.class"
import {ValueBySeconds} from "./ValueBySeconds.class"

export class App {
    valueBySeconds = {cost: 25, value: 0}
    valueByClick = {cost: 200, value: 1}
    thousandByTime = {cost: 500, value: 0, time: 70}
    currentAmount = 1000000000

    constructor() {
        const currentAmountStorage = localStorage.getItem("currentAmount")
        const valueBySecondsStorage = localStorage.getItem("valueBySeconds")
        const valueByClickStorage = localStorage.getItem("valueByClick")
        const thousandByTimeStorage = localStorage.getItem("thousandByTime")

        let currentAmount = currentAmountStorage ? Number(currentAmountStorage) : this.currentAmount
        let valueBySeconds = valueBySecondsStorage ? JSON.parse(valueBySecondsStorage) : this.valueBySeconds
        let valueByClick = valueByClickStorage ? JSON.parse(valueByClickStorage) : this.valueByClick
        let thousandByTime = thousandByTimeStorage ? JSON.parse(thousandByTimeStorage) : this.thousandByTime

        valueBySeconds = new ValueBySeconds(valueBySeconds)
        valueByClick = new ValueByClick(valueByClick)
        thousandByTime = new ThousandByTime(thousandByTime)

        let itens = [valueBySeconds, valueByClick, thousandByTime]

        return {
            currentAmount,
            valueByClick,
            valueBySeconds,
            thousandByTime,
            itens
        }
    }
}
