import {useState,useEffect} from "react"
import { Link, useNavigate, useSearchParams} from "react-router-dom"
import {Button,Table,Row,Col} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../component/Message"
import Loader from "../component/Loader"
import { createProduct, deleteProduct, listProducts } from "../actions/productActions"
import { LinkContainer } from "react-router-bootstrap"
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from "../constants/productConstants"


const ProductListScreen = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const {loading,error,products}=useSelector(state=>state.productList)
    const {
        loading:loadingCreate,
        error:errorCreate,
        success:successCreate,
        product:createdProduct
    }=useSelector(state=>state.productCreate)
    const {loading:loadingDelete,error:errorDelete,success:successDelete}=useSelector(state=>state.productDelete)
    const {userInfo}=useSelector(state=>state.user)
    
    useEffect(()=>{
        if(!userInfo.isAdmin){
            navigate("/login")
        }

        if(successCreate){
            dispatch({
                type:PRODUCT_CREATE_RESET
            })
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }
        else{
            dispatch(listProducts())
        }
        
    },[userInfo,successDelete,successDelete,createdProduct])

    const deleteHandler=(id)=>{
        if(window.confirm("Are you sure")){
            // DELETE PRODUCTs
            dispatch({type:PRODUCT_DELETE_RESET})
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler=()=>{
        // CREATE PRODUCT
        dispatch(createProduct())
    }
    
    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right" style={{marginLeft:"900px"}}>
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i>Create Product
                    </Button>
                </Col>
            </Row>
            {/* {(loadingDelete || loadingCreate) && <Loader/>} */}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {/* {loadingCreate && <Loader/>} */}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {(loadingDelete || loadingCreate || loading) ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? <h1>No users found</h1> : (
                            products.map((product)=>(
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>
                                        ${product.price}
                                    </td>
                                    <td>
                                        {product.category}
                                    </td>
                                    <td>
                                        {product.brand}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant="light" className="btn-sm">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant="danger" className="btn-sm" onClick={()=>deleteHandler(product._id)}>
                                                <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                        
                    </tbody>
                </Table>
            )}   
        </>
    )
}

export default ProductListScreen