package com.shopease.backend.database.mysql.repository;

import com.shopease.backend.database.mysql.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDetailsRepository extends JpaRepository<Users,Long> {
    Optional<Users> findByGmail(String gmail);
    Optional<Users> findById(long id);
    Optional<Users> findByGmailAndPassword(String gmail, String password);
}
