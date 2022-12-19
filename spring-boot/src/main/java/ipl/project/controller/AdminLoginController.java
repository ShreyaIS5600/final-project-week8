package ipl.project.controller;

import ipl.project.entity.AdminDetails;
import ipl.project.entity.Login;
import ipl.project.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/Teams")
public class AdminLoginController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/loginEvent")
    public ResponseEntity<?> login(@RequestBody Login login) {
        AdminDetails details = adminService.loginPerform(login);
        if (details == null) {
           return ResponseEntity.badRequest().body(Map.of("message", "Invalid Email Address Or Password!"));
        }
        return ResponseEntity.ok(details);
    }

}
