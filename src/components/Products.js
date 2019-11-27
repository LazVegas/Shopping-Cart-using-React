import React from "react"
import { useProducts, useCart } from "../hooks"
import "../styles/product.css"

export default props => {
  const { products, sizes, filter } = useProducts()
  const { open, add } = useCart()

  function handleAdd(e, product) {
    e.preventDefault()
    add(product)
    open()
  }

  return (
    <div className="productsContainer">

      <div className="filterContainer">
        <h4 className="sizes">Sizes:</h4>
          <div className="filters-available-size">
            <label>
              {sizes.map(size => (
                <button className="checkmark" onClick={e => filter(size)}>{size}</button>
              ))}              
            </label>
          </div>
          <div className="star-button-container">
              <h5>Leave a star on Github if this repository was useful :)</h5>
              <span>
              <div className="widget">
                  <a className="btn">&#9733; Star</a>
                  <a className="social-count">940</a>
              </div>
              </span>
          </div>
      </div>

      <div className="products">

        <div className="shelf-container-header">
            <small className="products-found">
                <span>16 Product(s) found.</span>
            </small>
            <div className="sort">
                <p>Order by</p>
                <select>
                    <option value="select">Select</option>
                    <option value="lowestprice">Lowest to highest</option>
                    <option value="highestprice">Highest to lowest</option>
                </select>
            </div>
        </div>

        <div className="shelf-item">
          {products.map(product => {
            const {
              isFreeShipping: free,
              sku,
              title,
              price,
              installments
            } = product

            const dollars = price.toString().split(".")[0]
            const cents = price
              .toFixed(2)
              .toString()
              .split(".")[1]

            return (
              <div key={"product" + product.id} className="product">
                {free ? <div className="shipping">Free shipping</div> : ""}
                <img src={`/assets/${sku}_1.jpg`} alt={title} />
                <p className="title">{title}</p>
                <hr />
                <div className="price">
                  <div id="ctr">
                    <p>
                      $<span id="dollar">{dollars}</span>.{cents}
                    </p>
                  </div>
                  {installments ? (
                    <p className="installments">
                      {" "}
                      or {installments} x{(price / installments).toFixed(2)}
                    </p>
                  ) : (
                    <p className="installments">&nbsp;</p>
                  )}
                </div>
                <button onClick={e => handleAdd(e, product)}>Add To Cart</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
