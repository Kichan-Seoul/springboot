import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        title="새 일기 쓰기"
        leftChild={<Button text="< 뒤로가기" onClick={() => navigate(-1)} />}
      />
      <DiaryEditor />
    </div>
  );
};

export default New;
