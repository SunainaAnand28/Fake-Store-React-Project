import React, { useEffect, useState } from 'react';

import './Card.css'

function Card() {
 
 
  const [product, setProduct] = useState([]);
// console.log(product);

  useEffect(() => {
    const store = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      //console.log(response);
      const jsonResp = await response.json();
      //console.log(jsonResp);
      setProduct(jsonResp);
    }
    store()
  }, [])

  return (
    <>
      <h1>Welcome to the Store</h1>
      <div className="container">
        {product.map((values) => {
          return (
            <>
              <div className='box'>
                <div className='content'>
                  <h5>{values.title}</h5>
                  <p>{values.description}</p>
                </div>
                <img className='productImg' src={values.image} alt="" />
              </div>
            </>
          )

        })}
      </div>
    </>
  );

}

export default Card