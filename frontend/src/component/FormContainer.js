
import {Container,Row,Col} from "react-bootstrap"

const FormContainer = ({children}) => {
  return (
    <Container >
        <Row className='justify-content-md-center'  >
            <Col xs={12} md={6} style={{
                fontSize:"14px",
                border:"1px solid black",
                borderRadius:"8px",
                padding:"60px",
                display:"inline-block",
                margin:"auto",
                overflow:"hidden",
            }}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer