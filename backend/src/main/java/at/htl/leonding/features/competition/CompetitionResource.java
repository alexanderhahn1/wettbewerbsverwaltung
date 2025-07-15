package at.htl.leonding.features.competition;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;


@Path("/competitions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CompetitionResource {

    @Inject
    CompetitionRepository competitionRepository;
    @Inject
    CompetitionMapper competitionMapper;

    @GET
    public Response getAllCompetitions() {
        var competitions = competitionRepository.getAll();
        return Response.ok(competitions
                .stream()
                .map(competitionMapper::toResource)).build();
    }

    @GET
    @Path("/{competitionId}")
    public Response getCompetitionById(@PathParam("competitionId") long competitionId) {
        return Response.ok(competitionMapper.toResource(competitionRepository.findById(competitionId))).build();
    }

    @GET
    @Path("/active")
    public Response getActiveCompetitions() {
        var competitions = competitionRepository.getActive();
        return Response.ok(competitions
                .stream()
                .map(competitionMapper::toResource)).build();
    }

    @GET
    @Path("/random")
    public Response getRandomCompetition() {
        return Response.ok(competitionMapper.toResource(competitionRepository.getRandom())).build();
    }

    @GET
    @Path("/status/{schoolYear}")
    public Response getStatusBySchoolYear(@PathParam("schoolYear") String schoolYear) {
        var competitions = competitionRepository.getBySchoolYear(schoolYear);
        return Response.ok(competitions
                .stream()
                .map(competitionMapper::toStatusResource)).build();
    }

    @POST
    @RolesAllowed({"admin"})
    public Response createCompetition(CompetitionCreateDTO dto, @Context SecurityContext ctx) {
        Competition competition = competitionMapper.toCompetition(dto,ctx.getUserPrincipal().getName());
        return Response.status(Response.Status.CREATED).entity(competitionMapper.toResource(competitionRepository.save(competition))).build();
    }

    @PUT
    @Path("/{competitionId}")
    @RolesAllowed({"admin"})
    public Response updateCompetition(CompetitionCreateDTO dto, @Context SecurityContext ctx, @PathParam("competitionId") Long competitionId) {
        Competition competition = competitionRepository.update(dto, competitionId, ctx.getUserPrincipal().getName());

        return Response.ok().entity(competitionMapper.toResource(competition)).build();
    }

}
