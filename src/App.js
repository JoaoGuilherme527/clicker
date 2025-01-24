/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import {useEffect, useState} from "react"
import "./App.css"
import {ValueBySeconds} from "./classes"

function App() {
    let interval

    const bySecondsPurchase = new ValueBySeconds(1, 100)

    const [currentAmountValue, setCurrentAmountValue] = useState(0)
    const [currentClickerValue, setCurrentClickerValue] = useState(1)
    const [currentBySecondsCost, setCurrentBySecondsCost] = useState(100)
    const [valueBySeconds, setValueBySeconds] = useState(1)

    const increaseCurrentAmountValue = (value) => setCurrentAmountValue((prevState) => (prevState += value))
    const decreaseCurrentAmountValue = (value) => setCurrentAmountValue((prevState) => (prevState -= value))

    const magnitudeOrder = " " + bySecondsPurchase.convert(currentAmountValue)

    const handleBySecondsPurchase = () => {
        if (currentAmountValue < currentBySecondsCost) return
        var updatedBySecondsPurchase = bySecondsPurchase.increase(currentBySecondsCost, valueBySeconds)
        decreaseCurrentAmountValue(currentBySecondsCost)
        setCurrentBySecondsCost(updatedBySecondsPurchase.cost)
        setValueBySeconds(updatedBySecondsPurchase.value)
        startInterval()
    }

    function startInterval() {
        interval = setInterval(() => {
            increaseCurrentAmountValue(valueBySeconds)
        }, 1000)
    }

    useEffect(() => {
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <main className="main" onClick={() => increaseCurrentAmountValue(currentClickerValue)}>
            <p className="currentAmountValue">
                <strong>$</strong>
                {new Intl.NumberFormat("de-DE").format(Number(currentAmountValue))}
                {magnitudeOrder}
            </p>
            <button onClick={() => increaseCurrentAmountValue(currentClickerValue)} className="mainButton">CLICK</button>

            <div className="shop">
                <div className="bySecondsPurchase">
                    <div>
                        <p>Click per second</p>
                        <p>${valueBySeconds}/second</p>
                    </div>
                    <button onClick={handleBySecondsPurchase}>
                        - $ {new Intl.NumberFormat("de-DE").format(Number(currentBySecondsCost.toFixed(0)))}
                    </button>
                </div>
            </div>
        </main>
    )
}

export default App
