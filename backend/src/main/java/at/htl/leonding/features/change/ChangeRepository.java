package at.htl.leonding.features.change;

import at.htl.leonding.features.competition.Competition;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class ChangeRepository implements PanacheRepository<Change> {

    @Transactional
    public Change create(Change change) {
        persist(change);
        return change;
    }

    public List<Change> getByCompetition(long competitionId) {
        return find("competition.id", competitionId).list();
    }
}
