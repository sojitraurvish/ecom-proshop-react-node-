import {useState} from "react"
import { Link, useNavigate, useSearchParams} from "react-router-dom"
import {Form,Button,Col} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import FormContainer from "../component/FormContainer"
import { savePaymentMethod } from "../actions/cartActions"
import CheckoutSteps from "../component/CheckoutSteps"

const PaymentScreen = () => {
    const navigate=useNavigate();

    const {shippingAddress}=useSelector(state=>state.cart)

    if(!shippingAddress){
        navigate("/shipping");
    }
 
    const [paymentMethod,setPaymentMethod]=useState("PayPal")

    const dispatch=useDispatch()

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder");
    }

    return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment Method </h1>
        <Form onSubmit={submitHandler}>
           <Form.Group>
                <Form.Label as="legend">Select Method</Form.Label>
           
            <Col>
                &nbsp;
                <Form.Check 
                    type="radio" 
                    label="PayPal or Credit Card" 
                    id="PayPal" 
                    name="paymentMethod" 
                    value="PayPal"
                    checked={paymentMethod==="PayPal" ? true :false}
                    onChange={(e)=>setPaymentMethod(e.target.value)}
                ></Form.Check>
                {/* <Form.Check 
                    type="radio" 
                    label="Stripe" 
                    id="Stripe" 
                    name="paymentMethod" 
                    value="Stripe"
                    onChange={(e)=>setPaymentMethod(e.target.value)}
                ></Form.Check> */}
            </Col>
           </Form.Group>
            <Button type="submit" variant="primary" >
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen