package at.htl.leonding.features.competitionImage;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CompetitionImageRepository implements PanacheRepository<CompetitionImage> {
}
