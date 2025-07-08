package at.htl.leonding.features.security;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.SecurityContext;

@Path("/security")
public class SecurityTestResource {

    @GET
    public String hello(@Context SecurityContext ctx) {
        return "Hello, " + ctx.getUserPrincipal().getName();
    }
}
