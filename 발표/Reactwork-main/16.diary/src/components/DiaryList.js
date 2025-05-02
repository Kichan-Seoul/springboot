import React, { useState, useEffect, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import Button from "./Button";
import './DiaryList.css';
import DiaryItem from './DiaryItem';
import { DiaryDispatchContext } from '../App';

const DiaryList = ({ data }) => {
  const { onUpdate } = useContext(DiaryDispatchContext);
  const [sortType, setSortType] = useState('latest');
  const [diaries, setDiaries] = useState(data);
  const nav = useNavigate();  

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    return [...diaries].sort((a, b) => {
      if (sortType === "oldest") {
        return a.createDate - b.createDate;
      } else {
        return b.createDate - a.createDate;
      }
    });
  };

  const sortedData = getSortedData();

  useEffect(() => {
    setDiaries(data);
  }, [data]);

  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select value={sortType} onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button text={"새 일기 쓰기"} type={"green"} onClick={() => nav("/new")} />
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem {...item} key={item.id} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
