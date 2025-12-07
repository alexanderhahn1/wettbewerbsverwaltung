package at.htl.leonding.features.competition;

import at.htl.leonding.features.change.Change;
import at.htl.leonding.features.change.ChangeRepository;
import at.htl.leonding.features.competitionImage.CompetitionImage;
import at.htl.leonding.features.competitionImage.CompetitionImageMapper;
import at.htl.leonding.features.competitionImage.ImageUploadForm;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import java.time.LocalDate;
import java.util.List;


@Path("/competitions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CompetitionResource {

    @Inject
    CompetitionRepository competitionRepository;
    @Inject
    CompetitionMapper competitionMapper;
    @Inject
    CompetitionImageMapper competitionImageMapper;
    @Inject
    ChangeRepository changeRepository;

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

    @GET
    @Path("/{competitionId}/images")
    public Response getCompetitionImages(@PathParam("competitionId") long competitionId) {
        List<CompetitionImage> images = competitionRepository.getAllImages(competitionId);

        return Response.ok(images.stream().map(competitionImageMapper::toResource)).build();
    }

    @POST
    @Path("/{competitionId}/images")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @RolesAllowed({"admin"})
    @Transactional
    public Response uploadImage(@Context SecurityContext securityContext, @MultipartForm ImageUploadForm form, @PathParam("competitionId") long competitionId) {
        Competition competition = competitionRepository.findById(competitionId);

        if (competition == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        CompetitionImage image = new CompetitionImage();
        image.setCompetition(competition);
        image.setData(form.file);
        image.setPictureName(form.fileName);
        image.setContentType(form.fileContentType);
        competitionRepository.getEntityManager().persist(image);

        changeRepository.create(new Change(competition, "image added", "null", image.pictureName,
                LocalDate.now(), securityContext.getUserPrincipal().getName()));

        return Response.status(Response.Status.CREATED).build();
    }

    @POST
    @Path("/{competitionId}/images/multiple")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @RolesAllowed({"admin"})
    @Transactional
    public Response uploadMultipleImages(@Context SecurityContext securityContext, @MultipartForm List<ImageUploadForm> forms, @PathParam("competitionId") long competitionId) {
        Competition competition = competitionRepository.findById(competitionId);

        if (competition == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        for (ImageUploadForm form : forms) {
            CompetitionImage image = new CompetitionImage();
            image.setCompetition(competition);
            image.setData(form.file);
            image.setPictureName(form.fileName);
            image.setContentType(form.fileContentType);
            competitionRepository.getEntityManager().persist(image);

            changeRepository.create(new Change(competition, "image added", "null", image.pictureName,
                    LocalDate.now(), securityContext.getUserPrincipal().getName()));
        }

        return Response.status(Response.Status.CREATED).build();
    }

    @POST
    @RolesAllowed({"admin"})
    public Response createCompetition(CompetitionCreateDTO dto, @Context SecurityContext ctx) {
        Competition competition = competitionMapper.toCompetition(dto,ctx.getUserPrincipal().getName());

        return Response.status(Response.Status.CREATED).entity(competitionMapper.toResource(competitionRepository.save(competition))).build();
    }

    @DELETE
    @Path("/{competitionId}")
    @RolesAllowed({"admin"})
    public Response deleteCompetition(@PathParam("competitionId") Long competitionId) {
        competitionRepository.deleteCompetition(competitionId);
        return Response.noContent().build();
    }

    @PUT
    @Path("/{competitionId}")
    @RolesAllowed({"admin"})
    public Response updateCompetition(CompetitionCreateDTO dto, @Context SecurityContext ctx, @PathParam("competitionId") Long competitionId) {
        Competition competition = competitionRepository.update(dto, competitionId, ctx.getUserPrincipal().getName());

        return Response.ok().entity(competitionMapper.toResource(competition)).build();
    }

}
