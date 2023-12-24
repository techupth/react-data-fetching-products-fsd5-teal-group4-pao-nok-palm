import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState();
  const [status, setStatus] = useState("");

  useEffect(() => {
    const result = async () => {
      try {
        setStatus("Loading...");
        const response = await axios.get("http://localhost:4001/products");
        setProducts([...response.data.data]);
      } catch (error) {
        console.log(error);
        setStatus("Fetching Error...");
      }
    };

    result();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    const result = await axios.get("http://localhost:4001/products");
    setProducts([...result.data.data]);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products ? (
          products.map(({ description, image, id, name, price }, index) => {
            return (
              <div className="product" key={index}>
                <div className="product-preview">
                  <img src={image} alt={name} width="350" height="350" />
                </div>
                <div className="product-detail">
                  <h1>Product name: {name}</h1>
                  <h2>Product price: {price} Baht</h2>
                  <p>Product description: {description}</p>
                </div>

                <button
                  className="delete-button"
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  x
                </button>
              </div>
            );
          })
        ) : (
          <h1>{status}</h1>
        )}
      </div>
    </div>
  );
}

export default App;
