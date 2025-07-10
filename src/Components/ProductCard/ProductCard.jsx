import "./ProductCard.css";
export const ProductCard = (props) => {
    return (
        <li className='product-card'>
            <div className='product-card-header'>
                <span className='category'>{props.category}</span>
                <span className={`stocked ${props.isAvailable ? 'available' : 'unavailable'}`}>
                    {props.isAvailable ? 'available' : 'unavailable'}
                </span>

            </div>
            <h2 className='name'>{props.name}</h2>
            <div>
                <span className='price'>Rs: {props.price}/-</span>
                {props.showCart === false ?
                    (
                        <button disabled={!props.isAvailable} className='btn' onClick={() => { props.handleAddToCart(props.productID) }}>Add to Cart</button>) :
                    (
                        <button className='btn' onClick={() => { props.handleRemoveFromCart(props.productID) }}>Remove From Cart</button>
                    )
                }
            </div>
        </li>
    )
}
