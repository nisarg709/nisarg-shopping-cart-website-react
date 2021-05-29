import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(listProducts(searchKeyword));
  };

  return (
    <>
      {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={e => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products &&
            products.data &&
            products.data.map(product => (
              <li key={product.id}>
                <div className="product">
                  <Link to={"/product/" + product.id}>
                    <img
                      className="product-image"
                      src={product.image}
                      alt="product"
                    />
                  </Link>
                  <div className="product-name">
                    <Link to={"/product/" + product.id}>
                      {product.product_name}
                    </Link>
                  </div>
                  <div className="product-description">
                    {" "}
                    {product.description}
                  </div>
                  <div className="product-brand"> {product.category}</div>
                  <div className="product-price"> ${product.price}</div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
