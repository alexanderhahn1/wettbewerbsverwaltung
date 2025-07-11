package at.htl.leonding.features.project;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class ProjectRepository implements PanacheRepository<Project> {

    @Transactional
    public Project create(Project project) {
        persist(project);
        return project;
    }
}
