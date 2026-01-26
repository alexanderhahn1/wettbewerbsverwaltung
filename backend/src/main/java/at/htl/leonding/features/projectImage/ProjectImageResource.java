package at.htl.leonding.features.projectImage;

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

@Path("/project-images")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProjectImageResource {
    @Inject
    ProjectImageRepository projectImageRepository;

    @GET
    @Path("/{id}")
    @Produces("*/*")
    @PermitAll
    @Transactional
    public Response getImageById(@PathParam("id") long id) {
        ProjectImage image = projectImageRepository.findById(id);

        return Response.ok(image.data)
                .type(image.contentType)
                .header("Content-Disposition", "inline; filename=\"" + image.pictureName + "\"")
                .build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteImageById(@PathParam("id") long id, @Context SecurityContext ctx) {

        projectImageRepository.deleteById(id);

        return Response.noContent().build();
    }
}
