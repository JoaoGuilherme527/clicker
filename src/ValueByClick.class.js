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
        this.cost = this.cost + this.cost * 2
    }
    increaseValue() {
        this.valueByClick = Number((this.valueByClick + this.valueByClick * 0.5).toFixed(0))
    }

    getValues() {
        return {
            cost: this.cost,
            value: this.valueByClick,
        }
    }
}
