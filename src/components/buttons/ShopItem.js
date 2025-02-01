export default function ShopItem({name, onClick, description, cost, amount, disabled}) {
    const confirmPurchase = amount >= cost
    return (
        <div className={`shopItem ${confirmPurchase ? "showItem" : ""} ${disabled ? "disabled" : ""}`} onClick={confirmPurchase ? onClick : () => {}}>
            <div>
                <p>{name}</p>
                <p>{description}</p>
            </div>
            <button>$ {cost}</button>
        </div>
    )
}
