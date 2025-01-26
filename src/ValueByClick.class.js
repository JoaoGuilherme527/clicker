export class ValueByClick {
    constructor(cost, valueByClick) {
        this.cost = cost
        this.valueByClick = valueByClick
    }

    increaseBoth() {
        this.increaseCost()
        this.increaseValue()
        localStorage.setItem("valueByClick", JSON.stringify({cost: this.cost, value: this.valueByClick}))
    }

    increaseCost() {
        this.cost = Number((this.cost + this.cost * 0.8).toFixed(1))
    }
    increaseValue() {
        this.valueByClick = Number((this.valueByClick + this.valueByClick * 0.5).toFixed(1))
    }

    showValues() {
        return {
            cost: this.cost,
            value: (this.valueByClick + this.valueByClick * 0.5).toFixed(1),
        }
    }

    getValues() {
        return {
            cost: this.cost,
            value: this.valueByClick,
        }
    }
}
