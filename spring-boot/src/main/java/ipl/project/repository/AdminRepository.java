package ipl.project.repository;

import ipl.project.entity.AdminDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<AdminDetails, Integer> {

    AdminDetails findByEmailAddressAndPassword(String emailAddress, String password);
}
