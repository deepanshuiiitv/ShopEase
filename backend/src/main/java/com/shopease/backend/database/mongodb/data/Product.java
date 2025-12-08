package com.shopease.backend.database.mongodb.data;



import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String title;
    double price;
    String description;
    String category;
    String image;
    Rating rating;

    @Getter
    @Setter
    static class Rating{
        public double rate;
        public int count;
    }

}
