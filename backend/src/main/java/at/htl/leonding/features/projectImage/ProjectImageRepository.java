package at.htl.leonding.features.projectImage;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProjectImageRepository implements PanacheRepository<ProjectImage> {
}
