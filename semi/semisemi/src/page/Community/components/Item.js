import { useNavigate } from "react-router-dom";

const Item = ({ post, clickView }) => {

  const nav = useNavigate();

  const handleClick = () => {
    clickView(post.id);       
    nav(`/detail/${post.id}`); 
  };

    return(
    <>
    <tr onClick={handleClick}>
      <td>{post.id}</td>
      <td>{post.title}</td>
    
      <td>{post.writer}</td>
      <td>{post.date}</td>
      <td>{post.views}</td>
    </tr>
     </>
    )
}

export default Item;