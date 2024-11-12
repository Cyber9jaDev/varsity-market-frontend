import formatNaira from "format-to-naira";

const ProductDetails = ({ product }) => {
  return (
    <div>
      {product.price &&
        <details open={true} className="name-container">
          <summary className='name-text fs-5'>Price</summary>
          <p className="name">{formatNaira(product.price)}</p>
        </details>
      }
      {product.name &&
        <details open={true} className="name-container">
          <summary className='name-text fs-5'>Product</summary>
          <p className="name">{product.name}</p>
        </details>
      }

      {product.description &&
        <details open={true} className="description-container">
          <summary className='email-text fs-5'>Seller Email</summary>
          <p className="email">{product?.seller?.email}</p>
        </details>
      }
      {product.description &&
        <details open={true} className="description-container">
          <summary className='description-text fs-5'>Description</summary>
          <p className="description">{product.description}</p>
        </details>
      }
      {product.condition &&
        <details open={true} className="description-container">
          <summary className='description-text fs-5'>Condition</summary>
          <p className="description">{product.condition}</p>
        </details>
      }
    </div>
  )
}

export default ProductDetails