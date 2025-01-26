export class ThousandByTime {
    constructor(cost, time, value) {
        this.cost = cost
        this.time = time
        this.value = value
    }

    increase() {
        this.increaseCost()
        this.decreaseTime()
        this.increaseValue()
        localStorage.setItem("thousandByTime", JSON.stringify({cost: this.cost, time: this.time, value: this.value}))
    }

    increaseCost() {
        this.cost = this.cost * 3
    }

    increaseValue() {
        this.value = this.value === 0 ? 1000 : 1000
    }

    decreaseTime() {
        this.time = this.time - 10
    }

    showValues() {
        return {
            cost: this.cost,
            time: this.time,
            value: this.value,
        }
    }

    getValues() {
        return {
            cost: this.cost,
            time: this.time,
            value: this.value,
        }
    }
}
