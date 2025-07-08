package at.htl.leonding.features.security;

import com.auth0.jwt.algorithms.Algorithm;
import jakarta.annotation.security.PermitAll;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ResourceInfo;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import jakarta.ws.rs.ext.Provider;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.io.IOException;
import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.security.GeneralSecurityException;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class JwtRequestFilter implements ContainerRequestFilter {

    private static final String REALM_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA807Sg8RdQUQxLkbWNgf9UPtCIpkFexHntpg/9xEykb1rKp8pKBC0fOgqrXpPgoT4bQVznd7gx28VLqZtWm1kDyI7BPjLox8PBIyEKIHcUgJ6r8Gx7z9FGmdxT1HxcEpetjqgplIxDm/8qMTDdcP7XMaVCuev6gXq0HQrnQvl3mOf7ZkUF8vByDXCHm+knvhnK8KASSFD390bMys6jf1Y+AkCvZoBTza4Ad+zhBm23HoWSDfkdT6DrPDnk0L4OVNtdhl6PiQ5BWh1dVmDEEmRIWAZtOAzImdfj4Kqri6aMjyoKfLQnwtAbwbzc2sa6h82shfKCYEBsFtpRu+ZBZGc3wIDAQAB"; // Paste Keycloak realm public key (modulus format, not PEM)

    @Context
    private ResourceInfo resourceInfo; // Inject ResourceInfo to access method/class annotations

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        if (resourceInfo.getResourceMethod().isAnnotationPresent(PermitAll.class) ||
                resourceInfo.getResourceClass().isAnnotationPresent(PermitAll.class)) {
            // If @PermitAll is present, skip authentication
            return;
        }

        String authHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            abortWithUnauthorized(requestContext);
            return;
        }

        String token = authHeader.substring("Bearer ".length());

        try {
            Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) getPublicKey(REALM_PUBLIC_KEY), null);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(token);

            // Optionally: extract claims
            String username = jwt.getClaim("preferred_username").asString();
            List<String> roles = List.of();
            Map<String, Object> realmAccess = jwt.getClaim("realm_access").asMap();
            if (realmAccess != null && realmAccess.get("roles") instanceof List<?> rawRoles) {
                roles = rawRoles.stream().map(String::valueOf).toList();
            }

            // Optional: Set security context
            requestContext.setSecurityContext(new CustomSecurityContext(username, roles));

        } catch (JWTVerificationException | GeneralSecurityException e) {
            e.printStackTrace();
            abortWithUnauthorized(requestContext);
        }
    }

    private void abortWithUnauthorized(ContainerRequestContext context) {
        context.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token").build());
    }

    private RSAPublicKey getPublicKey(String base64PublicKey) throws GeneralSecurityException {
        byte[] keyBytes = Base64.getDecoder().decode(base64PublicKey);
        X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
        KeyFactory factory = KeyFactory.getInstance("RSA");
        return (RSAPublicKey) factory.generatePublic(spec);
    }

}