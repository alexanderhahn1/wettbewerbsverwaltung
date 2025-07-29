package at.htl.leonding.features.competitionImage;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

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
    public Response deleteImageById(@PathParam("id") long id) {
        competitionImageRepository.deleteById(id);

        return Response.noContent().build();
    }

}
