import {useEffect, useState} from "react"
import "./App.css"

function App() {
    const [currentAmountValue, setCurrentAmountValue] = useState(0)
    const [currentClickerValue, setCurrentClickerValue] = useState(1)
    const [currentBySecondsValue, setCurrentBySecondsValue] = useState(0)

    const increaseCurrentAmountValue = (value) => setCurrentAmountValue((prevState) => (prevState += value))
    const subtractCurrentAmountValue = (value) => setCurrentAmountValue((prevState) => (prevState -= value))

    function BySecondsPurchase() {
        if (currentAmountValue < 100) return
        subtractCurrentAmountValue(100)
        setCurrentBySecondsValue(1)
        setInterval(() => {
            increaseCurrentAmountValue(currentBySecondsValue)
        }, 1000)
    }

    return (
        <main className="main">
            <p className="currentAmountValue">
                {currentAmountValue}
                <strong>$</strong>
            </p>
            <button onClick={() => increaseCurrentAmountValue(currentClickerValue)} className="mainButton">
                CLICK
            </button>

            <div className="shop">
                <div className="bySecondsPurchase">
                    <div>
                        <p>bySecondsPurchase</p>
                        <p>+1$/second</p>
                    </div>
                    <button onClick={BySecondsPurchase}>-100$</button>
                </div>
            </div>
        </main>
    )
}

export default App
