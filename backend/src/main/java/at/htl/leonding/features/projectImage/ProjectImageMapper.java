package at.htl.leonding.features.projectImage;

import at.htl.leonding.features.competitionImage.CompetitionImage;
import at.htl.leonding.features.competitionImage.CompetitionImageDTO;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProjectImageMapper {

    public ProjectImageDTO toResource(ProjectImage projectImage) {
        return new ProjectImageDTO(projectImage.id, projectImage.pictureName, projectImage.contentType, "http://localhost:8080/api/project-images/" + projectImage.id);
    }
}
