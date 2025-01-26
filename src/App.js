/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useEffect, useState, useMemo} from "react"
import "./App.css"
import ShopItem from "./components/buttons/ShopItem"
import {ValueBySeconds} from "./ValueBySeconds.class.js"
import {ValueByClick} from "./ValueByClick.class.js"

function App() {
    const valueBySeconds = useMemo(() => {
        const isStorage = localStorage.getItem("valueBySeconds")
        const {cost, value} = isStorage ? JSON.parse(isStorage) : {cost: 100, value: 0}
        return new ValueBySeconds(cost, value)
    }, [])
    const valueByClick = useMemo(() => {
        const isStorage = localStorage.getItem("valueByClick")
        const {cost, value} = isStorage ? JSON.parse(isStorage) : {cost: 200, value: 1}
        return new ValueByClick(cost, value)
    }, [])
    const storageAmount = localStorage.getItem("currentAmount") ? localStorage.getItem("currentAmount") : 0n
    const [currentAmountValue, setCurrentAmountValue] = useState(Number(storageAmount))
    const [isReload, setIsReload] = useState(false)
    const [popups, setPopups] = useState([])

    const increaseCurrentAmountValue = (value, isMainClick) => {
        setCurrentAmountValue((prevState) => prevState + value)

        // for (let i = 0; i < value; i++) {
        if (isMainClick) return
        popUps(value)
        // }
    }
    const decreaseCurrentAmountValue = (value) => setCurrentAmountValue((prevState) => prevState - value)

    const popUps = (value, x = null, y = null) => {
        if (value <= 0) return
        const id = Math.random()

        const popupX = x !== null ? x : Math.random() * 90
        const popupY = y !== null ? y : Math.random() * 90

        setPopups((prev) => [...prev, {id, value: `+$ ${value}`, x: popupX, y: popupY}])

        setTimeout(() => {
            setPopups((prev) => prev.filter((popup) => popup.id !== id))
        }, 2000)
    }

    const handleBySecondsPurchase = () => {
        if (currentAmountValue < valueBySeconds.getValues().cost) return
        decreaseCurrentAmountValue(valueBySeconds.getValues().cost)
        valueBySeconds.increaseBoth()

        setIsReload(!isReload)
    }

    const handleClickPurchase = () => {
        if (currentAmountValue < valueByClick.getValues().cost) return
        decreaseCurrentAmountValue(valueByClick.getValues().cost)
        valueByClick.increaseBoth()
    }

    const handleMainClick = (e) => {
        const {clientX, clientY} = e
        const popupX = (clientX / window.innerWidth) * 100
        const popupY = (clientY / window.innerHeight) * 100
        increaseCurrentAmountValue(valueByClick.getValues().value, true)
        popUps(valueByClick.getValues().value, popupX, popupY)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            increaseCurrentAmountValue(valueBySeconds.getValues().value)
        }, 1000)

        return () => clearInterval(interval)
    }, [isReload])

    useEffect(() => {
        localStorage.setItem("currentAmount", currentAmountValue.toFixed(1))
    }, [currentAmountValue])

    const formatNumber = (params) => {
        return new Intl.NumberFormat("de-DE").format(Number(params.toFixed(0)))
    }

    return (
        <main className="main" onClick={handleMainClick}>
            <div className="currentAmountValueWrapper">
                <div className="currentAmountValue">
                    <strong>$</strong>
                    {currentAmountValue >= 1000000 ? formatNumber(currentAmountValue).slice(0, 5) : formatNumber(currentAmountValue)}
                    {valueBySeconds.convert(currentAmountValue)}
                </div>
                <p>per second: {valueBySeconds.getValues().value}</p>
            </div>
            <button className="mainButton">CLICK</button>

            <div className="shop">
                <ShopItem
                    name={"Auto clicker"}
                    amount={currentAmountValue}
                    onClick={handleBySecondsPurchase}
                    description={`$ ${(valueBySeconds.getValues().value + 0.2).toFixed(1)}/second`}
                    cost={formatNumber(valueBySeconds.getValues().cost)}
                />
                <ShopItem
                    amount={currentAmountValue}
                    name={"Click value"}
                    onClick={handleClickPurchase}
                    description={`$ ${valueByClick.getValues().value + 2}/click`}
                    cost={formatNumber(valueByClick.getValues().cost)}
                />
            </div>

            {popups.map((popup) => (
                <span
                    key={popup.id}
                    className="popup"
                    style={{
                        top: `${popup.y}%`,
                        left: `${popup.x}%`,
                    }}
                >
                    {popup.value}
                </span>
            ))}
        </main>
    )
}

export default App
