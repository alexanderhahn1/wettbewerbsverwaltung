package at.htl.leonding.features.security;

import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.SecurityContext;

@Path("/security")
public class SecurityTestResource {

    @GET
    @Authenticated
    public String hello(@Context SecurityContext ctx) {
        return "Hello, " + ctx.getUserPrincipal().getName() + "!";
    }
}
