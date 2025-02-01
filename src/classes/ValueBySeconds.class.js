import {formatNumber} from "../utils/formatNumbertoCurrency"

export class ValueBySeconds {
    orderOfMagnitudeTable = {
        6: "Million",
        9: "Billion",
        12: "Trillion",
        15: "Quadrillion",
        18: "Quintillion",
        21: "Sextillion",
        24: "Septillion",
        27: "Octillion",
        30: "Nonillion",
        33: "Decillion",
    }
    name = "Auto clicker"
    disabled = false

    constructor({cost, value}) {
        this.cost = cost
        this.value = value
        this.description = `$ ${formatNumber(value + 1)}/second`
    }

    increase() {
        this.increaseValue()
        this.increaseCost()
        localStorage.setItem("valueBySeconds", JSON.stringify({cost: this.cost, value: this.value}))
    }

    increaseCost() {
        this.cost = Number((this.value * 10 + 300).toFixed(0))
    }
    
    increaseValue() {
        this.value += 1
    }

    showValues() {
        return {
            cost: this.cost,
            value: this.value + 1,
        }
    }

    getValues() {
        return {
            cost: this.cost,
            value: this.value,
        }
    }

    getOrderOfMagnitude(x) {
        return this.orderOfMagnitudeTable[x]
    }

    convert(n) {
        if (n < 1000000) return ""
        let order = Math.floor(Math.log10(n))

        while (order % 3 !== 0) {
            order--
        }

        return " " + this.getOrderOfMagnitude(order)
    }
}
