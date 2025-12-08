package com.shopease.backend.database.mysql.entity;

import com.shopease.backend.enumfile.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Entity
@Data
@Table(name="users")
@AllArgsConstructor
@NoArgsConstructor
public class Users implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String gmail;
    private String password;
    private String addressId;
    private Role role;

    @Override
    public String getUsername() {
        return this.gmail;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_"+role.name()));
        Set<SimpleGrantedAuthority> permissionAuthorities = role.getPermissions().stream().
                map(permissions -> new SimpleGrantedAuthority(permissions.name()))
                .collect(Collectors.toSet());
        authorities.addAll(permissionAuthorities);
        return authorities;
    }
}
