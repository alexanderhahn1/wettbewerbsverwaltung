package at.htl.leonding.features.project;

import at.htl.leonding.features.competition.CompetitionRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ProjectMapper {
    @Inject
    CompetitionRepository competitionRepository;

    public ProjectDTO toResource(Project project) {
        return new ProjectDTO(project.getId(), project.getCompetition().getId(), project.getProjectName(), project.getStatus(), project.getNextStep(), project.getContributors());
    }

    //public Project toProject(ProjectDTO dto) {
    //    return new Project(competitionRepository.findById(dto.competition_id()), dto.name(), dto.status(), dto.next_step(), dto.contributors());
    //}
}
