import {useState,useEffect} from "react"
import { Link, useNavigate, useSearchParams} from "react-router-dom"
import {Button,Table} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux"
import Message from "../component/Message"
import Loader from "../component/Loader"
import {listUsers,deleteUser} from "../actions/userAction"
import { LinkContainer } from "react-router-bootstrap"
import { USER_DELETE_RESET } from "../constants/userConstants"

const UserListScreen = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const {loading,error,users}=useSelector(state=>state.userList)
    const {userInfo}=useSelector(state=>state.user)
    const {success:successDelete}=useSelector(state=>state.userDelete)
    
    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }
        else{
            navigate("/login")
        }
    },[userInfo,successDelete])

    const deleteHandler=(id)=>{
        if(window.confirm("Are you sure")){
            dispatch({type:USER_DELETE_RESET});
            dispatch(deleteUser(id))
        }
    }
    
    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? <h1>No users found</h1> : (
                            users.map((user)=>(
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td>{user.isAdmin ? (<i className="fas fa-check" style={{color:"green"}}></i>):(
                                        <i className="fas fa-times" style={{color:"red"}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant="light" className="btn-sm">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant="danger" className="btn-sm" onClick={()=>deleteHandler(user._id)}>
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

export default UserListScreen