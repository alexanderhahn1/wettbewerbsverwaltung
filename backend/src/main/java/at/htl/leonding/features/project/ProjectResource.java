package at.htl.leonding.features.project;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

import java.util.List;

@Path("/projects")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProjectResource {
    @Inject
    ProjectRepository projectRepository;
    @Inject
    ProjectMapper projectMapper;

    @GET
    public Response getAllProjects() {
        return Response.ok(projectRepository.findAll()
                .stream()
                .map(projectMapper::toResource)).build();
    }

    @POST
    @RolesAllowed({"admin"})
    public Response createProject(ProjectDTO dto, @Context SecurityContext ctx) {
        Project project = projectRepository.create(dto, ctx.getUserPrincipal().getName());
        return Response.status(Response.Status.CREATED).entity(projectMapper.toResource(project)).build();
    }

    @DELETE
    @Path("/{projectId}")
    @RolesAllowed({"admin"})
    @Transactional
    public Response deleteProject(@PathParam("projectId") Long projectId) {
        projectRepository.deleteById(projectId);
        return Response.noContent().build();
    }

    @PUT
    @Path("/{projectId}")
    @RolesAllowed({"admin"})
    public Response updateProject(@PathParam("projectId") long projectId, ProjectDTO dto, @Context SecurityContext ctx) {
        Project project = projectRepository.update(dto, projectId, ctx.getUserPrincipal().getName());
        return Response.ok(projectMapper.toResource(project)).build();
    }
}
