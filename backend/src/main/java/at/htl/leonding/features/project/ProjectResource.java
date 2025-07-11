package at.htl.leonding.features.project;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/projects")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProjectResource {
    @Inject
    ProjectRepository projectRepository;
    @Inject
    ProjectMapper projectMapper;

    @PermitAll
    @GET
    public Response getAllProjects() {
        return Response.ok(projectRepository.findAll()
                .stream()
                .map(projectMapper::toResource)).build();
    }

    @POST
    @RolesAllowed({"admin"})
    public Response createProject(ProjectDTO dto) {
        Project project = projectRepository.create(projectMapper.toProject(dto));
        return Response.status(Response.Status.CREATED).entity(projectMapper.toResource(project)).build();
    }
}
