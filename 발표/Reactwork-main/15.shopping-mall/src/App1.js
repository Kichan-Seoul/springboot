import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Row, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import pList from './data/ProductList';

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

      <div className="main-bg"></div>

      <Container>
        <Row>
          {clothes.map((item, index) => (
            <Col key={index}>
              <img
                src={`${process.env.PUBLIC_URL}/img/f${index + 1}.png`}width="80%"
                alt={`f${index + 1}`}
              />
              <h4>{item.title}</h4>
              <p>{item.price}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
