package at.htl.leonding.features.security;

import jakarta.ws.rs.core.SecurityContext;

import java.security.Principal;
import java.util.List;

public class CustomSecurityContext implements SecurityContext {

    private final String username;
    private final List<String> roles;

    public CustomSecurityContext(String username, List<String> roles) {
        this.username = username;
        this.roles = roles;
    }

    @Override
    public Principal getUserPrincipal() {
        return () -> username;
    }

    @Override
    public boolean isUserInRole(String role) {
        return roles.contains(role);
    }

    @Override
    public boolean isSecure() {
        return false;
    }

    @Override
    public String getAuthenticationScheme() {
        return "Bearer";
    }
}
