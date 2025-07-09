package at.htl.leonding.features.competition;

import at.htl.leonding.features.project.ProjectDTO;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CompetitionMapper {

    public CompetitionDTO toResource(final Competition competition) {
        return new CompetitionDTO(competition.competitionName, competition.link, competition.deadline, competition.prize, competition.informationMaterial,
                competition.submissionForms, competition.contact, competition.isActive, competition.dateCreated, competition.getLastChangeDate(),
                competition.schoolYear, competition.createdBy);
    }

    public StatusDTO toStatusResource(final Competition competition) {
        return new StatusDTO(competition.competitionName, competition.getLastChangeDate(),
                competition.projects.stream().map(ProjectDTO::toResource).toList());
    }

    public Competition toCompetition(final CompetitionCreateDTO dto, String createdBy) {
        return new Competition(dto.name(), dto.link(), dto.deadline(), dto.prize(), dto.information_material(),
                dto.submission_forms(), dto.contact(), dto.is_active(), dto.school_year(), createdBy);
    }
}
