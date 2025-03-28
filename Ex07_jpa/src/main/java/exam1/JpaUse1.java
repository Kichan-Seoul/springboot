package exam1;

import java.time.LocalDate;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;

public class JpaUse1 {

	public static void main(String[] args) {
		// JPA환경 설정
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("JpaEx01");
		// 실제 DB와 연결하여 CRUD
		EntityManager em = emf.createEntityManager();
		// 트랜잭션 관리
		EntityTransaction ts = em.getTransaction();
	
		try {
			ts.begin();		// 트랜잭션 시작
			
			Member1 user = new Member1("홍길동", LocalDate.now());
			
			// .persist() 영속성으로 객체에 데이터 입력(메모리에 isnert해주는 부분)
			em.persist(user);
			
			// DB에 insert
			ts.commit();
		} catch(Exception e) {
			e.printStackTrace();
			 ts.rollback();
		} finally {
			em.close();
		}
	}

}
