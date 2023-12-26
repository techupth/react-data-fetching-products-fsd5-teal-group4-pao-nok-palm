import "./App.css";
import axios from "axios";
import { useEffect,useState } from "react";

function App() {
  const [post,setPost] = useState([]);

  useEffect(()=>{
    pdt();
  },[post])
  
  async function pdt() {
    const detail = await axios.get(
      "http://localhost:4001/products"
    );
    setPost(detail.data.data);
    console.log(detail);
  }

  // const del = (index) =>{
  //   const nPost = [...post];
  //   nPost.splice(index,1)
  //   setPost(nPost);
  // }


  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {
        post.map((item,index)=>{
          return (
            <div className="product-list">
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>
    
              <button className="delete-button"
                onClick={async()=>{
                  await axios.delete(
                    `http://localhost:4001/products/${item.id}`
                  );
                }}
              >x</button>
            </div>
          </div>
          )
        })
      }
    </div>
  );
}

export default App;
