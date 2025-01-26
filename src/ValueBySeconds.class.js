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

    constructor(cost, valueBySeconds) {
        this.cost = cost
        this.valueBySeconds = valueBySeconds
    }

    increaseBoth() {
        this.increaseCost()
        this.increaseValue()
        localStorage.setItem("valueBySeconds", JSON.stringify({cost: this.cost, value: this.valueBySeconds}))
    }

    increaseCost() {
        this.cost = Number((this.cost + this.cost * 0.15).toFixed(1))
    }
    increaseValue() {
        this.valueBySeconds = Number((this.valueBySeconds + 0.4).toFixed(1))
    }

    showValues() {
        return {
            cost: this.cost,
            value: Number((this.valueBySeconds + 0.4).toFixed(1)),
        }
    }

    getValues() {
        return {
            cost: this.cost,
            value: this.valueBySeconds,
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
