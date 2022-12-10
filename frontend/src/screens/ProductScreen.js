import React, { useEffect, useState } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import { Row,Col,Image,ListGroup,Button,Card, ListGroupItem, Form } from "react-bootstrap";
import Rating from "../component/Rating";
import { useDispatch,useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../component/Loader";
import Message from "../component/Message";


const ProductScreen=()=>{
    const [qty,setQty]=useState(1);
    const navigate=useNavigate();
    const dispatch=useDispatch()
    // const params=useParams();
    const {id}=useParams();
    const productDetails=useSelector(state=>state.productDetails)

    const {loading,error,product}=productDetails

    useEffect(()=>{
       dispatch(listProductDetails(id))
    },[id]);

    const addToCartHandler=()=>{
        navigate(`/cart/${id}?qty=${qty}`)   
    }
    
    //and this products coming form product.js file 
    // const product=products.find((p)=>(p._id===params.id))
    //This logic now sifted to backend and from their to database
    return (
        <>
            <Link className="btn btn-dark my-3" to="/">
                Go back
            </Link> 
            {loading ? (<Loader/>) : (error) ? (<Message variant="danger">{error}</Message>) : (
                 <Row>
                 <Col md={6}>
                     <Image src={product.image} alt={product.name} fluid/>
                 </Col>
                 <Col md={3}>
                     <ListGroup variant="flush">
                         <ListGroup.Item>
                             <h3>{product.name}</h3>
                         </ListGroup.Item>
                         <ListGroup.Item>
                             <Rating 
                                 value={product.rating}
                                 text={`${product.numReviews} reviews`}
                             />
                         </ListGroup.Item>
                         <ListGroup.Item>
                             Price : ${product.price}
                         </ListGroup.Item>
                         <ListGroup.Item>
                             Description : {product.description}
                         </ListGroup.Item>
                     </ListGroup>
                 </Col>
                 <Col md={3}>
                     <Card>
                         <ListGroup variant="flush">
                             <ListGroup.Item>
                                 <Row>
                                     <Col>
                                         Price:
                                     </Col>
                                     <Col>
                                         <strong>${product.price}</strong>
                                     </Col>
                                      
                                 </Row>
                             </ListGroup.Item>
                             <ListGroup.Item>
                                 <Row>
                                     <Col>
                                         Status:
                                     </Col>
                                     <Col>
                                         {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                                     </Col>
                                      
                                 </Row>
                             </ListGroup.Item>
                             {
                                product.countInStock >0 &&  (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                 <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                                                   {
                                                    [...Array(product.countInStock).keys()].map(x=>(
                                                            <option key={x+1} value={x+1}>{x+1} </option>
                                                        ))
                                                   }
                                                 </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )   
                             }
                             <ListGroup.Item>
                                 <Row>
                                     <Button onClick={addToCartHandler} className="btn-block" style={{backgroundColor:`${product.countInStock === 0 && "#cacaca"}`}} type="button" disabled={product.countInStock === 0}>
                                         Add To Cart
                                     </Button>
                                 </Row>
                             </ListGroup.Item>
                         </ListGroup>
                     </Card>
                 </Col>
             </Row>
            )}
           
        </>
    );
}

export default ProductScreen;
