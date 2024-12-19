import { useState, useEffect } from "react";
import axios from "axios";
import Card from '../Card/Card';
import { Link } from "react-router-dom";

const CategoryComponent = ({ limit, category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    setLoading(true); 
    setData([]); 
    axios(
      limit
        ? `https://fakestoreapi.com/products/category/${category}?limit=${limit}`
        : `https://fakestoreapi.com/products/category/${category}`
    )
      .then(({ data }) => {
        setData(data); 
        setLoading(false); 
      })
      .catch(() => {
        setLoading(false); 
      });
  }, [category, limit]);

  return (
    <div className="container">
      <h1><Link to={`/category/${category}`}>{category}</Link></h1>
      {loading ? (
        <div className="loader"></div> 
      ) : (
        <div className="row">
          {data.map(item => {
            return <Card item={item} key={item.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryComponent;
