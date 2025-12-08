package com.shopease.backend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExternalProductModel{
    public int id;
    public String title;
    public double price;
    public String description;
    public String category;
    public String image;
    public Rating rating;

    @Getter
    @Setter
    public class Rating{
        public double rate;
        public int count;
    }
}
