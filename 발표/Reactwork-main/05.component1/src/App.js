/*
  * 컴포넌트
    - 리액트는 Component 기반의 구조를 가지고있다



  * Component 사용시 장점
    - 코드 양을 줄일 수 있다
    - 갭라시간을 줄일 수 있다
    - 유지보수 비용이 줄어든다

  * 컴포넌트의 구성요소
    1) property(props)
      : 부모 컴포넌트에서 자식 컴포넌트에 전달되는 데이터. 자식 컴포넌트에서는 수정 할 수 없다.
    2) state
      : 컴포넌트의 상태를 저장하고 수정 가능한 데이터
    3) context
      : 부모 컴포넌트에서 생성하여 모든 자식 컴포넌트에게 전달하는 데이터



*/
import logo from './logo.svg';
import './App.css';

const user = {
  firstName : 'Hong',
  lastName : 'GilDong'
};

function Student(user) {
  return user.firstName + ' ' + user.lastName;
}

function App() {
  const isStudent = true;
  return (
    <div className="App">
        <h1>Start React 2025 Thoeun</h1>
        <h3>Component 실습</h3>

        {isStudent == true ? <h4>{Student(user)}님 환영합니다</h4> : <h4>학원생이 아닙니다.</h4>}
        <Com1></Com1>
        <Com1/>
        <Com1/>
    </div>

  );
}

function Com1(){
  return (
    <>
    <h2>[ThiS IS COMPONENT]</h2>
    <p>고용노동부 k-digital 취업캠프</p>
    <ul>
      <li>java</li>

      <li>oracle</li>
      <li>spring boot</li>
      <li>react</li>
    </ul>
    </>
  )
}






export default App;
