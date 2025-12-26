package com.shopease.backend.controller;

import com.shopease.backend.database.mysql.entity.Users;
import com.shopease.backend.database.mysql.service.UserService;
import com.shopease.backend.dto.UserDto;
import com.shopease.backend.dto.UserIdDto;
import com.shopease.backend.dto.UserRecieved;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/check")
    public String check() {
        return "hello /api/user checked";
    }

    @PostMapping("/getbyid")
    public ResponseEntity<UserDto> getUserById(@RequestBody UserIdDto id) {
        if (id == null) {
            return ResponseEntity.badRequest().build(); // No body
        }

        Optional<UserDto> userDtoOptional = userService.getUserById(id.getUserId());

        return userDtoOptional
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build()); // No body
    }


    @PostMapping("/adduser")
    public ResponseEntity<String> addUser(@RequestBody UserRecieved userRecieved, HttpServletResponse response) {
        if (userRecieved.getGmail() == null || userRecieved.getPassword() == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Please provide gmail and password");
        }

        if (userService.checkUserbyGmail(userRecieved.getGmail()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)  // 409 Conflict
                    .body("User already exists");
        }

        userService.adduser(userRecieved, response);

        return ResponseEntity
                .status(HttpStatus.CREATED)  // 201 Created
                .body("User added successfully");
    }
    @GetMapping("/allusers")
    public List<UserDto> allUsers() {
        return userService.getAllUsers();
    }

}
