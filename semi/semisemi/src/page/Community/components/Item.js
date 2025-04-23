import { useNavigate } from "react-router-dom";

const Item = ({ post, clickView }) => {

  const nav = useNavigate();

  const handleClick = () => {
    clickView(post.id);        //조회수 증가
    nav(`/detail/${post.id}`); //상세
  };

    return(
    <>
    <tr onClick={handleClick}>
      <td>{post.id}</td>
      <td>{post.title}</td>
      {/* <td>{post.content}</td> */}
      <td>{post.writer}</td>
      <td>{post.date}</td>
      <td>{post.views}</td>
    </tr>
     </>
    )
}

export default Item;