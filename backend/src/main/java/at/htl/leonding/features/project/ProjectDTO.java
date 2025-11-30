package at.htl.leonding.features.project;

import java.time.LocalDate;

public record ProjectDTO(
        long id,
        long competition_id,
        String name,
        String status,
        String next_step,
        String contributors,
        LocalDate date_created
) {
}
