package com.shopease.backend.database.mongodb.data;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document(collection = "order")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Order {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    String orderId;
    long userId;
    String addressId;
    List<Item> items;

    @Getter
    @Setter
    public static class Item {
        private long itemId;
        private int quantity;
    }
}

