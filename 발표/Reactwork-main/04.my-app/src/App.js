import logo from './logo.svg';
import './App.css';

function App() {
  const isStudent = true;



  return (
    /*
    <div className="App">
     isStudent == true ? <h1>학생입니다</h1> : <h1>학생이 아닙니다</h1>
    </div>
    */

    // 삼향 연산자로 인식하게하려면 {}안에 넣어준다
  <div className="App">
    {/*
    <div>
      if(isStudent){
        <h1>학생입니다</h1>
      } else {
        <h1>학생이아닙니다</h1>
      }
    </div>
    */}
    {isStudent == true ? <h1>학생입니다</h1> : <h1>학생이 아닙니다</h1>}
  </div>
  );
}

export default App;
