package com.shopease.backend.controller;

import com.shopease.backend.database.mongodb.data.Cart;
import com.shopease.backend.database.mongodb.service.CartService;
import com.shopease.backend.dto.IdDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        return ResponseEntity.ok(carts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable String cartId) {
        Optional<Cart> cart = cartService.getCartByCartId(cartId);
        return cart.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping("/userid")
    public ResponseEntity<List<Cart>> getCartByUserId(@RequestBody IdDto id) {
        long id1 = Long.parseLong(id.getId());
        Optional<List<Cart>> cart = cartService.getCartByUserId(id1);
        return cart.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody Cart cart) {
        Cart savedCart = cartService.saveCart(cart);
        return ResponseEntity.ok(savedCart);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable long id) {
        cartService.deleteCart(id);
        return ResponseEntity.noContent().build();
    }
}
