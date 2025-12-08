package com.shopease.backend.filter;

import com.shopease.backend.service.CustomUserDetailsService;
import com.shopease.backend.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtAuthFilter(JWTUtil jwtUtil,CustomUserDetailsService customUserDetailsService){
        this.jwtUtil=jwtUtil;
        this.customUserDetailsService=customUserDetailsService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        System.out.println("Checking shouldNotFilter for path: " + path);
        return path.startsWith("/api/products/all")
                || path.startsWith("/api/authenticate")
                || path.startsWith("/api/externalproduct")
                || path.startsWith("/api/user/adduser")
                || path.startsWith("/actuator")
                || path.startsWith("/h2-console");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        String cookie = request.getHeader("Authorization");
        String token = null;
        String userId=null;
        String username=null;

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                }
                if ("id".equals(cookie.getName())) {
                    userId = cookie.getValue();
                }
            }
        }


        if(token!=null){
//            token=cookie.substring(7);
            username=jwtUtil.extractUsername(token);
        }
        if(username !=null && SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetails=customUserDetailsService.loadUserByUsername(username);
            if(jwtUtil.validateToken(username,userDetails,token)){
                UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request,response);
    }

}
