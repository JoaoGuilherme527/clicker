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
        this.increaseValue()
        this.increaseCost()
        localStorage.setItem("valueBySeconds", JSON.stringify({cost: this.cost, value: this.valueBySeconds}))
    }

    increaseCost() {
        this.cost = Number((this.valueBySeconds * 50 + 25).toFixed(0))
    }
    increaseValue() {
        this.valueBySeconds += 1
    }

    showValues() {
        return {
            cost: this.cost,
            value: this.valueBySeconds + 1,
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
