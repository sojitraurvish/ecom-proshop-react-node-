import {useEffect, useState} from "react"
import axios from "axios"
import { Link, useNavigate, useParams, useSearchParams} from "react-router-dom"
import {Button,Row,Col,ListGroup,Image,Card, ButtonToolbar} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../component/Message"
import { saveShippingAddress } from "../actions/cartActions"
import Loader from "../component/Loader"
import { getOrderDetails, payOrder ,deliverOrder} from "../actions/orderActions"
import {PayPalButton} from "react-paypal-button-v2"
import { ORDER_PAY_RESET , ORDER_DELIVERED_RESET} from "../constants/orderConstants"

const OrderScreen = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [sdkReady,setSdkReady]=useState(false);
    const {id}=useParams();
    

    const {order,loading,error}=useSelector(state=>state.orderDetails)
    const {userInfo}=useSelector(state=>state.user)
    const {loading:loadingPay,success:successPay}=useSelector(state=>state.orderPay)
    const {loading:loadingDeliver,success:successDeliver}=useSelector(state=>state.orderDeliver)

    // useEffect(() => {
    //     if(!order || order._id !== orderId) {
    //         dispatch(getOrderDefails(orderId))
    //     }
    // }, [order, orderId]) 
    useEffect(() => {
        if(!userInfo){
            navigate("/login")
        }
        const addPayPalScript=async()=>{
            const {data:clientId}=await axios.get("/api/config/paypal")
            const script=document.createElement("script")
            script.type="text/javascript"
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async=true
            script.onload=()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        addPayPalScript()

        if(!order || successPay || successDeliver){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVERED_RESET})
            dispatch(getOrderDetails(id))
        }
        else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
    }, [id,successPay,successDeliver,order])

    const successPaymentHandler=(paymentResult)=>{
        console.log(paymentResult);
        dispatch(payOrder(id,paymentResult))
    }

    const deliverHandler=()=>{
        dispatch(deliverOrder(order))
    }

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
                            <strong>Name : </strong>{order[0].user.name}
                        </p>
                        <p>
                            <strong>Email : </strong><a href={`mailto:${order[0].user.email}`}>{order[0].user.email}</a>

                        </p>
                        <p>
                            <strong>Address : </strong>
                            {order[0].shippingAddress.address}, {order[0].shippingAddress.city+"-"}
                            {order[0].shippingAddress.postalCode+" "},
                            {order[0].shippingAddress.country}

                        </p>
                        {order.isDelivered 
                        ?
                        <Message variant="success">Delivered on {order[0].deliveredAt}</Message>
                        :
                        <Message variant="danger">Not Delivered</Message>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method : </strong>
                            {order[0].paymentMethod}
                        </p>
                        {order[0].isPaid 
                        ?
                        <Message variant="success">Paid on {order[0].paidAt}</Message>
                        :
                        <Message variant="danger">Not Paid</Message>
                        }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items:</h2>
                        {order[0].orderItems.length===0 ? <Message>Order is empty</Message> : (
                            <ListGroup variant="flush">
                                {order[0].orderItems.map((item,index)=>(
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
                                <Col>${order[0].itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col> 
                                <Col>${order[0].shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col> 
                                <Col>${order[0].taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col> 
                                <Col>${order[0].totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order[0].isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader/>}
                                {!sdkReady ? <Loader/> : (
                                    <PayPalButton amount={order[0].totalPrice} onSuccess={successPaymentHandler}/>
                                )}
                            </ListGroup.Item>
                        )}
                        {loadingDeliver && <Loader/>}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type="button" class="btn btn-block" onClick={deliverHandler}>
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default OrderScreen