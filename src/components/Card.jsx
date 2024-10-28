import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from './CartContext';
import './Card.css';

function Card() {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState(1); 
  const productsPerPage = 4;

  useEffect(() => {
    const store = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const jsonResp = await response.json();
      setProduct(jsonResp);
    };
    store();
  }, []);

  const filteredProducts = product.filter((values) =>
      values.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length /productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1>Welcome to the Store</h1>
       <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
        <div className="container">
        {currentProducts.map((values) => {
          return (
            <div className='box' key={values.id}>
              <div className='content'>
                  <h5>{values.title}</h5>
                <p className="Price">PRICE : {values.price}</p>
                <p className="Category">Category : {values.category}</p>
              </div>
              <img className='productImg' src={values.image} alt={values.title} />
              <button onClick={() => addToCart(values)} className="add-to-cart-button">
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
               {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Card;
