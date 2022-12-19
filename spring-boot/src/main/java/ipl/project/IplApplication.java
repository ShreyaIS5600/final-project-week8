package ipl.project;

import ipl.project.entity.AdminDetails;
import ipl.project.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableJpaRepositories
public class IplApplication implements CommandLineRunner {

    @Autowired
    private AdminService service;

    public static void main(String[] args) {
        SpringApplication.run(IplApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfig() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedHeaders("*")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT")
                        .maxAge(-1).allowCredentials(true);
            }
        };
    }

    @Override
    public void run(String... args) throws Exception {
        if (!(service.getAdminDetailsList().size() > 0)) {
            AdminDetails details = new AdminDetails("Idris", "Ishaq", "idahinde@gmail.com", "12345");
            service.save(details);
        }
        this.previewAdminDetails();
    }

    private void previewAdminDetails() {
        AdminDetails details = service.getAdminDetails();
        String format = "| %-16s | %-31s |%n";
        System.out.println("+------------------+---------------------------------+");
        System.out.format("| %-50s |%n", "Admin Login Details");
        System.out.println("+------------------+---------------------------------+");
        System.out.format(format, "E-Mail Address", details.getEmailAddress());
        System.out.format(format, "Password", details.getPassword());
        System.out.println("+------------------+---------------------------------+");
    }

}
