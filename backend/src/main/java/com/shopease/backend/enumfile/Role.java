package com.shopease.backend.enumfile;

import java.util.Set;

public enum Role {
    ADMIN(Set.of(Permissions.PRODUCT_READ,Permissions.PRODUCT_WRITE,Permissions.PRODUCT_DELETE)),
    USER(Set.of(Permissions.PRODUCT_READ));

    private final Set<Permissions> permissions;

    Role(Set<Permissions> permissions) {
        this.permissions = permissions;
    }

    public Set<Permissions> getPermissions() {
        return permissions;
    }
}
