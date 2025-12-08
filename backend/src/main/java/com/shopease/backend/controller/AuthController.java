package com.shopease.backend.controller;

import com.shopease.backend.database.mysql.entity.Users;
import com.shopease.backend.entity.AuthRequest;
import com.shopease.backend.enumfile.Role;
import com.shopease.backend.database.mysql.service.UserService;
import com.shopease.backend.util.TokenGenerateUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class AuthController {
    private final TokenGenerateUtil tokenGenerateUtil;
    private final UserService userService;

    public AuthController(TokenGenerateUtil tokenGenerateUtil, UserService userService) {
        this.tokenGenerateUtil = tokenGenerateUtil;
        this.userService = userService;
    }

    @GetMapping("/check")
    public String check(HttpServletResponse response) {
        Cookie usernameCookie = new Cookie("username", "john_doe");
        usernameCookie.setHttpOnly(true);
        usernameCookie.setMaxAge(24 * 60 * 60); // 1 day
        response.addCookie(usernameCookie);

        Cookie themeCookie = new Cookie("theme", "dark");
        themeCookie.setPath("/");
        themeCookie.setMaxAge(7 * 24 * 60 * 60); // 1 week
        response.addCookie(themeCookie);
        return "cookies added successfully";
    }

    @PostMapping("/logout")
    public String clearAllCookies(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                Cookie deleteCookie = new Cookie(cookie.getName(), null);
                deleteCookie.setPath("/"); // Make sure this matches the path used to set it
                deleteCookie.setMaxAge(0); // 0 means delete now
                deleteCookie.setHttpOnly(cookie.isHttpOnly());
                deleteCookie.setSecure(cookie.getSecure());
                response.addCookie(deleteCookie);
            }
        }

        return "All cookies cleared";
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> generateToken(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        if (authRequest.getGmail() == null || authRequest.getPassword() == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Please provide gmail and password in correct format");
        }
        String token = tokenGenerateUtil.generateToken(authRequest);
        if (token == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid gmail or password");
        }
        Optional<Users> users = userService.authenticateUser(authRequest.getGmail());
        if (users.isPresent()) {
            userService.addCookies(response, token, users.get().getId());
            return ResponseEntity
                    .ok( "Authentication successful");
        }
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Authentication failed");
    }

    @GetMapping("/grants")
    public List<String> getAllRoles() {
        return Arrays.stream(Role.values())
                .map(Enum::name)
                .toList();
    }
}
