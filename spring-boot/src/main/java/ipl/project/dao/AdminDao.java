package ipl.project.dao;

import ipl.project.entity.AdminDetails;
import ipl.project.entity.Login;
import ipl.project.repository.AdminRepository;
import ipl.project.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.Tuple;
import java.util.List;

@Service
@Transactional
public class AdminDao implements AdminService {

    @Autowired
    private AdminRepository repository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void save(AdminDetails details) {
        repository.save(details);
    }

    @Override
    public AdminDetails loginPerform(Login login) {
        return repository.findByEmailAddressAndPassword(login.getEmailAddress(), login.getPassword());
    }

    @Override
    public AdminDetails getAdminDetails() {
        Query query = entityManager.createNativeQuery("select a.* from admin_details a limit 1 ;", Tuple.class);
        Tuple tuple = (Tuple) query.getSingleResult();
        return new AdminDetails(tuple.get("first_name").toString(), tuple.get("last_name").toString(),
                tuple.get("email_address").toString(), tuple.get("password").toString());
    }

    @Override
    public List<AdminDetails> getAdminDetailsList() {
        return repository.findAll();
    }

}
