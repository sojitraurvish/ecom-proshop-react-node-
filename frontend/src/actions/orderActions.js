import axios from "axios"
import { 
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST
 } from "../constants/orderConstants"

export const createOrder=(order)=>async(dispatch,getState)=>{
    try{
        
        dispatch({
            type:ORDER_CREATE_REQUEST
        })

        const {user:{userInfo}}=getState()

        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}=await axios.post(
            `/api/orders`,
            order,
            config
        )

        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })

       
    }catch(error){
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:error.response && error.response.data.message //error.response that is generic message and other is for custom message 
            ? error.response.data.message 
            : error.message
        })   
    }
}
export const getOrderDetails=(id)=>async(dispatch,getState)=>{
    try{
        
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })

        const {user:{userInfo}}=getState()

        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        console.log(config);
        const {data}=await axios.get(
            `/api/orders/${id}`,
            config
        )
        
        console.log(data);
        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload:data
        })

       
    }catch(error){
        console.log(error);
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.message //error.response that is generic message and other is for custom message 
            ? error.response.data.message 
            : error.message
        })   
    }
}