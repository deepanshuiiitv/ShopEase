package com.shopease.backend.database.mongodb.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "cart")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
    private String cartId;
    private long userId;
    private String addressId;
    private int quantity=1;
    private long itemId;
}
