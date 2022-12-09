import {useState,useEffect} from "react"
import { Link, useNavigate, useSearchParams} from "react-router-dom"
import {Form,Button,Row,Col} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../component/Message"
import Loader from "../component/Loader"
import {register} from "../actions/userAction"
import FormContainer from "../component/FormContainer"

const RegisterScreen = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [message,setMessage]=useState("");
    const [location,setLocation] = useSearchParams();
    const dispatch=useDispatch();

    const userRegister=useSelector(state=>state.userRegister)
    const {loading,error,userInfo}=userRegister
    const navigate=useNavigate();

    // const redirect = location.search ? location.search.split('=')[1] : '/'
    const redirect = location.get("redirect") ? (location.get("redirect")==="/" ? "/" :"/"+location.get("redirect")): "/";

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo,redirect])

    const submitHandler=(e)=>{
        e.preventDefault()
        //DISPATCH REGISTER
        if(password !== confirmPassword){
            setMessage("Password do not match")
        }
        else{
            dispatch(register(name,email,password))
        }
    }

  return (
    <FormContainer >
        <h1>Sign Up</h1>
        {loading && <Loader/>}
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <Form.Label>Name: </Form.Label>
                <Form.Control 
                    type="name" 
                    placeholder="Enter name" 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <br/>
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
            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password: </Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Confirm password" 
                    value={confirmPassword} 
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId="password" >
                <Button type="submit" variant="primary">
                    Register
                </Button>
            </Form.Group>
        </Form>

        <Row className="py-3">
            <Col>
                Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen