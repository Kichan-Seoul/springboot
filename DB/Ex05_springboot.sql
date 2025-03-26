create sequence seq_board nocache;

create table boardtest (
    boardno number primary key,
    title VARCHAR2(100),
    writter VARCHAR2(20),
    content VARCHAR2(500)
);

insert into boardtest values(seq_board.nextval, '제목1','킹키준','내용1');
insert into boardtest values(seq_board.nextval, '제목2','킹키훈','내용2');

commit;