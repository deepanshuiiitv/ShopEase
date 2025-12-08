package com.shopease.backend.service;

import com.shopease.backend.model.ExternalProductModel;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class ExternalProductService {

    private final String productApi = "https://fakestoreapi.com/products";

    private final RestTemplate restTemplate;

    public ExternalProductService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<ExternalProductModel> getAllExternalProduct() {
        ResponseEntity<List<ExternalProductModel>> response =
                restTemplate
                        .exchange(productApi,
                                HttpMethod.GET, null,
                                new ParameterizedTypeReference<>() {
                                });
        return response.getBody();
    }
}
