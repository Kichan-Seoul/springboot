import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Row, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import pList from './data/ProductList';
import { Route, Routes ,Link} from 'react-router-dom';
import Cart from './pages/Cart';
import Detail from './pages/Detail';


/*
  * react-router-dom
    : 페이지를 교체시켜주는 api -> router-dom

  * 사용할려면 
    1. 설치 : npm i react-router-dom
*/

function App() {
  const [clothes, setCloths] = useState(pList);

  return (
    <div className="App">
     
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">DANAWA</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Link to="/"> Home </Link>
      <Link to="/detail"> 상세페이지 </Link>
      <Link to="/cart"> 장바구니 </Link>


      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'/>     
            <Container>
              <Row>
              {
                clothes.map((v, i) => {
                  return (
                    <PListCol clothes={v} key={i} index={i} />
                  )
                })
              }
              </Row>
            </Container>
          </>
        }/>
        <Route path='/detail' element={<Detail/>} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
    </div>
  );
}
function PListCol(props) {
  return (
    <Col>
      <img src={`${process.env.PUBLIC_URL}/img/f${props.index + 1}.png`} width="80%" />
      <h4>{props.clothes.title}</h4>
      <p>{props.clothes.price}</p>
    </Col>
  );
}

export default App;