package com.shopease.backend.controller;

import com.shopease.backend.database.mongodb.data.Order;
import com.shopease.backend.database.mongodb.data.Product;
import com.shopease.backend.database.mongodb.service.OrderService;
import com.shopease.backend.database.mongodb.service.ProductService;
import com.shopease.backend.database.mysql.service.UserService;
import com.shopease.backend.dto.UserDto;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admindashboard")
public class AdminDashboardController {

    private final ProductService productService;
    private final UserService userService;
    private final OrderService orderService;

    public AdminDashboardController(
            ProductService productService,
            UserService userService,
            OrderService orderService
    ) {
        this.productService = productService;
        this.userService = userService;
        this.orderService = orderService;
    }

    // ================= PRODUCTS =================

    // Used in: Admin → Products page
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }


    // ================= USERS =================

    // Used in: Admin → Users page
    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // ================= ORDERS / SALES =================

    // Used in: Admin → Sales page
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

}
