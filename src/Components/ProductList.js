import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UpdateProduct from "./UpdateProduct";

const ProductList = () =>{

    const [products,setProducts] = useState([]);

    useEffect (()=>{
        getProducts();
    },[])

    const getProducts= async ()=>{
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result)
    }

    const deleteProduct = async (id) =>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete"
        });
        result = await result.json()
        if(result)
            {
                getProducts();
            }
    };

    const searchHandle = async (event) =>{
      
        let key = event.target.value;
        if(key)
            {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result){
                setProducts(result)
            }
        }else
            {
                getProducts()
            }
        
        
    }

    return(
        <div className="products-list">
        <h3>Prodcut--List</h3>

        <input  type="text" placeholder="Search Product" className="search-product-box" 
        onChange={searchHandle}/>

        <ul >
            <li>S No </li>
            <li>Name  </li>
            <li>Price  </li>
            <li>Category  </li>
            <li>Operations</li> 
        </ul>

        {
            products.length > 0 ? products.map((item,index)=>
                <ul >
            <li key={index}>{index+1} </li>
            <li > {item.name}  </li>
            <li> {item.price}  </li>
            <li>{item.category}  </li>
            <li><button  onClick={()=> deleteProduct(item._id)} >Delete</button>
            
            <button><Link to={"/update/"+item._id} onClick={UpdateProduct}>Update</Link></button>

            </li>
        </ul>
            )
            : <h1>No Data Found</h1>
        }
        </div>
    )
}

export default ProductList;    