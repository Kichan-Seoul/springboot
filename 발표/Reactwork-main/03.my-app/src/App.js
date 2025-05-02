import logo from './logo.svg';
import './App.css';

function App() {
    // 변수나 함수를 정의하여 사용
    // 출력시 { } 안에 넣어서 출력
  const name = 'Thoeun';
  let classname = 'java 취업캠프';
  var value = '변수';
  const funcName = () => {
    return '함수에서 문자 반환';
  };

  return (
    <div className="App">
      <h1>{name}에 오신것을 환영합니다.</h1>
      <h2>과정명 : {classname}</h2>

      <h3>중괄호 안에 넣을 수 있는 것들</h3>
      <ul>
        <li>{'문자'}와 {1 + 6} 숫자 가능</li>
        <li>{funcName()} : 함수도 가능</li>
      </ul>

      <h3>중괄호 안에 넣을 수 없는 것들</h3>
      <ul>
          <li>{true} 불리언 불가</li>
          <li>{[]} 배열 불가 </li>
      </ul>
    </div>
  );
}

export default App;
