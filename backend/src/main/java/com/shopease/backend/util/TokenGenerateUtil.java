package com.shopease.backend.util;

import com.shopease.backend.entity.AuthRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

@Component
public class TokenGenerateUtil {
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    public TokenGenerateUtil(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }
    public String generateToken(AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getGmail(), authRequest.getPassword())
            );
            return jwtUtil.generateToken(authRequest.getGmail());
        } catch (Exception e) {
            return null;
        }
    }
}
