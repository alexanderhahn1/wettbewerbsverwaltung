package at.htl.leonding.features.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.logging.Log;
import jakarta.annotation.Priority;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ResourceInfo;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import org.eclipse.microprofile.config.ConfigProvider;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.security.GeneralSecurityException;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.*;
import java.util.stream.Collectors;

@Provider
@Priority(Priorities.AUTHENTICATION)
public class JwtRequestFilter implements ContainerRequestFilter {

    //String REALM_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA807Sg8RdQUQxLkbWNgf9UPtCIpkFexHntpg/9xEykb1rKp8pKBC0fOgqrXpPgoT4bQVznd7gx28VLqZtWm1kDyI7BPjLox8PBIyEKIHcUgJ6r8Gx7z9FGmdxT1HxcEpetjqgplIxDm/8qMTDdcP7XMaVCuev6gXq0HQrnQvl3mOf7ZkUF8vByDXCHm+knvhnK8KASSFD390bMys6jf1Y+AkCvZoBTza4Ad+zhBm23HoWSDfkdT6DrPDnk0L4OVNtdhl6PiQ5BWh1dVmDEEmRIWAZtOAzImdfj4Kqri6aMjyoKfLQnwtAbwbzc2sa6h82shfKCYEBsFtpRu+ZBZGc3wIDAQAB";

    @Context
    private ResourceInfo resourceInfo;

    DecodedJWT jwt;

    String realmPublicKey = "";

    public static String getRealmPublicKey() throws Exception {
        /*HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI("https://auth.htl-leonding.ac.at/realms/wettbewerbsdatenbank"))
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response.body());

        String publicKey = root.get("public_key").asText();

        return publicKey;*/
         return "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvmMuCA54PcdWZf5QVCt9PXklklTBogQJ/xp3U3S1Za46I8wSESNBlA/o+rs2HkeaAoj5ZYLaUG3+fDhmHifvOhzEIHPqiAGZHqIrQj+GsTuAjXmGJaY0/zE2VJGzlpOgVjyEgSjYrl4k6zfXuNvcS95NMN7u73cr8B8SMgt0kMZyUYRAW02Mfg5ZB14MY83xXUXvogmyUfycSPWZCDVJ/WbOBSNk+oSfUKYD7lqt2vpI2Ex1C72Ei79erEKQ2/cHYQPlqyDV9AakeUyGbOcQlVP6byw05UjxytLa96m+CGlZwBv3DTqGNTqJqGjPCSS9xcAqRgXcB9DZo6CuSDSnVwIDAQAB";
    }

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        System.out.println("Filter");

        // Skip authentication for @PermitAll
        if (isPermitAll()) {
            return;
        }

        String authHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            abortWithUnauthorized(requestContext);
            return;
        }

        String token = authHeader.substring("Bearer ".length());
        jwt = JWT.decode(token);

        requestContext.setProperty("organisationalUnit", getOrganizationalUnits());

        try {
            realmPublicKey = getRealmPublicKey();
        } catch (Exception e) {
            Log.info("Failed to Load: ", e);
            throw new RuntimeException(e);
        }

        try {
            Algorithm algorithm = Algorithm.RSA256(getPublicKey(realmPublicKey), null);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(token);

            String username = jwt.getClaim("preferred_username").asString();
            String fullName = jwt.getClaim("given_name").asString();

            List<String> userRoles = extractRoles(jwt);

            //requestContext.setProperty("organisationalUnit", getOrganizationalUnits());

            // Check @RolesAllowed
            Set<String> requiredRoles = getRolesAllowed();
            if (!requiredRoles.isEmpty() && Collections.disjoint(userRoles, requiredRoles)) {
                abortWithUnauthorized(requestContext);
                return;
            }

            CustomPrincipal principal = new CustomPrincipal(username, getOrganizationalUnits(), isAdmin());

            requestContext.setSecurityContext(new CustomSecurityContext(principal, userRoles, fullName));
            requestContext.setProperty("first_name", fullName);

        } catch (JWTVerificationException | GeneralSecurityException e) {
            e.printStackTrace();
            abortWithUnauthorized(requestContext);
        }
    }

    private boolean isPermitAll() {
        return resourceInfo.getResourceMethod().isAnnotationPresent(PermitAll.class)
                || resourceInfo.getResourceClass().isAnnotationPresent(PermitAll.class);
    }

    private Set<String> getRolesAllowed() {
        RolesAllowed rolesAnnotation = resourceInfo.getResourceMethod().getAnnotation(RolesAllowed.class);
        if (rolesAnnotation == null) {
            rolesAnnotation = resourceInfo.getResourceClass().getAnnotation(RolesAllowed.class);
        }
        return rolesAnnotation != null
                ? new HashSet<>(Arrays.asList(rolesAnnotation.value()))
                : Collections.emptySet();
    }

    private String getOrganizationalUnits() {
        String dn = jwt.getClaim("distinguishedName").asString();

        if (dn == null) {
            return null;
        }

        return Arrays.stream(dn.split(","))
                .map(String::trim)
                .filter(part -> part.startsWith("OU="))
                .map(part -> part.substring(3))
                .filter(ou -> ou.equalsIgnoreCase("Students") || ou.equalsIgnoreCase("Teachers"))
                .findFirst()
                .orElse(null);
    }

    private boolean isAdmin() {
        String dn = jwt.getClaim("distinguishedName").asString();

        if (dn == null) {
            return false;
        }

        return Arrays.stream(dn.split(","))
                .map(String::trim)
                .anyMatch(part -> part.equalsIgnoreCase("OU=Teachers"));
    }


    private List<String> extractRoles(DecodedJWT jwt) {
        Map<String, Object> realmAccess = jwt.getClaim("realm_access").asMap();
        if (realmAccess != null && realmAccess.get("roles") instanceof List<?> rawRoles) {
            return rawRoles.stream().map(String::valueOf).toList();
        }
        return List.of();
    }

    private void abortWithUnauthorized(ContainerRequestContext context) {
        context.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity("Access Denied").build());
    }

    private RSAPublicKey getPublicKey(String base64PublicKey) throws GeneralSecurityException {
        byte[] keyBytes = Base64.getDecoder().decode(base64PublicKey);
        X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
        KeyFactory factory = KeyFactory.getInstance("RSA");
        return (RSAPublicKey) factory.generatePublic(spec);
    }
}
