import { useState } from "react";
import Todoitem from "./Todoitem";

const List = ({ todos }) => {
  const [search, setSearch] = useState("");

  const getSearchData = () => {
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filtertodos = getSearchData();

  return (
    <div className="List">
      <h4>Todo List</h4>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="todos_wrapper">
        {filtertodos.map((todo) => (
          <Todoitem
            key={todo.id}
            isDone={todo.isFlag}
            content={todo.content}
            date={todo.date}
            onDelete={() => console.log("삭제 구현 예정")}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
