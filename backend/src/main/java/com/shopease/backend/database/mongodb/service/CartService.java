package com.shopease.backend.database.mongodb.service;

import com.shopease.backend.database.mongodb.data.Cart;
import com.shopease.backend.database.mongodb.repository.CartRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Optional<List<Cart>> getCartByUserId(long userId) {
        return cartRepository.findByUserId(userId);
    }
    public Optional<Cart> getCartByCartId(String cartId) {
        return cartRepository.findByCartId(cartId);
    }

    public Cart saveCart(Cart cart) {
        cart.setCartId(UUID.randomUUID().toString());
        return cartRepository.save(cart);
    }

    public void deleteCart(long id) {
        cartRepository.deleteById(id);
    }
}
