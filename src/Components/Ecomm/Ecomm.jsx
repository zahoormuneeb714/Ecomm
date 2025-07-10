import React from 'react'
import "./Ecomm.css";
import { ProductCard } from '../ProductCard/ProductCard';
import { ToggleTheme } from '../Theme/ToggleTheme';




export const Ecomm = () => {


    //! Reducer function to manage cart state
    //! It handles adding, removing, and clearing items in the cart.
    function cartReducer(cartState, action) {
        if (action.type === "ADD_TO_CART") {
            let productId = action.payload.productId;
            for (const product of cartState) {
                if (productId === product.id) {
                    alert("Product already in cart");
                    return [...cartState]
                }
            }
            let product = products.find(product => product.id === productId);
            if (product) {
                alert("Product added to cart");
                return [...cartState, product];
            }
        }
        if (action.type === "REMOVE_FORM_CART") {
            let productId = action.payload.productId;
            let updateCartState = cartState.filter(product => product.id !== productId);
            if (updateCartState) {
                return [...updateCartState];
            }
        }
        if (action.type === "CLEAR_CART") {
            let clearedCart = []
            return clearedCart;
        }

        return cartState
    }



    //! State variables
    //! products: Stores the list of products fetched from the API.
    //! cart: Manages the items in the shopping cart using a reducer.
    //! showCart: Toggles the visibility of the cart view.
    const [products, setProducts] = React.useState([])
    const [cart, dispatchCart] = React.useReducer(cartReducer, [])
    const [showCart, setShowCart] = React.useState(false)


    //! Functions to handle cart actions
    //! handleAddToCart: Adds a product to the cart.
    //! handleRemoveFromCart: Removes a product from the cart.
    //! handleClearCart: Clears all items from the cart.
    function handleAddToCart(productId) {
        dispatchCart({ type: "ADD_TO_CART", payload: { productId: productId } });
    }
    function handleRemoveFromCart(productId) {
        dispatchCart({ type: "REMOVE_FORM_CART", payload: { productId: productId } });
    }
    function handleClearCart() {
        dispatchCart({ type: "CLEAR_CART" });
    }



    //! Function to fetch products from the API
    //! It uses the Fetch API to get data from a JSON file and updates the products state.
    //! It also handles errors during the fetch operation.
    async function fetchProducts(api) {
        try {
            let res = await fetch(api);
            let data = await res.json();
            setProducts(data)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    //! useEffect hook to fetch products when the component mounts
    //! It calls the fetchProducts function with the API endpoint.
    React.useEffect(() => {
        let API = "/products.json";
        fetchProducts(API)
    }, [])



    //! The component returns a JSX structure that includes:
    //! - A header displaying the total items in the cart or products.
    //! - A toggle button to switch between viewing the cart and products.
    //! - A list of product cards, either showing products or items in the cart.
    //! Each product card displays product details and buttons to add or remove items from the cart.
    return (
        <>
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }} className='header'>
                    <h1 className='total-items'> <div>{showCart ? "Cart Items" : "Total Items"}</div> <div className='count'>{showCart ? cart.length : products.length}</div></h1>
                    <div style={{ display: "flex", gap: "10px" }} className='options'>
                        <ToggleTheme />
                        <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                            <button className='btn' onClick={() => { setShowCart(!showCart) }}>{showCart ? "Back to Products" : "View Cart"} {cart.length > 0 && !showCart ? <span className='cart-items-dot'>{cart.length}</span> : ""}</button>
                            {cart.length > 0 && <button className='btn' onClick={() => { handleClearCart() }}>Clear Cart</button>}
                        </div>
                    </div>
                </div>
                <ul className='product-list-container'>

                    {!showCart && products.map((product) => (
                        <ProductCard
                            key={product.id}
                            productID={product.id}
                            name={product.name}
                            category={product.category}
                            price={product.price}
                            isAvailable={product.isAvailable}
                            handleAddToCart={handleAddToCart}
                            showCart={showCart}
                        />
                    ))}
                    {cart.length === 0 && showCart && <h1 className='empty-cart'>Your <span>Cart</span> is Empty</h1>}
                    {showCart && cart.map((product) => (
                        <ProductCard
                            key={product.id}
                            productID={product.id}
                            name={product.name}
                            category={product.category}
                            price={product.price}
                            isAvailable={product.isAvailable}
                            handleRemoveFromCart={handleRemoveFromCart}
                            showCart={showCart}
                        />
                    ))}
                </ul>
            </div>
        </>
    )
}




