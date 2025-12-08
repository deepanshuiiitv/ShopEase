package com.shopease.backend.controller;


import com.shopease.backend.model.ExternalProductModel;
import com.shopease.backend.service.ExternalProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/externalproduct")
public class ExternalProductController {
    private final ExternalProductService externalProductService;

    public ExternalProductController(ExternalProductService externalProductService) {
        this.externalProductService = externalProductService;
    }

    @GetMapping("/check")
    public String check() {
        return "hello -- /api/externalProduct -- api working";
    }

    @GetMapping("/all")
    public ResponseEntity<List<ExternalProductModel>> getAllProducts() {
        return ResponseEntity.ok(externalProductService.getAllExternalProduct());
    }

}
