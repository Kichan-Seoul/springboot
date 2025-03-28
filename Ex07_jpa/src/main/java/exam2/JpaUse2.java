package exam2;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;

public class JpaUse2 {

	public static void main(String[] args) {
		// JPA환경 설정
				EntityManagerFactory emf = Persistence.createEntityManagerFactory("JpaEx01");
				// 실제 DB와 연결하여 CRUD
				EntityManager em = emf.createEntityManager();
				// 트랜잭션 관리
				EntityTransaction ts = em.getTransaction();
				
				ts.begin();
				
				Member2 user = new Member2("킹키찬", "1234");
				
				em.persist(user);
				
				ts.commit();
	}

}
