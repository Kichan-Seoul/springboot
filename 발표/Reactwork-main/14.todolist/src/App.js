import './App.css';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import { useState, useRef } from 'react';

const tmpData = [
  {
    id: 0,
    isFlag: false,
    content: 'React 공부하기',
    date: new Date().getTime()  
  },
  {
    id: 1,
    isFlag: false,
    content: '시~원하게 담배피기',
    date: new Date().getTime()
  },
  {
    id: 2,
    isFlag: false,
    content: '기분좋게 집에가기',
    date: new Date().getTime()
  }
];

function App() {
  const [todos, setTodos] = useState(tmpData);

  /*
  * useRef()
    : 변경되는 값 저장
      DOM요소에 직접 접근가능
      재랜더링 되지 않음
  */ 
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newItem = {
      id : idRef.current++,
      isDone : false,
      content : content,
      date: new Date().getTime()
    }
    setTodos([newItem, ...todos])
  }
  return (
    <div className="App">
      <Header/>
      <Editor onCreate={onCreate}/>
      <List todos={todos}/>
    </div>
  );
}

export default App;