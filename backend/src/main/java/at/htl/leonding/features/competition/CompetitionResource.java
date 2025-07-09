package at.htl.leonding.features.competition;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;


@Path("/competitions")
public class CompetitionResource {

    @Inject
    CompetitionRepository competitionRepository;
    @Inject
    CompetitionMapper competitionMapper;

    @GET
    @PermitAll
    public Response getAllCompetitions() {
        var competitions = competitionRepository.getAll();
        return Response.ok(competitions
                .stream()
                .map(competitionMapper::toResource)).build();
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

}
