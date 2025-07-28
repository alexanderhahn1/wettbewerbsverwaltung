package at.htl.leonding.features.competition;

import at.htl.leonding.features.change.Change;
import at.htl.leonding.features.change.ChangeRepository;
import at.htl.leonding.features.competitionImage.CompetitionImage;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Random;

@ApplicationScoped
public class CompetitionRepository implements PanacheRepository<Competition> {

    @Inject
    ChangeRepository changeRepository;
    Random random = new Random();

    public List<Competition> getAll() {
        return getEntityManager().createNamedQuery(Competition.FIND_ALL, Competition.class).getResultList();
    }

    public List<Competition> getActive() {
        return getEntityManager().createNamedQuery(Competition.FIND_ACTIVE, Competition.class).getResultList();
    }

    public List<Competition> getBySchoolYear(String schoolYear) {
        return getEntityManager().createNamedQuery(Competition.FIND_BY_SCHOOL_YEAR, Competition.class)
                .setParameter("year", schoolYear).getResultList();
    }

    public Competition getRandom() {
        List<Competition> all = listAll();
        if (all.isEmpty()) {
            return null;
        }
        return all.get(random.nextInt(all.size()));
    }

    public List<CompetitionImage> getAllImages(long id) {
        Competition competition = findById(id);
        if (competition == null) {
            return null;
        }

        return competition.getImages();
    }

    @Transactional
    public void deleteCompetition(Long id) {
        Competition competition = findById(id);

        if (competition != null) {
            delete(competition);
        }
    }

    @Transactional
    public Competition save(Competition competition) {
        persist(competition);
        return competition;
    }

    @Transactional
    public Competition update(CompetitionCreateDTO dto, Long id, String changedBy) {
        Competition competition = findById(id);

        trackChange(dto, competition, "name", "competitionName", competition, changedBy);
        trackChange(dto, competition, "link", "link", competition, changedBy);
        trackChange(dto, competition, "deadline", "deadline", competition, changedBy);
        trackChange(dto, competition, "prize", "prize", competition, changedBy);
        trackChange(dto, competition, "information_material", "informationMaterial", competition, changedBy);
        trackChange(dto, competition, "submission_forms", "submissionForms", competition, changedBy);
        trackChange(dto, competition, "contact", "contact", competition, changedBy);
        trackChange(dto, competition, "is_active", "active", competition, changedBy);
        trackChange(dto, competition, "school_year", "schoolYear", competition, changedBy);

        persist(competition);
        return competition;
    }


    private void trackChange(Object dto, Object entity, String dtoField, String entityField, Competition competition, String changedBy) {
        try {
            var dtoValue = dto.getClass().getMethod(dtoField).invoke(dto);
            var getter = entity.getClass().getMethod("get" + capitalize(entityField));
            var oldValue = getter.invoke(entity);

            if (!Objects.equals(oldValue, dtoValue)) {
                // Log change
                changeRepository.create(new Change(
                        competition,
                        entityField,
                        oldValue != null ? oldValue.toString() : null,
                        dtoValue != null ? dtoValue.toString() : null,
                        LocalDate.now(),
                        changedBy
                ));

                // Set new value
                var setter = entity.getClass().getMethod("set" + capitalize(entityField), getter.getReturnType());
                setter.invoke(entity, dtoValue);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error tracking field: " + entityField, e);
        }
    }

    private String capitalize(String field) {
        return field.substring(0, 1).toUpperCase() + field.substring(1);
    }


}
