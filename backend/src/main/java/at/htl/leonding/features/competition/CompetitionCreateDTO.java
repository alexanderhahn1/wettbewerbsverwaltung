package at.htl.leonding.features.competition;

import java.time.LocalDate;

public record CompetitionCreateDTO(
    String name,
    String link,
    String deadline,
    String prize,
    String information_material,
    String submission_forms,
    String contact,
    boolean is_active,
    String school_year,
    Boolean is_relevant
) {
}
