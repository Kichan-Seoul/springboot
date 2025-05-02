import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import { useReducer, useRef, createContext } from 'react';

const mockData = [
  {
    id : 1,
    createDate : new Date("2025-04-15").getTime(),
    emotionId : 1,
    content : "오늘은 기쁜날"
  },
  {
    id : 2,
    createDate : new Date("2025-04-03").getTime(),
    emotionId : 2,
    content : "오늘은 슬픈날"
  },
  {
    id : 3,
    createDate : new Date("2025-03-25").getTime(),
    emotionId : 3,
    content : "오늘은 화가난다"
  },
  {
    id : 4,
    createDate : new Date("2025-02-17").getTime(),
    emotionId : 4,
    content : "두렵다.. 지하철통학이"
  },
]

function reducer(state, action) {
  switch(action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) => 
        item.id === action.data.id ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.id);
    default:
      return state; 
  }
}

export const DiaryStateContext = createContext();  
export const DiaryDispatchContext = createContext();   

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(5);


  const onCreate = (createDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content
      }
    });
  };

 
  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createDate,
        emotionId,
        content
      }
    });
  };

 
  const onDelete = id => {
    dispatch({
      type: "DELETE",
      id
    });
  };

  return (
    <div className="App">
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/*" element={<div>잘못된 페이지 입니다</div>} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </div>
  );
}

export default App;
