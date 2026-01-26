package at.htl.leonding.features.change;

import at.htl.leonding.features.security.CustomPrincipal;
import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

import java.util.List;

@Path("/changes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ChangeResource {

    @Inject
    ChangeRepository changeRepository;
    @Inject
    ChangeMapper changeMapper;

    @GET
    public Response getAllChanges(@Context SecurityContext ctx) {

        //CustomPrincipal p = (CustomPrincipal) ctx.getUserPrincipal();
        //if (!p.isAdmin()) {
        //    return Response.status(Response.Status.UNAUTHORIZED).build();
        //}

        return Response.ok(changeRepository.findAll().stream().map(changeMapper::toResource)).build();
    }

    @GET
    @Path("/competition/{competitionId}")
    public Response getChangesByCompetitionId(@PathParam("competitionId") long competitionId, @Context SecurityContext ctx) {

        return Response.ok(changeRepository.getByCompetition(competitionId).stream().map(changeMapper::toResource)).build();
    }
}
