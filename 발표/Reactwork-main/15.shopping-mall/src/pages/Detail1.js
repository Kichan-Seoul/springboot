import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Detail(props) {
  let { pindex } = useParams();
  let product = props.clothes[pindex];

  const [alert, setAlert] = useState(true);
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => { setAlert(false); }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // 숫자의 상태를 저장하는 hook
  // 숫자가 들어오면 아무것도 안하고, 문자가 들어오면 alert 창 띄우기
  useEffect(() => {
    if (input !== '' && isNaN(input)) {
      alert('숫자만 입력 가능합니다!');
    }
  }, [input]);

  if (!product) {
    return <div>존재하지 않는 상품입니다.</div>
  }

  return (
    <div className='detail'>
      <input onChange={(e)=>{SVGAnimatedNumber(e.target.value)}} />
      {
        alert && <div>3초 이내 구매시 30% 할인!</div>
      }
      <div className='detail_img'>
        <img src={`${process.env.PUBLIC_URL}/img/f${product.id}.png`} width="60%" />
      </div>
      <div className='detail_text'>
        <h4>{product.title}</h4>
        <p>{product.content}</p>
        <p>{product.price}원</p>
        <input
          type="text"
          placeholder="숫자만 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <Button variant="outline-info">주문하기</Button>
      </div>
    </div>
  );
}

export default Detail;
