export default function ShopItem({name, onClick, description, cost, amount}) {
    const confirmPurchase = amount >= Number(cost.replaceAll(".", ""))
    return (
        <div className={`shopItem ${confirmPurchase ? "showItem" : ""}`} onClick={confirmPurchase ? onClick : () => {}}>
            <div>
                <p>{name}</p>
                <p>{description}</p>
            </div>
            <button>$ {cost}</button>
        </div>
    )
}
