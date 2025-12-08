package com.shopease.backend.controller;

import com.shopease.backend.database.mongodb.data.Order;
import com.shopease.backend.database.mongodb.service.OrderService;
import com.shopease.backend.dto.IdDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired  // Optional if using constructor injection
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderByOrderId(@PathVariable String id) {
        Optional<Order> order = orderService.getOrderByOrderId(id);
        return order.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/userid/{id}")
    public ResponseEntity<Order> getOrderByUserId(@PathVariable long id) {
        Optional<Order> order = orderService.getOrderByUserId(id);
        return order.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    /// ////////////////////////////
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody IdDto userId) {
        Order savedOrder = orderService.saveOrder(Long.parseLong(userId.getId()));
        return ResponseEntity.ok(savedOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
