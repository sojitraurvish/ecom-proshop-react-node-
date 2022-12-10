import {useState,useEffect} from "react"
import { Link, useNavigate, useSearchParams} from "react-router-dom"
import {Form,Button,Row,Col} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../component/Message"
import Loader from "../component/Loader"
import {login} from "../actions/userAction"
import FormContainer from "../component/FormContainer"

const LoginScreen = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [location,setLocation] = useSearchParams();
    const dispatch=useDispatch();
    const userLogin=useSelector(state=>state.user)
    const {loading,error,userInfo}=userLogin
    const navigate=useNavigate();

    // const redirect = location.search ? location.search.split('=')[1] : '/'
    const redirect = location.get("redirect") ? location.get("redirect"): "/";
    useEffect(()=>{
        if(userInfo){
            navigate((redirect==="/" ? "/" :"/"+location.get("redirect")))
        }
    },[userInfo,redirect])

    const submitHandler=(e)=>{
        e.preventDefault()
        //DISPATCH LOGIN
        dispatch(login(email,password))
    }

  return (
    <FormContainer >
        <h1>Sign In</h1>
        {loading && <Loader/>}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
                <Form.Label>Email Address: </Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId="password">
                <Form.Label>Password: </Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter password" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId="password" >
                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form.Group>
        </Form>

        <Row className="py-3">
            <Col>
                New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen