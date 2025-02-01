/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useEffect, useState, useMemo, useLayoutEffect} from "react"
import "./App.css"
import ShopItem from "./components/buttons/ShopItem.js"
import {App} from "./classes/Application.class.js"
import {formatNumber} from "./utils/formatNumbertoCurrency.js"

function Home() {
    const app = useMemo(() => new App(), [])
    // const storageAmount = localStorage.getItem("currentAmount") ? localStorage.getItem("currentAmount") : 1000000000
    const storageAmount = app.currentAmount
    const [currentAmountValue, setCurrentAmountValue] = useState(Number(storageAmount))
    const [isBySecondsReload, setIsBySecondsReload] = useState(false)
    const [isByTimeReload, setIsByTimeReload] = useState(false)
    const [popups, setPopups] = useState([])

    const increaseCurrentAmountValue = (value, isMainClick) => {
        setCurrentAmountValue((prevState) => prevState + value)

        if (isMainClick) return
        popUps(value)
    }
    const decreaseCurrentAmountValue = (value) => setCurrentAmountValue((prevState) => prevState - value)

    const popUps = (value, x = null, y = null) => {
        if (value <= 0) return

        const id = Math.random()
        const popupX = x !== null ? x : Math.random() * 90
        const popupY = y !== null ? y : Math.random() * 90

        setPopups((prev) => [
            ...prev,
            {
                id,
                value: `+$ ${formatNumber(value)}`,
                x: popupX,
                y: popupY,
            },
        ])

        setTimeout(() => {
            setPopups((prev) => prev.filter((popup) => popup.id !== id))
        }, 2000)
    }

    const handleMainClick = (e) => {
        const {clientX, clientY} = e
        const popupX = (clientX / window.innerWidth) * 100
        const popupY = (clientY / window.innerHeight) * 100
        increaseCurrentAmountValue(app.valueByClick.getValues().value, true)
        popUps(app.valueByClick.getValues().value, popupX, popupY)
    }

    function renderCurrentAmount() {
        return (
            <div className="currentAmountValue">
                <strong>$</strong>
                {currentAmountValue >= 1000000 ? formatNumber(currentAmountValue).slice(0, 5) : formatNumber(currentAmountValue)}
                {app.valueBySeconds.convert(currentAmountValue)}
            </div>
        )
    }

    function renderThousandByTime() {
        return app.thousandByTime.getValues().value > 0 ? <p>$ 1.000 each {app.thousandByTime.getValues().time} seconds</p> : <p></p>
    }

    function renderValueBySeconds() {
        return app.valueBySeconds.getValues().value > 0 ? (
            <p>per second: $ {formatNumber(app.valueBySeconds.getValues().value)}</p>
        ) : (
            <p></p>
        )
    }

    function renderValueByClick() {
        return <p>$ {formatNumber(app.valueByClick.getValues().value)} per click</p>
    }

    useEffect(() => {
        const interval = setInterval(() => {
            increaseCurrentAmountValue(app.valueBySeconds.getValues().value)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [isBySecondsReload])

    useEffect(() => {
        const thousandInterval = setInterval(() => {
            increaseCurrentAmountValue(app.thousandByTime.getValues().value)
        }, app.thousandByTime.getValues().time * 1000)

        return () => {
            clearInterval(thousandInterval)
        }
    }, [isByTimeReload])

    useEffect(() => {
        localStorage.setItem("currentAmount", currentAmountValue.toFixed(1))
    }, [currentAmountValue])

    useLayoutEffect(() => {
        // localStorage.clear()
        console.log(app.itens)
    }, [])

    return (
        <main className="main" onClick={handleMainClick}>
            <div className="currentAmountValueWrapper">
                {renderCurrentAmount()}
                {renderThousandByTime()}
                {renderValueBySeconds()}
                {renderValueByClick()}
            </div>
            <button className="mainButton">CLICK</button>
            <div className="shop">
                {app.itens.map(({name, cost, description, disabled}, index) => (
                    <ShopItem
                        name={name}
                        amount={currentAmountValue}
                        onClick={() => {
                            if (currentAmountValue < cost) return
                            decreaseCurrentAmountValue(cost)
                            app.itens[index].increase()

                            if (name === "Auto clicker") {
                                setIsBySecondsReload(!isBySecondsReload)
                            } else if (name === "Thousand by time") {
                                setIsByTimeReload(!isByTimeReload)
                            }
                        }}
                        description={description}
                        cost={cost}
                        disabled={disabled}
                    />
                ))}
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

export default Home
