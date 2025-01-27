export class ValueByClick {
    constructor(cost, valueByClick) {
        this.cost = cost
        this.valueByClick = valueByClick
    }

    increaseBoth() {
        this.increaseValue()
        this.increaseCost()
        localStorage.setItem("valueByClick", JSON.stringify({cost: this.cost, value: this.valueByClick}))
    }

    increaseCost() {
        this.cost = Number((this.valueByClick * 10 + 800).toFixed(0))
    }
    increaseValue() {
        this.valueByClick += 1
    }

    showValues() {
        return {
            cost: this.cost,
            value: this.valueByClick + 1,
        }
    }

    getValues() {
        return {
            cost: this.cost,
            value: this.valueByClick,
        }
    }
}
