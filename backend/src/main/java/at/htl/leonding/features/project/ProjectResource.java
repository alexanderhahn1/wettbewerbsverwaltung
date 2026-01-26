package at.htl.leonding.features.project;

import at.htl.leonding.features.change.Change;
import at.htl.leonding.features.competition.Competition;
import at.htl.leonding.features.competitionImage.CompetitionImage;
import at.htl.leonding.features.competitionImage.ImageUploadForm;
import at.htl.leonding.features.projectImage.ProjectImage;
import at.htl.leonding.features.projectImage.ProjectImageDTO;
import at.htl.leonding.features.projectImage.ProjectImageMapper;
import at.htl.leonding.features.projectImage.ProjectImageRepository;
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
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import java.time.LocalDate;
import java.util.List;

@Path("/projects")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProjectResource {
    @Inject
    ProjectRepository projectRepository;
    @Inject
    ProjectMapper projectMapper;
    @Inject
    ProjectImageRepository projectImageRepository;
    @Inject
    ProjectImageMapper projectImageMapper;

    @GET
    public Response getAllProjects() {
        return Response.ok(projectRepository.findAll()
                .stream()
                .map(projectMapper::toResource)).build();
    }

    public Response createProject(ProjectDTO dto, @Context SecurityContext ctx) {

        //CustomPrincipal p = (CustomPrincipal) ctx.getUserPrincipal();
        //if (!p.isAdmin()) {
        //    return Response.status(Response.Status.UNAUTHORIZED).build();
        //}

        Project project = projectRepository.create(dto, ctx.getUserPrincipal().getName());
        return Response.status(Response.Status.CREATED).entity(projectMapper.toResource(project)).build();
    }

    @DELETE
    @Path("/{projectId}")
    @Transactional
    public Response deleteProject(@PathParam("projectId") Long projectId, @Context SecurityContext ctx) {

        projectRepository.deleteById(projectId);
        return Response.noContent().build();
    }

    @PUT
    @Path("/{projectId}")
    public Response updateProject(@PathParam("projectId") long projectId, ProjectDTO dto, @Context SecurityContext ctx) {

        Project project = projectRepository.update(dto, projectId, ctx.getUserPrincipal().getName());
        return Response.ok(projectMapper.toResource(project)).build();
    }

    @GET
    @Path("/{projectId}/images")
    public Response getProjectImages(@PathParam("projectId") Long projectId) {
        List<ProjectImage> images = projectRepository.getAllImages(projectId);

        return Response.ok(images.stream().map(projectImageMapper::toResource)).build();
    }

    @POST
    @Path("/{projectId}/images")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Transactional
    public Response uploadImage(@Context SecurityContext securityContext, @MultipartForm ImageUploadForm form, @PathParam("projectId") long projectId) {

        Project project = projectRepository.findById(projectId);

        if (project == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        ProjectImage image = new ProjectImage();
        image.setProject(project);
        image.setData(form.file);
        image.setPictureName(form.fileName);
        image.setContentType(form.fileContentType);
        projectRepository.getEntityManager().persist(image);

        return Response.status(Response.Status.CREATED).build();
    }

    @POST
    @Path("/{projectId}/images/multiple")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Transactional
    public Response uploadMultipleImages(@Context SecurityContext securityContext, @MultipartForm List<ImageUploadForm> forms, @PathParam("projectId") long competitionId) {

        Project project = projectRepository.findById(competitionId);

        if (project == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        for (ImageUploadForm form : forms) {
            ProjectImage image = new ProjectImage();
            image.setProject(project);
            image.setData(form.file);
            image.setPictureName(form.fileName);
            image.setContentType(form.fileContentType);
            projectRepository.getEntityManager().persist(image);

        }

        return Response.status(Response.Status.CREATED).build();
    }
}
