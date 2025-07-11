package at.htl.leonding.features.change;

import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

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
    @PermitAll
    public Response getAllChanges() {
        return Response.ok(changeRepository.findAll().stream().map(changeMapper::toResource)).build();
    }

    @GET
    @Path("/competition/{competitionId}")
    public Response getChangesByCompetitionId(@PathParam("competitionId") long competitionId) {
        return Response.ok(changeRepository.getByCompetition(competitionId).stream().map(changeMapper::toResource)).build();
    }
}
