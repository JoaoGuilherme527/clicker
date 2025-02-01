export class ThousandByTime {
    name = "Thousand by time"
    disabled = this.showValues().time === 0

    constructor({cost, time, value}) {
        this.cost = cost
        this.time = time
        this.value = value
        this.description = `$ 1.000/${time > 10 ? time - 10 : time - 2} seconds`

    }

    handlePurchase(currentAmount, callBack){
    }

    increase() {
        this.increaseCost()
        this.decreaseTime()
        this.increaseValue()
        localStorage.setItem("thousandByTime", JSON.stringify({cost: this.cost, time: this.time, value: this.value}))
    }

    increaseCost() {
        this.cost = Math.floor(this.cost * (this.time > 10 ? 3 : 1.5))
    }

    increaseValue() {
        this.value = this.value === 0 ? 1000 : 1000
    }

    decreaseTime() {
        if (this.time > 10) {
            this.time -= 10
        } else if (this.time === 2) {
            this.time -= 1
        } else {
            this.time -= 2
        }
    }

    showValues() {
        return {
            cost: this.cost,
            time: this.time > 10 ? this.time - 10 : this.time - 2,
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
