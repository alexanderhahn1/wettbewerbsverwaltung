package at.htl.leonding.features.project;

import at.htl.leonding.features.change.Change;
import at.htl.leonding.features.change.ChangeRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.time.LocalDate;

@ApplicationScoped
public class ProjectRepository implements PanacheRepository<Project> {

    @Inject
    ChangeRepository changeRepository;

    @Transactional
    public Project create(Project project, String changedBy) {
        persist(project);
        changeRepository.create(new Change(project.competition, "created project (" + project.getProjectName() + ")", "", "", LocalDate.now(), changedBy));
        return project;
    }

    @Transactional
    public Project update(ProjectDTO dto, long projectId, String changedBy) {
        Project project = findById(projectId);

        changeRepository.create(new Change(project.competition, "updated project (" + dto.name() + ")", "", "", LocalDate.now(), changedBy));

        project.setEverything(dto.name(), dto.status(), dto.next_step(), dto.contributors());
        persist(project);
        return project;
    }
}
