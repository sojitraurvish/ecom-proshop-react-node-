import {useState,useEffect} from "react"
import { Link, useNavigate, useParams} from "react-router-dom"
import {Form,Button} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../component/Message"
import Loader from "../component/Loader"
import { listProductDetails, updateProduct } from "../actions/productActions"
import FormContainer from "../component/FormContainer"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"
import axios from "axios"

const ProductEditScreen = () => {
    const navigate=useNavigate();
    const {id:productId}=useParams();

    const [name,setName]=useState("");
    const [price,setPrice]=useState(0);
    const [image,setImage]=useState("");
    const [brand,setBrand]=useState ("");
    const [category,setCategory]=useState("");
    const [countInStock,setCountInStock]=useState(0);
    const [description,setDescription]=useState("");
    const [uploading,setUploading]=useState(false);


    const dispatch=useDispatch();

    const {loading,error,product}=useSelector(state=>state.productDetails)
    const {userInfo}=useSelector(state=>state.user)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=useSelector(state=>state.productUpdate)
    
    useEffect(()=>{
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            navigate("/admin/productlist")
        }else{
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
                
            }else{
                
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
    
            }
        } 
        
    },[productId,product,successUpdate])

    const submitHandler=(e)=>{
        e.preventDefault()
        //Update product
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
    }

    const uploadFileHandler=async(e)=>{
        console.log("Fdsdfsd");
        const file=e.target.files[0]//this is array
        console.log("Fdsdfsd"+file);
        const formData=new FormData()
        formData.append("image",file)
        setUploading(true)

        try {
            const config={
                headers:{
                    "Content-Type":"multipart/form-data",
                    Authorization:`Bearer ${userInfo.token}`
                }
            }
            console.log("Fdsdfsd"+file);
            const {data}=await axios.post("/api/upload",formData,config)
            console.log("Fdsdfsd"+data+file);
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

  return (
    <>
        <Link to="/admin/productlist" className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer >
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
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
            <Form.Group controlId="price">
                <Form.Label>Price : </Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="Enter price" 
                    value={price} 
                    onChange={(e)=>setPrice(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId="image">
                <Form.Label>Image : </Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter image url" 
                    value={image} 
                    disabled
                    onChange={(e)=>setImage(e.target.value)}
                >
                </Form.Control>
                <Form.Control 
                    type="file" 
                    label="Choose File"
                    onChange={uploadFileHandler}
                >
                </Form.Control>
                {uploading && <Loader/>}
            </Form.Group>
            <br/>
            <Form.Group controlId="brand">
                <Form.Label>Brand : </Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter brand" 
                    value={brand} 
                    onChange={(e)=>setBrand(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock : </Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="Enter countInStock" 
                    value={countInStock} 
                    onChange={(e)=>setCountInStock(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId="category">
                <Form.Label>Category : </Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter category" 
                    value={category} 
                    onChange={(e)=>setCategory(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <br/>
            <Form.Group controlId="description">
                <Form.Label>Description : </Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter description" 
                    value={description} 
                    onChange={(e)=>setDescription(e.target.value)}
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
        )}
        
    </FormContainer>
    </>
   
  )
}

export default ProductEditScreen