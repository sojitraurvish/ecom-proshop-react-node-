import {useState,useEffect} from "react"
import { Link, useNavigate, useSearchParams} from "react-router-dom"
import {Form,Button,Row,Col} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../component/Message"
import Loader from "../component/Loader"
import {getUserDetails, updateUserProfile} from "../actions/userAction"

const ProfileScreen = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [message,setMessage]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {loading,error,user}=useSelector(state=>state.userDetails);
    const {success}=useSelector(state=>state.userUpdateProfile);

    const {userInfo}=useSelector(state=>state.user);

    useEffect(()=>{
        if(!userInfo){
            navigate("/login")
        }
        else{

            if(!user.name){//Comment
                dispatch(getUserDetails("profile"))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[userInfo,user])

    const submitHandler=(e)=>{
        e.preventDefault()
        //DISPATCH REGISTER
        if(password !== confirmPassword){
            setMessage("Password do not match")
        }
        else{
            //DISPATCH UPDATE PROFILE
            dispatch(updateUserProfile({
                id:user._id,
                name,
                email,
                password
            }))
        }
    }

  return (
    <Row>
        <Col md={3}>
        <h2>User Profile</h2>
        {loading && <Loader/>}
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
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
                    Update
                </Button>
            </Form.Group>
        </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen