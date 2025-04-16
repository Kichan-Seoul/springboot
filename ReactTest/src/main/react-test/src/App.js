import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
	const [hello, setHello] = useState('');
	
	useEffect(() => {
		axios.get('/api/test')
			 .then(result => {
				 console.log(result);
				 console.log(result.data);
				 setHello(result.data);
			 })
	},[])
	
  return (
    <div className="App">
      <h2>서버와 통신하기</h2>
      <p>서버에서 들어온 값 : {hello}</p>
      <button onClick={() => {
		  axios.get('/api/menuall')
		  		.then(result => {
					  console.log(result);
				  })
				  .catch(() => {
					  console.log("실패");
				  })
	  }}>서버에서 가져오기</button>
    </div>
  );
}

export default App;
