export default function ShopItem({name, onClick, description, cost, amount, disabled}) {
    const confirmPurchase = amount >= Number(cost.replaceAll(".", ""))
    return (
        <div className={`shopItem ${confirmPurchase ? "showItem" : ""} ${confirmPurchase ? "showItem" : ""}`} onClick={confirmPurchase ? onClick : () => {}}>
            <div>
                <p>{name}</p>
                <p>{description}</p>
            </div>
            <button>$ {cost}</button>
        </div>
    )
}
