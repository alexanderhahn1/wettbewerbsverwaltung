package at.htl.leonding.features.security;

import jakarta.ws.rs.core.SecurityContext;

import java.security.Principal;
import java.util.List;

public class CustomSecurityContext implements SecurityContext {

    private final Principal principal;
    private final List<String> roles;
    private final String fullName;

    public CustomSecurityContext(Principal principal, List<String> roles, String fullName) {
        this.principal = principal;
        this.roles = roles;
        this.fullName = fullName;
    }

    @Override
    public Principal getUserPrincipal() {
        return principal;
    }

    public String getFullName() {
        return fullName;
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
