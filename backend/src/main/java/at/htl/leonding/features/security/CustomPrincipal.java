package at.htl.leonding.features.security;

import javax.security.auth.Subject;
import java.security.Principal;

public class CustomPrincipal implements Principal {

    private final String name;
    private final String organisationalUnits;
    private final boolean isAdmin;

    public CustomPrincipal(String name, String organisationalUnits, boolean isAdmin) {
        this.name = name;
        this.organisationalUnits = organisationalUnits;
        this.isAdmin = isAdmin;
    }

    @Override
    public String getName() {
        return name;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public String getOrganisationalUnits() {
        return organisationalUnits;
    }
}
