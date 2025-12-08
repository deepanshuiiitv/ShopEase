package com.shopease.backend.database.mongodb.service;

import com.shopease.backend.database.mongodb.data.Cart;
import com.shopease.backend.database.mongodb.data.Order;
import com.shopease.backend.database.mongodb.repository.CartRepository;
import com.shopease.backend.database.mongodb.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    public OrderService(OrderRepository orderRepository,CartRepository cartRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderByOrderId(String id) {
        return orderRepository.findByOrderId(id);
    }

    public Optional<Order> getOrderByUserId(long userId) {
        return orderRepository.findById(userId);
    }

    public Order saveOrder(long userId) {
        // Fetch all carts for the user
        List<Cart> userCarts = cartRepository.findByUserId(userId)
                .orElse(Collections.emptyList());

        // Convert carts to order items
        List<Order.Item> orderItems = userCarts.stream().map(cart -> {
            Order.Item item = new Order.Item();
            item.setItemId(cart.getItemId());
            item.setQuantity(cart.getQuantity());
            return item;
        }).collect(Collectors.toList());

        // Build and save the order
        Order order = new Order();
        order.setOrderId(String.valueOf(UUID.randomUUID()));
        order.setUserId(userId);
        order.setItems(orderItems);
        orderRepository.save(order);

        // Delete all carts for this user
        cartRepository.deleteByUserId(userId);

        return order;
    }

    public void deleteOrder(String orderId) {
        orderRepository.deleteByOrderId(orderId);
    }
}
