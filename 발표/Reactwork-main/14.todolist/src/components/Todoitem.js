const Todoitem = ({ isDone, content, date, onDelete }) => {
    return (
      <div className='TodoItem'>
        <div className='TodoItemLeft'>
          <input type='checkbox' checked={isDone} readOnly />
          <div className='TodoTextGroup'>
            <span className='TodoText'>{content}</span>
            <span className='TodoDate'>{new Date(date).toLocaleDateString()}</span>
          </div>
        </div>
        <button className='TodoDelete' onClick={onDelete}>삭제</button>
      </div>
    );
  };
  
  
  
  export default Todoitem;
  