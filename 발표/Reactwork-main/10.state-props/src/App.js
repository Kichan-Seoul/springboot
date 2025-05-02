/*
  * useEffect()
    : 컴포넌트의 life사이클을 관리하는 리액트 Hook
      컴포넌트가 생성될 때(mount) -> update 될 때 -> 삭제 될 때(unmount)
*/

import { useState } from 'react';
import './App.css';
import Controller from './component/Controller.js';
import Views from './component/View.js'

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Counter</h1>
      <section>
        <Views count={count}/> 
      </section>
      <section>
        <Controller count={count} setCount={count}/> 
      </section> 
    </div>
  );
}

export default App;