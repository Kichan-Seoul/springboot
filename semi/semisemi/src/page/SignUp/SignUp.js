import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../SignUp/SignUp.css";  // SignUp 스타일 적용

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    passwordHash: "",
    name: "",
    gender: "M",
    birthDate: "",
    height: "",
    weight: "",
    goalWeight: "",
  });

  const [selectedCharacter, setSelectedCharacter] = useState(null); // 선택된 캐릭터
  const [isIdValid, setIsIdValid] = useState(false); // ID 중복 확인 여부

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCharacterSelect = (index) => {
    setSelectedCharacter(index); // 선택된 캐릭터 인덱스를 저장
  };

  const handleIdCheck = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${form.userId}`);
      if (response.data) {
        alert("이미 사용된 아이디입니다.");
        setIsIdValid(false);
      } else {
        alert("사용 가능한 아이디입니다.");
        setIsIdValid(true);
      }
    } catch (error) {
      console.error("아이디 중복 확인 실패:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isIdValid) {
      alert("아이디 중복 확인을 먼저 해주세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/users", form);
      console.log("등록 성공:", response.data);
      alert("회원 등록 성공!");

      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("isLoggedIn", "true");

      navigate("/main");
    } catch (error) {
      console.error("등록 실패:", error);
      alert("회원 등록 실패 ㅠㅠ");
    }
  };

  return (
    <div className="sign-up-wrapper">
    <div className="sign-up-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        {/* ID 입력란과 중복확인 버튼 */}
        <div className="input-group">
          <label htmlFor="userId">아이디:</label>
          <input name="userId" placeholder="아이디" onChange={handleChange} required />
          <button type="button" id="checkIdBtn" onClick={handleIdCheck}>
            중복확인
          </button>
        </div>

        {/* 비밀번호, 이름, 성별 */}
        <div className="input-group">
          <label htmlFor="passwordHash">비밀번호:</label>
          <input name="passwordHash" type="password" placeholder="비밀번호" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="name">이름:</label>
          <input name="name" placeholder="이름" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="gender">성별:</label>
          <select name="gender" onChange={handleChange}>
            <option value="M">남자</option>
            <option value="F">여자</option>
          </select>
        </div>

        {/* 생년월일 */}
        <div className="input-group">
          <label htmlFor="birthDate">생년월일:</label>
          <input name="birthDate" type="date" onChange={handleChange} />
        </div>

        {/* 키, 몸무게, 목표 몸무게 */}
        <div className="input-group-multiple">
          <div className="input-group">
            <label htmlFor="height">키:</label>
            <input name="height" type="number" placeholder="키(cm)" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label htmlFor="weight">몸무게:</label>
            <input name="weight" type="number" placeholder="현재 몸무게(kg)" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label htmlFor="goalWeight">목표 몸무게:</label>
            <input name="goalWeight" type="number" placeholder="목표 몸무게(kg)" onChange={handleChange} />
          </div>
        </div>

        {/* 캐릭터 선택 */}
        <div className="character-container">
          <img
            src="https://via.placeholder.com/70?text=Char1"
            alt="Character 1"
            className={selectedCharacter === 0 ? "selected" : ""}
            onClick={() => handleCharacterSelect(0)}
          />
          <img
            src="https://via.placeholder.com/70?text=Char2"
            alt="Character 2"
            className={selectedCharacter === 1 ? "selected" : ""}
            onClick={() => handleCharacterSelect(1)}
          />
          <img
            src="https://via.placeholder.com/70?text=Char3"
            alt="Character 3"
            className={selectedCharacter === 2 ? "selected" : ""}
            onClick={() => handleCharacterSelect(2)}
          />
          <img
            src="https://via.placeholder.com/70?text=Char4"
            alt="Character 4"
            className={selectedCharacter === 3 ? "selected" : ""}
            onClick={() => handleCharacterSelect(3)}
          />
        </div>

        <button type="submit">회원가입</button>
      </form>
      </div>
    </div>
  );
};

export default SignUp;
