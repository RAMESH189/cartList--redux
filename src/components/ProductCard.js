import "./ProductCard.css";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export const ProductCard = ({ product }) => {
  const { id, name, price, image } = product;

  const { addToCart, cartList, removeFromCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const productInCartCheck = cartList.find((cartItem) => cartItem.id === id);
    if (productInCartCheck) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [cartList, id]);

  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <p className="name">{name}</p>
      <div className="action">
        <p>${price}</p>
        {isInCart ? (
          <button className="remove" onClick={() => removeFromCart(product)}>
            Remove item
          </button>
        ) : (
          <button onClick={() => addToCart(product)}>Add item</button>
        )}
      </div>
    </div>
  );
};
