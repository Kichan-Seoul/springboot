import { useNavigate } from "react-router-dom";
import List from "../component/List";

const MyPost = () => {

    const nav = useNavigate();
    
    
    return(
        <div>
        <h1>내글보기</h1>
        ID 기준 내가 쓴 글만 가지고 오기 <br/>  List, Item 가져다 쓰기 <br/>
        {/* <List post={post} /> */}
        
        <button onClick={() => {
                    nav('/edit')
                }}> 수정
        </button>
        
        <button>삭제</button>
        </div>
    )
}

export default MyPost;