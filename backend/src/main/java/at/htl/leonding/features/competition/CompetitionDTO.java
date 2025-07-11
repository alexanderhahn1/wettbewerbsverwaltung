package at.htl.leonding.features.competition;

import java.time.LocalDate;

public record CompetitionDTO(
        long id,
        String name,
        String link,
        String deadline,
        String prize,
        String information_material,
        String submission_forms,
        String contact,
        Boolean is_active,
        LocalDate date_created,
        LocalDate last_update,
        String schoolYear,
        String created_by
) {
}
