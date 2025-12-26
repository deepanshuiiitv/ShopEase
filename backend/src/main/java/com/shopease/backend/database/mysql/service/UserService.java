package com.shopease.backend.database.mysql.service;

import com.shopease.backend.dto.UserDto;
import com.shopease.backend.entity.AuthRequest;
import com.shopease.backend.database.mysql.entity.Users;
import com.shopease.backend.database.mysql.repository.UserDetailsRepository;
import com.shopease.backend.dto.UserRecieved;
import com.shopease.backend.enumfile.Role;
import com.shopease.backend.util.TokenGenerateUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.catalina.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    UserDetailsRepository userDetailsRepository;
    TokenGenerateUtil tokenGenerateUtil;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserDetailsRepository userDetailsRepository, TokenGenerateUtil tokenGenerateUtil, PasswordEncoder passwordEncoder) {
        this.userDetailsRepository = userDetailsRepository;
        this.tokenGenerateUtil = tokenGenerateUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public Users adduser(UserRecieved userRecieved, HttpServletResponse response) {
        Users users = new Users();
        users.setGmail(userRecieved.getGmail());
        users.setFullName(userRecieved.getFullname());
        users.setPassword(passwordEncoder.encode(userRecieved.getPassword()));
        users.setRole(Role.USER);

        AuthRequest authRequest = new AuthRequest();
        authRequest.setGmail(userRecieved.getGmail());
        authRequest.setPassword(userRecieved.getPassword());
        userDetailsRepository.save(users);
        String token = tokenGenerateUtil.generateToken(authRequest);
        addCookies(response,token,users.getId());
        return users;
    }

    public String generateToken(AuthRequest authRequest) {
        return tokenGenerateUtil.generateToken(authRequest);
    }
    public Optional<Users> checkUserbyGmail(String gmail) {
        return userDetailsRepository.findByGmail(gmail);
    }

    public Optional<Users> authenticateUser(String gmail) {
        return userDetailsRepository.findByGmail(gmail);
    }

    public Optional<UserDto> getUserById(String id){
        Optional<Users> user = userDetailsRepository.findById(Long.parseLong(id));
        UserDto userDto=new UserDto();
        userDto.setFullname(user.get().getFullName());
        userDto.setGmail(user.get().getGmail());
        return Optional.of(userDto);
    }

    public boolean addCookies(HttpServletResponse response,String token,long userId){
        Cookie tokenInCookie = new Cookie("token", token);
        tokenInCookie.setPath("/");
        tokenInCookie.setHttpOnly(true);
        tokenInCookie.setMaxAge(24 * 60 * 60);

        Cookie userIdInCookie = new Cookie("userId", String.valueOf(userId));
        userIdInCookie.setPath("/");
        userIdInCookie.setMaxAge(24 * 60 * 60);
        userIdInCookie.setHttpOnly(false); // allow JavaScript to read it (for GetUserId)
        userIdInCookie.setSecure(false);   // Set to true if using HTTPS

        response.addCookie(tokenInCookie);
        response.addCookie(userIdInCookie);

        return true;
    }
    public List<UserDto> getAllUsers() {
        return userDetailsRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList(); // Java 17+
    }

    private UserDto toDto(Users user) {
        UserDto dto = new UserDto();
        dto.setGmail(user.getGmail());
        dto.setFullname(user.getFullName());
        return dto;
    }
}
