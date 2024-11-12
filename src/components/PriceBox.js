import formatNaira from "format-to-naira";
import { useState } from "react";

const PriceBox = ({ product }) => {
  const [quantity, setQuantity] = useState(2);


  return (
    <div className="price-box-container">
      <div className="clip"> </div>
      <div className="price-box">
        <form action="">

          <div className="fee-wrapper">
            <div className="subtotal">
              <span>{formatNaira(product.price)} x </span> (Quantity)
              <input onChange={(e) => setQuantity(e.target.value)} min={1} type="number" defaultValue={quantity} />
            </div>
            <strong>Total: <span>{formatNaira(product.price * quantity)}</span></strong>
            <div className="checkout-btn-wrapper">
              <button type="submit"> Checkout </button>
            </div>
          </div>


        </form>

      </div>
    </div>
  )
}


export default PriceBox