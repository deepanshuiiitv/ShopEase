package com.shopease.backend.controller;

import com.shopease.backend.database.mongodb.data.Product;
import com.shopease.backend.database.mongodb.service.ProductService;
import com.shopease.backend.dto.IdDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    // Constructor injection
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @GetMapping("/check")
    public String check() {
        return "hello  -- /api/products -- api working";
    }

    // GET all products
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // GET product by ID
    @PostMapping("/byid")
    public ResponseEntity<Product> getProductById(@RequestBody IdDto id) {
        long id1 = Long.parseLong(id.getId());
        return productService.getProductById(id1)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    // POST new product
    @PostMapping("/admin/addproduct")
    @PreAuthorize("hasAuthority('PRODUCT_WRITE')")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    // DELETE product
    @DeleteMapping("/admin/deleteproduct/{id}")
    @PreAuthorize("hasAuthority('PRODUCT_DELETE')")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

}
