import React,{useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux"

import { Col, Row } from "react-bootstrap";
import Product from "../component/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../component/Loader";
import Message from "../component/Message";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Paginate from "../component/Paginate";
import ProductCarousel from "../component/ProductCarousel";
import Meta from "../component/Meta";
import { Link } from "react-router-dom";


const HomeScreen=()=>{

    const {keyword,pageNumber}=useParams();
    // const [search,setSearch]=useSearchParams();
    const dispatch=useDispatch();

    const productList=useSelector(state=>state.productList)
    const {loading,error,products,pages,page}=productList;

    useEffect(()=>{/*search.get("search") ?? ""*/
        dispatch(listProducts(keyword,pageNumber))
    },[dispatch,keyword,pageNumber])


    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel/> : <Link to="/" className="btn btn-light">Go Back</Link> }
            <h1>Latest Products</h1>
            {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
            <>
               <Row>
                    {
                        products.map((product)=>(
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))
                    }
                </Row>  
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""}/>

            </>
            )}
            
        </>
    );
}

export default HomeScreen