import {Routes,Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

const App=()=>{
  return (
    <>
      <Header/>
        <main className="py-3">
          <Container>
              <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/product/:id" element={<ProductScreen/>}/>
                {/* <Route path="/cart/:id?" element={<CartScreen/>}/> */}
                <Route path="/cart" element={<CartScreen/>}/>
                <Route path="/cart/:id" element={<CartScreen/>}/>
                {/* <Route path="/cart/" element={<CartScreen/>}/> */}
              </Routes>
          </Container>
        </main>
      <Footer/>
    </>
  );
}

export default App;
