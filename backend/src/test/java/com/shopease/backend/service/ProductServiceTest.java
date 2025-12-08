package com.shopease.backend.service;


import com.shopease.backend.database.mongodb.data.Product;
import com.shopease.backend.database.mongodb.repository.ProductRepository;
import com.shopease.backend.database.mongodb.service.ProductService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    ProductRepository productRepository;

    @InjectMocks
    ProductService productService;

    @Test
    void testSaveProduct() {
        Product products = new Product();
        products.setId(1L);
        products.setTitle("rohan");
        products.setDescription("nothing");
        products.setPrice(10L);


        Mockito.when(productRepository.save(products)).thenReturn(products);
        Product addedProducts= productService.saveProduct(products);
        productService.saveProduct(products);

        Assertions.assertNotNull(addedProducts);
        Assertions.assertEquals(products.getId(),addedProducts.getId());
    }
}
