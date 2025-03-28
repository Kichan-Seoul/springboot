package exam3;

import java.time.LocalDate;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;

public class InsertTest {

	public static void main(String[] args) {
		// JPA환경 설정
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("JpaEx01");
		// 실제 DB와 연결하여 CRUD
		EntityManager em = emf.createEntityManager();
		// 트랜잭션 관리
		EntityTransaction ts = em.getTransaction();
		
		try {
			em.getTransaction().begin();
			
			Member3 user = new Member3("test@test.com", "킹키찬", LocalDate.now());
			System.out.println("1 : ");
			
			em.persist(user);
			System.out.println("2 : ");
			
			em.getTransaction().commit();
			System.out.println("3 : ");
			System.out.println("가입 요청을 처리 했습니다");
			
		} catch(Exception e) {
			e.printStackTrace();
			em.
		}
	}

}
