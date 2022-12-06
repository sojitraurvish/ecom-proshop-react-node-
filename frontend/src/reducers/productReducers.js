import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from "../constants/productConstants"
export const productListReducer=(state={products:[],loading:true,error:null},action)=>{
    const {type,payload}=action
    switch(type){
        case PRODUCT_LIST_REQUEST:
            return {...state,loading:true,products:[]}
        case PRODUCT_LIST_SUCCESS:
            return {...state,loading:false,products:payload}
        case PRODUCT_LIST_FAIL:
            return {...state,loading:false,error:payload}
        default:
            return state
    }
}

export const productDetailsReducer=(state={product:{reviews:[]},loading:true,error:null},action)=>{
    const {type,payload}=action
    switch(type){
        case PRODUCT_DETAILS_REQUEST:
            return {...state,loading:true,product:[]}
        case PRODUCT_DETAILS_SUCCESS:
            return {...state,loading:false,product:payload}
        case PRODUCT_DETAILS_FAIL:
            return {...state,loading:false,error:payload}
        default:
            return state
    }
}