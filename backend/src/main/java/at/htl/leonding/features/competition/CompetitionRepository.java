package at.htl.leonding.features.competition;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class CompetitionRepository implements PanacheRepository<Competition> {

    public List<Competition> getAll() {
        return getEntityManager().createNamedQuery(Competition.FIND_ALL).getResultList();
    }

    public List<Competition> getActive() {
        return getEntityManager().createNamedQuery(Competition.FIND_ACTIVE).getResultList();
    }

    public List<Competition> getBySchoolYear(String schoolYear) {
        return getEntityManager().createNamedQuery(Competition.FIND_BY_SCHOOL_YEAR)
                .setParameter("year", schoolYear).getResultList();
    }

    @Transactional
    public Competition save(Competition competition) {
        persist(competition);
        return competition;
    }
}
