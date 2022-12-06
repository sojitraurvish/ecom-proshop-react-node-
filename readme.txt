inorder to use bootstrap we need two packages react-bootstrap and bootstrap but we include file form bootswatch then we just need to install react-bootstrap rather than both
https://react-bootstrap.github.io/layout/grid/
https://bootswatch.com/ 
https://cdnjs.com/libraries/font-awesome
https://fontawesome.com/icons/star?s=regular&f=classic
react-bootstrap
yarn add react-router-dom react-router-bootstrap
in this application we are going to use BrowserRouter which uses html5 history api but you can you hash router that uses hash portion of url 

export const productListReducer=(state={products:[],loading:false,error:null},action)=>{
    const {type,payload}=action
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {...state,loading:true}
        case PRODUCT_LIST_SUCCESS:
            return {...state,loading:false,products:payload}
        case PRODUCT_LIST_FAIL:
            return {...state,loading:false,error:payload}
        default:
            return state
    }
}

export const productDetailsReducer=(state={product:{reviews:[]},loading:false,error:null},action)=>{
    const {type,payload}=action;
    switch(type){
        case PRODUCT_DETAILS_REQUEST:
            return {...state,loading:true}
        case PRODUCT_DETAILS_SUCCESS:
            return {...state,loading:false,product:payload}
        case PRODUCT_DETAILS_FAIL:
            return {...state,loading:false,error:payload}
        default:
            return state
    }
}