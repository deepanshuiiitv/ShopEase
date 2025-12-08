package com.shopease.backend.config;

import com.shopease.backend.enumfile.Permissions;
import com.shopease.backend.filter.JwtAuthFilter;
import com.shopease.backend.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity //tell spring that now i twig default security method
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::disable)
                ).sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers("/api/authenticate").permitAll()
//                                .requestMatchers("/api/**").permitAll()
                                .requestMatchers("/api/externalproduct/**").permitAll()
                                .requestMatchers("/api/products/all/**").permitAll()

                                .requestMatchers("/h2-console/**").permitAll()
                                .requestMatchers("/actuator/**").permitAll()
                                .requestMatchers("/api/user/**").permitAll()
//                                .requestMatchers("/api/**").permitAll()
//                                .requestMatchers(HttpMethod.GET, "/api/products/**").hasAuthority(Permissions.PRODUCT_READ.name())
//                                .requestMatchers(HttpMethod.POST, "/api/products/**").hasAuthority(Permissions.PRODUCT_WRITE.name())
//                                .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasAuthority(Permissions.PRODUCT_DELETE.name())
                                .anyRequest().authenticated());
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }



    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(daoAuthenticationProvider);
    }


}
