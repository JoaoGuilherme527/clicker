export default function ShopItem({name, onClick, description, cost}) {
    return (
        <div className="shopItem" onClick={onClick}>
            <div>
                <p>{name}</p>
                <p>{description}</p>
            </div>
            <button>$ {cost}</button>
        </div>
    )
}
