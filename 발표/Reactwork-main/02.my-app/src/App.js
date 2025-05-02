import logo from './logo.svg';
/*
// 1. style을 별도의 파일로 저장하여 사용
import './App.css';

function App() {
  
  return (
    <div>
      <h1>React Test Page</h1>
      <h3>JAVA 풀스택 웹&앱 개발자 취업캠프</h3>
      <p className="class">react calss로 style적용하기</p>
      <p id="id2">id로 스타일 적용하기</p>
    </div> 
  );
}
*/
/*
// 2. style을 변수에 객체로 저장하여 사용
function App() {
  const style = {
    div : {
      backgroundColor : 'yellow',
      padding : '50px',
      textalign : 'center',
      fontSize : '30px'
    },
    h1 : {color : 'red'} , 
    h3 : {color : 'green'} ,
    class1 : {color : 'pink'} ,
    id2 : {color : 'blue'}
  }  
  return (
    <div style={style.div}> 
      <h1 style={style.h1}>React Test Page</h1>
      <h3 style={style.h3}>JAVA 풀스택 웹&앱 개발자 취업캠프</h3>
      <p className="class1" style={style.class1}>react calss로 style적용하기</p>
      <p id="id2" style={style.id2}>id로 스타일 적용하기</p>
    </div> 
  );
}
*/

// 3. inline방식으로 style주기
function App() {
  
  return (
    <div style={ {textAlign:'center'}}>
      <h1 style={{color:'aqua'}}>React Test Page</h1>
      <h3 style={{color:'gold' , backgroundColor:'black'}}>JAVA 풀스택 웹&앱 개발자 취업캠프</h3>
      <p>react calss로 style적용하기</p>
      <p id="id2">id로 스타일 적용하기</p>
    </div> 
  );
}

export default App;
