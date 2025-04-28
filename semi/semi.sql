- - 사용자 정보 테이블
CREATE TABLE users (
user_id VARCHAR2(50) PRIMARY KEY, -- 사용자 고유 ID
password_hash VARCHAR2(255) NOT NULL, -- 해시된 비밀번호
name VARCHAR2(50) NOT NULL, -- 사용자 이름
gender CHAR(1) CHECK (gender IN ('M', 'F')) NOT NULL, -- 성별 (M/F)
birth_date DATE, -- 생년월일
height NUMBER(3), -- 키 (cm)
weight NUMBER(5,2), -- 현재 몸무게
goal_weight NUMBER(5,2), -- 목표 몸무게
challenge_score NUMBER DEFAULT 0, -- 챌린지 점수
is_active CHAR(1) DEFAULT 'Y' CHECK (is_active IN ('Y','N')), -- 계정 활성화 여부
profile_image_url VARCHAR2(255) -- 프로필 이미지
);
- - 운동 목록 테이블
CREATE TABLE exercises (
exercise_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- 운동 ID
name VARCHAR2(100) NOT NULL, -- 운동 이름
calories_burned NUMBER NOT NULL, -- 소모 칼로리
default_duration_min NUMBER, -- 운동 시간
type VARCHAR2(50), -- 운동 유형
created_by VARCHAR2(50) NOT NULL, -- 사용자 ID
CONSTRAINT fk_exercise_user FOREIGN KEY (created_by) REFERENCES users(user_id)
);
- - 음식 목록 테이블
CREATE TABLE foods (
food_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- 음식 ID
name VARCHAR2(100) NOT NULL, -- 음식 이름
calories NUMBER NOT NULL, -- 칼로리
category VARCHAR2(50), -- 음식 카테고리
unit VARCHAR2(50) DEFAULT '1인분', -- 단위
created_by VARCHAR2(50) NOT NULL, -- 사용자 ID
CONSTRAINT fk_food_user FOREIGN KEY (created_by) REFERENCES users(user_id)
);
- - 챌린지 테이블
CREATE TABLE challenges (
challenge_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
title VARCHAR2(100) NOT NULL,
description CLOB,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
point_reward NUMBER,
difficulty VARCHAR2(10) DEFAULT '초급',
category VARCHAR2(50),
CONSTRAINT chk_challenge_difficulty CHECK (difficulty IN ('초급', '중급', '고급'))
);
- - 챌린지 참여 내역
CREATE TABLE challenge_participation (
participation_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
user_id VARCHAR2(50),
challenge_id NUMBER,
status VARCHAR2(10) DEFAULT '진행 중',
joined_at DATE,
completed_at DATE,
earned_points NUMBER DEFAULT 0,
CONSTRAINT chk_participation_status CHECK (status IN ('진행 중', '완료', '취소')),
CONSTRAINT fk_part_user FOREIGN KEY (user_id) REFERENCES users(user_id),
CONSTRAINT fk_part_challenge FOREIGN KEY (challenge_id) REFERENCES challenges(challenge_id)
);
- - 운동 기록
CREATE TABLE exercise_logs (
log_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
user_id VARCHAR2(50),
exercise_id NUMBER,
duration_min NUMBER,
calories_burned NUMBER,
log_date DATE,
CONSTRAINT fk_ex_log_user FOREIGN KEY (user_id) REFERENCES users(user_id),
CONSTRAINT fk_ex_log_ex FOREIGN KEY (exercise_id) REFERENCES exercises(exercise_id)
);
- - 음식 섭취 기록
CREATE TABLE food_logs (
log_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
user_id VARCHAR2(50),
food_id NUMBER,
quantity NUMBER DEFAULT 1,
total_calories NUMBER,
log_date DATE,
CONSTRAINT fk_food_log_user FOREIGN KEY (user_id) REFERENCES users(user_id),
CONSTRAINT fk_food_log_food FOREIGN KEY (food_id) REFERENCES foods(food_id)
);
- - 게시글
CREATE TABLE posts (
post_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
user_id VARCHAR2(50),
title VARCHAR2(200) NOT NULL,
content CLOB NOT NULL,
created_at DATE DEFAULT SYSDATE,
updated_at DATE DEFAULT SYSDATE,
CONSTRAINT fk_post_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);
- - 댓글
CREATE TABLE comments (
comment_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
post_id NUMBER,
user_id VARCHAR2(50),
content CLOB NOT NULL,
created_at DATE DEFAULT SYSDATE,
CONSTRAINT fk_comment_post FOREIGN KEY (post_id) REFERENCES posts(post_id),
CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);
- - 일일 요약
CREATE TABLE daily_summary (
summary_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
user_id VARCHAR2(50),
summary_date DATE,
total_calories_intake NUMBER,
total_calories_burned NUMBER,
CONSTRAINT fk_summary_user FOREIGN KEY (user_id) REFERENCES users(user_id),
CONSTRAINT uq_user_date UNIQUE (user_id, summary_date)
);

