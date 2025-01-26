export default function ShopItem({name, onClick, description, cost, amount}) {
    return (
        <div
            className={`shopItem ${amount >= cost ? 'showItem' : ''}`}
            onClick={onClick}
        >
            <div>
                <p>{name}</p>
                <p>{description}</p>
            </div>
            <button>$ {cost}</button>
        </div>
    )
}
