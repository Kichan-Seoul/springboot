import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";
import { useContext, useState, useEffect } from 'react';
import { DiaryStateContext } from '../App';

const getMonthlyDate = (pivotDate, data) => {
    
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1).setHours(0, 0, 0, 0);

   
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0).setHours(23, 59, 59, 999);
    
    console.log("beginTime:", beginTime);
    console.log("endTime:", endTime);

   
    return data.filter((item) => item.createDate >= beginTime && item.createDate <= endTime);
};

const Home = () => {
    const [pivotDate, setPivotDate] = useState(new Date()); 
    const data = useContext(DiaryStateContext);  

   
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };

  
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };

    const monthlyData = getMonthlyDate(pivotDate, data); 

    return (
        <div>
            <h4>Home</h4>
            <Header 
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}  
                leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}  
                rightChild={<Button text={">"} onClick={onIncreaseMonth} />} 
            />
            <DiaryList data={monthlyData} />  
        </div>
    );
};

export default Home;
