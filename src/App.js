/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import {useEffect, useLayoutEffect, useState} from "react"
import "./App.css"
import {ValueBySeconds} from "./classes"
import ShopItem from "./components/buttons/ShopItem"

function App() {
    let interval

    const bySecondsPurchase = new ValueBySeconds(1, 100)

    const [currentAmountValue, setCurrentAmountValue] = useState(576 + 340 + 1382)
    const [currentClickerValue, setCurrentClickerValue] = useState(1)
    const [currentBySecondsCost, setCurrentBySecondsCost] = useState(100)
    const [valueBySeconds, setValueBySeconds] = useState(0)

    const magnitudeOrder = " " + bySecondsPurchase.convert(currentAmountValue)

    const increaseCurrentAmountValue = (value) => setCurrentAmountValue((prevState) => (prevState += value))
    const decreaseCurrentAmountValue = (value) => setCurrentAmountValue((prevState) => (prevState -= value))

    const handleBySecondsPurchase = () => {
        if (currentAmountValue < currentBySecondsCost) return
        var {cost, value} = bySecondsPurchase.increase(currentBySecondsCost, valueBySeconds)
        decreaseCurrentAmountValue(currentBySecondsCost)
        setCurrentBySecondsCost(cost)
        setValueBySeconds(value)
    }

    function startInterval() {
        interval = setInterval(() => {
            increaseCurrentAmountValue(valueBySeconds)
        }, 1000)
    }

    function formatNumber(params) {
        return new Intl.NumberFormat("de-DE").format(Number(params.toFixed(0)))
    }

    useLayoutEffect(() => {
        startInterval()
        return () => {
            clearInterval(interval)
        }
    }, [valueBySeconds])

    return (
        <main className="main" onClick={() => increaseCurrentAmountValue(currentClickerValue)}>
            <p className="currentAmountValue">
                <strong>$</strong>
                {formatNumber(currentAmountValue)}
                {magnitudeOrder}
            </p>
            <button className="mainButton">CLICK</button>

            <div className="shop">
                <ShopItem
                    name={"Click value"}
                    onClick={()=>{}}
                    description={`$ ${currentClickerValue}/click`}
                    cost={100}
                />
                <ShopItem
                    name={"Auto clicker"}
                    onClick={handleBySecondsPurchase}
                    description={`$ ${valueBySeconds + 1}/seconds`}
                    cost={formatNumber(currentBySecondsCost)}
                />
            </div>
        </main>
    )
}

export default App
