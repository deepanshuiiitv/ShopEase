package com.shopease.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping("/{path:^(?!api|static).*}")
    public String forward() {
        return "forward:/index.html";
    }
}
