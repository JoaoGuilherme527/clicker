import { formatNumber } from "../utils/formatNumbertoCurrency"

export class ValueByClick {
    name = "Click value"
    description = `$ ${formatNumber(this.showValues().value)}/click`
    disabled = false

    constructor({cost, value}) {
        this.cost = cost
        this.value = value
        this.description = `$ 1.000/${value + 1} seconds`

    }

    handlePurchase(currentAmount, callBack) {}

    increase() {
        this.increaseValue()
        this.increaseCost()
        localStorage.setItem("valueByClick", JSON.stringify({cost: this.cost, value: this.value}))
    }

    increaseCost() {
        this.cost = Number((this.value * 10 + 800).toFixed(0))
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
}
