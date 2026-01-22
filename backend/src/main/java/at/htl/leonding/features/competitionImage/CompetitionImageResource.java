package at.htl.leonding.features.competitionImage;

import at.htl.leonding.features.security.CustomPrincipal;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

@Path("/images")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CompetitionImageResource {
    @Inject
    CompetitionImageRepository competitionImageRepository;

    @GET
    @Path("/{id}")
    @Produces("*/*")
    @PermitAll
    @Transactional
    public Response getImageById(@PathParam("id") long id) {
        CompetitionImage image = competitionImageRepository.findById(id);

        return Response.ok(image.data)
                .type(image.contentType)
                .header("Content-Disposition", "inline; filename=\"" + image.pictureName + "\"")
                .build();
    }

    @DELETE
    @Path("/{id}")
    @RolesAllowed({"admin"})
    @Transactional
    public Response deleteImageById(@PathParam("id") long id, @Context SecurityContext ctx) {

        CustomPrincipal p = (CustomPrincipal) ctx.getUserPrincipal();
        if (!p.isAdmin()) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        competitionImageRepository.deleteById(id);

        return Response.noContent().build();
    }

}