INSERT INTO users (  user_id, password_hash, name, gender, birth_date, height, weight, goal_weight)
VALUES (  'admin', 'admin123', '관리자', 'M', TO_DATE('1990-01-01', 'YYYY-MM-DD'), 175, 70, 65);

INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('닭가슴살 (100g)', '단백질', 165, '100g', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('삶은 계란 (1개)', '단백질', 77, '1개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('고구마 (100g)', '탄수화물', 120, '100g', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('바나나 (1개)', '과일', 89, '1개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('현미밥 (1공기)', '탄수화물', 320, '1공기', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('샐러드 (야채)', '채소', 60, '야채', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('김치찌개 (1인분)', '한식', 220, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('삼겹살 (100g)', '육류/지방', 400, '100g', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('아이스크림 (100ml)', '디저트', 207, '100ml', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('아메리카노', '음료', 5, '1잔', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('라면 (1봉지)', '가공식품', 500, '1봉지', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('볶음밥 (1인분)', '한식', 450, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('시리얼 (100g)', '간편식', 380, '100g', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('두유 (200ml)', '음료', 130, '200ml', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('치킨 (날개 1조각)', '육류/지방', 180, '1조각', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('초콜릿 (1조각)', '디저트', 80, '1조각', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('감자튀김 (중)', '패스트푸드', 365, '중', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('피자 (한 조각)', '패스트푸드', 285, '1조각', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('우유 (200ml)', '음료', 128, '200ml', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('과자 (소포장)', '간식', 250, '소포장', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('떡볶이 (1인분)', '한식', 420, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('부대찌개 (1인분)', '한식', 480, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('된장찌개 (1인분)', '한식', 250, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('오므라이스 (1인분)', '한식', 540, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('잡채 (100g)', '한식', 210, '100g', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('불고기 (100g)', '한식', 300, '100g', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('회덮밥 (1인분)', '한식', 390, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('스테이크 (200g)', '서양식', 520, '200g', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('샌드위치', '간편식', 350, '1개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('토스트 (버터 포함)', '간편식', 320, '1개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('햄버거 (일반)', '패스트푸드', 530, '1개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('치즈버거', '패스트푸드', 600, '1개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('떡국 (1그릇)', '한식', 330, '1그릇', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('냉면 (1그릇)', '한식', 360, '1그릇', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('계란후라이 (1개)', '단백질', 90, '1개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('치즈 (슬라이스)', '지방', 80, '1장', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('크림파스타 (1인분)', '서양식', 670, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('토마토파스타', '서양식', 550, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('컵라면', '가공식품', 470, '1개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('단팥빵 (1개)', '디저트', 290, '1개', 'admin');

INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('걷기 (보통 속도)', '유산소', 30, 150, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('조깅 (6km/h)', '유산소', 30, 300, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('달리기 (10km/h)', '유산소', 30, 450, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('자전거 타기', '유산소', 30, 250, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('스쿼트 (자중)', '근력', 15, 120, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('플랭크', '근력', 10, 60, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('줄넘기', '유산소', 20, 250, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('등산', '유산소', 60, 400, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('요가', '유연성', 60, 180, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('필라테스', '유연성', 60, 200, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('계단 오르기', '유산소', 15, 150, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('런닝머신', '유산소', 30, 300, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('벤치프레스', '근력', 20, 180, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('크런치', '근력', 15, 100, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('헬스 자전거', '유산소', 30, 260, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('줄다리기', '유산소', 15, 120, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('에어로빅', '유산소', 30, 270, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('스트레칭', '유연성', 20, 60, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('계속 서 있기', '일상활동', 30, 50, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('청소하기', '일상활동', 30, 100, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('팔굽혀펴기', '근력', 15, 100, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('레그프레스', '근력', 20, 140, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('데드리프트', '근력', 20, 180, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('런지', '근력', 15, 130, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('턱걸이', '근력', 15, 120, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('사이클링', '유산소', 30, 270, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('수영 (자유형)', '유산소', 30, 330, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('배드민턴', '유산소', 30, 250, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('탁구', '유산소', 30, 180, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('농구', '유산소', 30, 320, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('축구', '유산소', 30, 350, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('테니스', '유산소', 30, 300, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('골프 (걷기 포함)', '유산소', 60, 280, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('하이킹', '유산소', 60, 400, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('줄타기', '균형감각', 15, 90, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('복부운동', '근력', 15, 110, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('어깨운동', '근력', 15, 100, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('무릎굽히기', '근력', 10, 90, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('바벨스쿼트', '근력', 20, 170, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('스텝박스 운동', '유산소', 20, 160, 'admin');

INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('닭볶음탕', '한식', 520, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('순두부찌개', '한식', 280, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('해물파전', '한식', 450, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('오징어볶음', '한식', 380, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('낙지볶음', '한식', 420, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('비빔냉면', '한식', 440, '1그릇', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('곰탕', '한식', 300, '1그릇', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('설렁탕', '한식', 320, '1그릇', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('갈비탕', '한식', 400, '1그릇', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('된장국', '한식', 90, '1그릇', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('감자조림', '반찬', 150, '1접시', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('멸치볶음', '반찬', 130, '1접시', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('소시지 야채볶음', '반찬', 240, '1접시', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('불닭볶음면', '가공식품', 530, '1봉지', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('샐러드 치킨볼', '간편식', 250, '1팩', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('콘샐러드', '채소', 120, '1그릇', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('연어샐러드', '채소', 180, '1그릇', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('치즈스틱', '간식', 200, '2개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('크로와상', '빵', 320, '1개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('블루베리 요거트', '디저트', 150, '1컵', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('그릭 요거트', '디저트', 180, '1컵', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('불고기버거', '패스트푸드', 550, '1개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('햄치즈샌드위치', '간편식', 430, '1개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('스팸마요덮밥', '한식', 580, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('김밥', '한식', 420, '1줄', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('참치김밥', '한식', 450, '1줄', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('불고기김밥', '한식', 470, '1줄', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('유부초밥', '일식', 360, '6개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('초밥', '일식', 300, '6개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('우동', '일식', 420, '1그릇', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('돈까스', '일식', 650, '1인분', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('탄산수', '음료', 0, '1병', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('오렌지 주스', '음료', 110, '200ml', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('포카리', '음료', 130, '250ml', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('사이다', '음료', 160, '250ml', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('콜라', '음료', 180, '250ml', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('핫도그', '패스트푸드', 400, '1개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('떡꼬치', '간식', 220, '1개', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('마라탕', '중식', 600, '1그릇', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('짜장면', '중식', 700, '1그릇', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('짬뽕', '중식', 680, '1그릇', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('탕수육', '중식', 800, '1접시', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('깐풍기', '중식', 720, '1접시', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('양장피', '중식', 620, '1접시', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('비엔나소시지볶음', '반찬', 290, '1접시', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('계란말이', '반찬', 260, '1접시', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('오이무침', '반찬', 70, '1접시', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('콩나물무침', '반찬', 50, '1접시', 'admin');
INSERT INTO foods (name, category, calories, unit, created_by) VALUES ('무생채', '반찬', 60, '1접시', 'admin');

INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('러시안 트위스트', '근력', 15, 130, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('스탠딩 사이드 크런치', '근력', 10, 80, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('점프 스쿼트', '근력', 15, 160, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('사이드 런지', '근력', 15, 120, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('브릿지', '유연성', 15, 90, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('버터플라이 스트레칭', '유연성', 10, 50, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('팔 돌리기', '유연성', 10, 40, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('목 스트레칭', '유연성', 5, 20, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('허리 회전 운동', '유연성', 10, 60, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('뒤꿈치 들기', '일상활동', 10, 50, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('책상 앞 스트레칭', '일상활동', 10, 40, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('빨래 널기', '일상활동', 20, 90, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('설거지하기', '일상활동', 20, 80, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('쓰레기 버리기', '일상활동', 10, 30, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('창문 닦기', '일상활동', 20, 100, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('가벼운 요가', '유연성', 30, 120, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('하체 스트레칭', '유연성', 20, 90, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('트레드밀 걷기', '유산소', 30, 200, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('하이 니즈', '유산소', 10, 150, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('마운틴 클라이머', '유산소', 15, 170, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('펀치 운동', '유산소', 10, 130, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('박스 점프', '근력', 15, 160, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('팔벌려 높이뛰기', '근력', 10, 140, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('케틀벨 런지', '근력', 20, 220, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('덤벨 컬', '근력', 15, 130, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('스미스머신 스쿼트', '근력', 20, 200, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('사이드 플랭크', '근력', 10, 80, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('발끝 터치', '유연성', 10, 50, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('벽에 기대기', '유연성', 10, 30, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('등 스트레칭', '유연성', 10, 40, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('발목 돌리기', '유연성', 5, 20, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('하늘 자전거', '근력', 10, 110, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('플러터 킥', '근력', 10, 120, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('팔 펴기', '유연성', 5, 25, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('옆구리 스트레칭', '유연성', 10, 50, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('롤백', '유연성', 10, 45, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('휴식 시간 걷기', '일상활동', 10, 70, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('의자 스트레칭', '일상활동', 10, 35, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('팔 스트레칭', '유연성', 5, 25, 'admin');
INSERT INTO exercises (name, type, default_duration_min, calories_burned, created_by) VALUES ('점프런지', '근력', 15, 150, 'admin');

SELECT COUNT(*) FROM EXERCISES;
SELECT username FROM dba_users;
SELECT * FROM USERS WHERE USER_ID = 'admin' AND PASSWORD_HASH = 'admin123';

SELECT table_name, owner
FROM all_tables
WHERE table_name = 'EXERCISES';

GRANT SELECT ON admin.EXERCISES TO semi1;
GRANT SELECT ON admin.EXERCISES TO qwe123;
GRANT SELECT ON admin.FOODS TO semi1;
GRANT SELECT ON admin.FOODS TO qwe123;

SELECT user FROM dual;

SELECT username FROM dba_users;
SELECT username FROM all_users;
SELECT username FROM user_users;

SELECT table_name, owner
FROM all_tables
WHERE table_name IN ('EXERCISES', 'FOODS');

- - 사용자들한테 SELECT 권한 부여
GRANT SELECT ON SEMI.EXERCISES TO SEMI1;
GRANT SELECT ON SEMI.FOODS TO SEMI1;

GRANT SELECT ON SEMI.EXERCISES TO qwe123;
GRANT SELECT ON SEMI.FOODS TO qwe123;

CREATE USER qwe123 IDENTIFIED BY 1234;

GRANT SELECT ON admin.EXERCISES TO semi;
GRANT SELECT ON admin.FOODS TO semi;

SELECT table_name, owner FROM all_tables WHERE table_name IN ('EXERCISES', 'FOODS');

SELECT * FROM EXERCISES;
SELECT * FROM FOODS;

ALTER TABLE users ADD calories_burned NUMBER;

SELECT * FROM users;

SELECT * FROM v$database;

ALTER TABLE food_logs ADD MEAL_TIME VARCHAR2(20);

--SELECT DISTINCT e.type
--FROM exercise_logs l
--JOIN exercises e ON l.exercise_id = e.exercise_id
--WHERE l.user_id = :userId
--  AND TRUNC(l.log_date) = TRUNC(SYSDATE)
--FETCH FIRST 3 ROWS ONLY

ALTER TABLE POSTS ADD IS_NOTICE NUMBER(1);
UPDATE POSTS SET IS_NOTICE = 0 WHERE IS_NOTICE IS NULL;

-- 1. 기존 테이블 삭제
BEGIN
  EXECUTE IMMEDIATE 'DROP TABLE challenge_participation CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

BEGIN
  EXECUTE IMMEDIATE 'DROP TABLE challenges CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

-- 2. 챌린지 테이블 생성
CREATE TABLE challenges (
  challenge_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR2(100) NOT NULL,
  difficulty VARCHAR2(10) DEFAULT '초급',
  CONSTRAINT chk_challenge_difficulty CHECK (difficulty IN ('초급', '중급', '고급'))
);

DROP TABLE challenges;

CREATE TABLE challenges (
    challenge_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR2(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    point_reward NUMBER,
    difficulty VARCHAR2(10) DEFAULT '초급',
    category VARCHAR2(50),
    CONSTRAINT chk_challenge_difficulty CHECK (difficulty IN ('초급', '중급', '고급'))
);


-- 3. 참여 테이블 생성 (challenge_id 참조)
CREATE TABLE challenge_participation (
  participation_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id VARCHAR2(50) NOT NULL,
  challenge_id NUMBER NOT NULL,
  status VARCHAR2(10) DEFAULT '진행 중',
  joined_at DATE DEFAULT SYSDATE,
  completed_at DATE,
  earned_points NUMBER DEFAULT 0,
  CONSTRAINT fk_challenge FOREIGN KEY (challenge_id) REFERENCES challenges(challenge_id),
  CONSTRAINT chk_status CHECK (status IN ('진행 중', '대기중', '완료', '취소'))
);

-- 4. 챌린지 데이터 전체 삽입
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('물 2L 마시기', SYSDATE, SYSDATE + 30, 50, '초급', '건강');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('30분 걷기', SYSDATE, SYSDATE + 30, 50, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('계단 10층 오르기', SYSDATE, SYSDATE + 30, 60, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('팔 돌리기 30회', SYSDATE, SYSDATE + 30, 40, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('스쿼트 20회', SYSDATE, SYSDATE + 30, 50, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('무릎 대고 팔굽혀펴기 10회', SYSDATE, SYSDATE + 30, 40, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('허리 스트레칭 3세트', SYSDATE, SYSDATE + 30, 50, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('목 스트레칭 3세트', SYSDATE, SYSDATE + 30, 40, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('까치발 들기 30회', SYSDATE, SYSDATE + 30, 40, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('제자리 뛰기 2분', SYSDATE, SYSDATE + 30, 50, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('트위스트 동작 1분', SYSDATE, SYSDATE + 30, 40, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('벽에 기대고 앉기 1분', SYSDATE, SYSDATE + 30, 50, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('엉덩이 들고 버티기 30초', SYSDATE, SYSDATE + 30, 40, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('플랭크 30초', SYSDATE, SYSDATE + 30, 50, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('런지 10회', SYSDATE, SYSDATE + 30, 40, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('손목 돌리기 30초', SYSDATE, SYSDATE + 30, 30, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('누워서 자전거 타기 동작 30초', SYSDATE, SYSDATE + 30, 40, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('TV 보면서 스트레칭 10분', SYSDATE, SYSDATE + 30, 40, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('1km 걷기 or 트레드밀', SYSDATE, SYSDATE + 30, 50, '초급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('양발 벌리고 옆구리 늘리기 10회', SYSDATE, SYSDATE + 30, 40, '초급', '운동');

-- 중급 챌린지 (운동, 식단, 건강 관련)
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('팔굽혀펴기 20회', SYSDATE, SYSDATE + 30, 70, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('스쿼트 50회', SYSDATE, SYSDATE + 30, 80, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('플랭크 1분', SYSDATE, SYSDATE + 30, 80, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('런지 20회', SYSDATE, SYSDATE + 30, 70, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('계단 20층 오르기', SYSDATE, SYSDATE + 30, 100, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('자전거 타기 30분', SYSDATE, SYSDATE + 30, 90, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('줄넘기 300회', SYSDATE, SYSDATE + 30, 120, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('트레드밀 3km', SYSDATE, SYSDATE + 30, 110, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('복근 운동 루틴 10분', SYSDATE, SYSDATE + 30, 100, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('전신 스트레칭 15분', SYSDATE, SYSDATE + 30, 90, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('엉덩이 킥 20회', SYSDATE, SYSDATE + 30, 100, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('암 서클 1분', SYSDATE, SYSDATE + 30, 70, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('벽 스쿼트 1분 30초', SYSDATE, SYSDATE + 30, 80, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('점핑잭 50회', SYSDATE, SYSDATE + 30, 90, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('푸시업 플랭크 번갈아 1세트', SYSDATE, SYSDATE + 30, 100, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('크런치 30회', SYSDATE, SYSDATE + 30, 80, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('데드버그 20회', SYSDATE, SYSDATE + 30, 80, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('사이드 레그 레이즈 15회', SYSDATE, SYSDATE + 30, 80, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('하이 니 30초', SYSDATE, SYSDATE + 30, 70, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('무릎 당기기 런지 10회', SYSDATE, SYSDATE + 30, 70, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('버피 테스트 10회', SYSDATE, SYSDATE + 30, 100, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('타바타 루틴 4분', SYSDATE, SYSDATE + 30, 110, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('코어 강화 루틴 10분', SYSDATE, SYSDATE + 30, 100, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('하체 루틴 3세트', SYSDATE, SYSDATE + 30, 90, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('요가 기본 동작 5개', SYSDATE, SYSDATE + 30, 80, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('고정된 시간에 운동 루틴 수행', SYSDATE, SYSDATE + 30, 100, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('홈트레이닝 영상 따라하기 15분', SYSDATE, SYSDATE + 30, 110, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('스텝박스 10분', SYSDATE, SYSDATE + 30, 90, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('인터벌 걷기/달리기 15분', SYSDATE, SYSDATE + 30, 100, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('상체 루틴 3세트', SYSDATE, SYSDATE + 30, 90, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('복근 집중 루틴 3세트', SYSDATE, SYSDATE + 30, 90, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('와이드 스쿼트 40회', SYSDATE, SYSDATE + 30, 100, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('스트레칭 후 코어 3세트', SYSDATE, SYSDATE + 30, 80, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('전신 루틴 20분', SYSDATE, SYSDATE + 30, 110, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('싱글 레그 밸런스 버티기 30초', SYSDATE, SYSDATE + 30, 80, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('팔벌려 높이뛰기 100회', SYSDATE, SYSDATE + 30, 100, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('러시안 트위스트 50회', SYSDATE, SYSDATE + 30, 100, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('트위스트 런지 10회', SYSDATE, SYSDATE + 30, 80, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('플랭크 후 푸시업 번갈아 3세트', SYSDATE, SYSDATE + 30, 110, '중급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('리버스 런지 + 니업 10회', SYSDATE, SYSDATE + 30, 90, '중급', '운동');

-- 고급 챌린지 (운동, 식단, 건강 관련)
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('팔굽혀펴기 50회', SYSDATE, SYSDATE + 30, 150, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('스쿼트 100회', SYSDATE, SYSDATE + 30, 160, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('플랭크 3분', SYSDATE, SYSDATE + 30, 150, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('5km 러닝', SYSDATE, SYSDATE + 30, 200, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('런지 50회', SYSDATE, SYSDATE + 30, 150, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('버피 테스트 50회', SYSDATE, SYSDATE + 30, 180, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('줄넘기 1000회', SYSDATE, SYSDATE + 30, 250, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('자전거 10km', SYSDATE, SYSDATE + 30, 220, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('크런치 100회', SYSDATE, SYSDATE + 30, 180, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('HIIT 루틴 20분', SYSDATE, SYSDATE + 30, 200, '고급', '운동');
-- 고급 챌린지 (운동, 식단, 건강 관련)
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('풀업 10회', SYSDATE, SYSDATE + 30, 250, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('푸쉬업-플랭크 복합 3세트', SYSDATE, SYSDATE + 30, 230, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('하체 루틴 5세트', SYSDATE, SYSDATE + 30, 240, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('상체 루틴 5세트', SYSDATE, SYSDATE + 30, 240, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('인터벌 러닝 10세트', SYSDATE, SYSDATE + 30, 260, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('계단 30층 오르기', SYSDATE, SYSDATE + 30, 300, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('무산소 운동 30분', SYSDATE, SYSDATE + 30, 250, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('전신 스트레칭 30분', SYSDATE, SYSDATE + 30, 230, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('스텝업+런지 루틴 4세트', SYSDATE, SYSDATE + 30, 250, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('코어 복합 루틴 15분', SYSDATE, SYSDATE + 30, 270, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('전신 근력 루틴 5세트', SYSDATE, SYSDATE + 30, 280, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('요가 30분', SYSDATE, SYSDATE + 30, 220, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('암워킹 1분', SYSDATE, SYSDATE + 30, 200, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('푸시업 1분 동안 계속', SYSDATE, SYSDATE + 30, 250, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('하이 니 2분', SYSDATE, SYSDATE + 30, 220, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('마운틴 클라이머 100회', SYSDATE, SYSDATE + 30, 260, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('점프 스쿼트 3세트', SYSDATE, SYSDATE + 30, 270, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('풀업+푸쉬업 복합 루틴', SYSDATE, SYSDATE + 30, 300, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('전신 타바타 루틴 20분', SYSDATE, SYSDATE + 30, 320, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('스플릿 스쿼트 15회', SYSDATE, SYSDATE + 30, 250, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('점프 런지 20회', SYSDATE, SYSDATE + 30, 240, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('잭나이프 크런치 50회', SYSDATE, SYSDATE + 30, 230, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('러시안 트위스트 100회', SYSDATE, SYSDATE + 30, 260, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('바이시클 크런치 100회', SYSDATE, SYSDATE + 30, 250, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('리버스 플랭크 1분', SYSDATE, SYSDATE + 30, 240, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('스케이터 점프 30초', SYSDATE, SYSDATE + 30, 230, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('힙 브릿지 50회', SYSDATE, SYSDATE + 30, 220, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('싱글 레그 데드리프트 15회', SYSDATE, SYSDATE + 30, 230, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('브로드 점프 15회', SYSDATE, SYSDATE + 30, 240, '고급', '운동');
INSERT INTO challenges (title, start_date, end_date, point_reward, difficulty, category) VALUES ('코어 루틴 연속 수행 30분', SYSDATE, SYSDATE + 30, 250, '고급', '운동');

ALTER TABLE POSTS
ADD views NUMBER DEFAULT 0;

commit;

