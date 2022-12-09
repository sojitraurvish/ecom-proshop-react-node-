import {useEffect, useState} from "react"
import { Link, useNavigate, useParams, useSearchParams} from "react-router-dom"
import {Button,Row,Col,ListGroup,Image,Card, ButtonToolbar} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../component/Message"
import { saveShippingAddress } from "../actions/cartActions"
import Loader from "../component/Loader"
import { getOrderDetails } from "../actions/orderActions"

const OrderScreen = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {id}=useParams();
    
    const {order,loading,error}=useSelector(state=>state.orderDetails)

    useEffect(()=>{
        dispatch(getOrderDetails(id))
    },[])

    

  return (
    loading ? <Loader/> : error ? <Message variant="danger">{error}</Message>
    :
    <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h1>Shipping</h1>
                        <p>
                            <strong>Address : </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city+"-"}
                            {order.shippingAddress.postalCode+" "},
                            {order.shippingAddress.country}

                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method : </strong>
                        {order.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items:</h2>
                        {order.orderItems.length===0 ? <Message>Order is empty</Message> : (
                            <ListGroup variant="flush">
                                {order.orderItems.map((item,index)=>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = {item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flash">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col> 
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col> 
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col> 
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col> 
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default OrderScreen