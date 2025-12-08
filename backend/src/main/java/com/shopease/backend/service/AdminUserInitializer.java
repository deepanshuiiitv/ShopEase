package com.shopease.backend.service;
import com.shopease.backend.enumfile.Role;
import com.shopease.backend.database.mysql.entity.Users;
import com.shopease.backend.database.mysql.repository.UserDetailsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminUserInitializer {

    @Bean
    public CommandLineRunner createAdminUser(UserDetailsRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByGmail("admin").isEmpty()) {
                Users admin = new Users();
                admin.setGmail("admin");
                admin.setPassword(passwordEncoder.encode("admin1234")); // Securely store password
                admin.setRole(Role.ADMIN);

                userRepository.save(admin);
                System.out.println("Default admin  created!");
            }
            if (userRepository.findByGmail("user").isEmpty()) {
                Users admin = new Users();
                admin.setGmail("user");
                admin.setPassword(passwordEncoder.encode("user1234")); // Securely store password
                admin.setRole(Role.USER);

                userRepository.save(admin);
                System.out.println("Default user created!");
            }
        };
    }
}