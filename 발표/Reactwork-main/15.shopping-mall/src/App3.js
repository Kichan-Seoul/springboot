import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import pList from './data/ProductList';
import { Route, Routes, useNavigate } from 'react-router-dom'; // ✅ 여기서 한 번만 import
import Cart from './pages/Cart';
import Detail from './pages/Detail';

function App() {
  const [clothes, setClothes] = useState(pList);
  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Fashion Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/detail/0')}>Detail</Nav.Link>
            <Nav.Link onClick={() => navigate('/cart')}>Cart</Nav.Link>
            <Nav.Link onClick={() => navigate('/about')}>About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg' />
            <Container>
              <Row>
                {
                  clothes.map((v, i) => (
                    <PListCol clothes={v} index={i} key={i} />
                  ))
                }
              </Row>
            </Container>
          </>
        } />

        <Route path='/detail/:pindex' element={<Detail clothes={clothes} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<div>더조은 컴퓨터 아카데미</div>} />
        <Route path='*' element={<div>없는 페이지 입니다.</div>} />
      </Routes>
    </div>
  );
}

function PListCol(props) {
  const navigate = useNavigate();

  return (
    <Col onClick={() => navigate(`/detail/${props.index}`)} style={{ cursor: 'pointer' }}>
      <img src={`${process.env.PUBLIC_URL}/img/f${props.index + 1}.png`} width="70%" />
      <h4>{props.clothes.title}</h4>
      <p>{props.clothes.price}</p>
    </Col>
  );
}

export default App;
