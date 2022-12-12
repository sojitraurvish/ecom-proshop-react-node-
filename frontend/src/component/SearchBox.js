import {useState} from 'react'
import {Form,Button} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const navigate=useNavigate();
    const [keyword,setKeyword]=useState("")


    const submitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
            navigate(`/`)
        }
    }

  return (
    <Form onSubmit={submitHandler} inline={true}>
        <Form.Control
            type="text" 
            name="q" 
            onChange={(e)=>setKeyword(e.target.value)}
            placeholder="Search Products..."
            className='mr-sm-2 ml-sm-2'
            style={{width:"200px",height:"44px",display:"inline"}}
        />
        <Button type="submit" variant="outline-success" className='p-2' style={{height:"46px"}}>
             Submit
        </Button>
    </Form>
  )
}

export default SearchBox