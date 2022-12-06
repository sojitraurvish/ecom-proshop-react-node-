import React, { useState } from "react";
import { Link,useParams } from "react-router-dom";
import { Row,Col,Image,ListGroup,Button,Card, ListGroupItem } from "react-bootstrap";
import Rating from "../component/Rating";
import axios from "axios"

const ProductScreen=()=>{
    const [product,setProduct]=useState({});
    const params=useParams();

    useState(()=>{
        (async()=>{
              const {data}=await axios.get(`/api/products/${params.id}`)

              setProduct(data);
        })()
    },[params]);
    
    //and this products coming form product.js file 
    // const product=products.find((p)=>(p._id===params.id))
    //This logic now sifted to backend and from their to database
    return (
        <>
            <Link className="btn btn-dark my-3" to="/">
                Go back
            </Link> 
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
                            <ListGroup.Item>
                                <Row>
                                    <Button className="btn-block" style={{backgroundColor:`${product.countInStock === 0 && "#cacaca"}`}} type="button" disabled={product.countInStock === 0}>
                                        Add To Cart
                                    </Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default ProductScreen;