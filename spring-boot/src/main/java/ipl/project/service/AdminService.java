package ipl.project.service;

import ipl.project.entity.AdminDetails;
import ipl.project.entity.Login;

import java.util.List;

public interface AdminService {

    void save(AdminDetails details);

    AdminDetails loginPerform(Login login);

    AdminDetails getAdminDetails();

    List<AdminDetails> getAdminDetailsList();
}
