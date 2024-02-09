import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Page } from "../../components";
import { ServiceAPI } from "../../infrastructure";
import "./Product.style.scss";

function Product() {
  
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const json = await ServiceAPI.fetchProduct(id);
      if (json.error !== null) {
        setMessage(json.error);
        return;
      }

      setProduct(json.data.product);
    };

    fetchData();
  }, []);

  return (
    <Page>
      <div className="product-page">
<h1>not-Product-Page</h1>
        {message && <p>{message}</p>}
        {product && (
          <>
            <div className="grid-2">
              <img src="https://images.footlocker.com/is/image/EBFL2/6266158_a1?wid=520&hei=520&fmt=png-alpha" alt="" />
            </div>
            <div className="product-page__product">
              <h3>Title: {product.title}</h3>
              <p>ID: {id}</p>
              <p>Description: {product.description}</p>
            </div>
            <Link to={`/checkout/${product.id}`}>
              <button>Buy Now</button>
            </Link>
          </>
        )}
      </div>
    </Page>
  );
}

export default Product;
