export class ValueBySeconds {
    orderOfMagnitudeTable = {
        6: "Mi",
        9: "Bi",
        12: "Tri",
        15: "Qua",
        18: "Qui",
        21: "Sext",
        24: "Sep",
        27: "Oct",
        30: "Sep",
        33: "Non",
        36: "Dec",
    }

    increase(cost, valueBySeconds) {
        var calc = cost * 0.4 + cost * 2
        return {cost: calc, value: valueBySeconds + 1}
    }

    getOrderOfMagnitude(x) {
        return this.orderOfMagnitudeTable[x]
    }

    convert(n) {
        var order = Math.floor(Math.log(n) / Math.LN10 + 0.000000001)
        var convertedValue = Math.pow(10, order)

        return convertedValue < 1000000 ? "" : this.getOrderOfMagnitude(order)
    }
}
