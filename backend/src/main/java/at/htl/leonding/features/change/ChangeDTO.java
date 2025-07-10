package at.htl.leonding.features.change;

import java.time.LocalDate;

public record ChangeDTO(
        long competition_id,
        String attribute,
        String old_value,
        String new_value,
        LocalDate date,
        String changed_by
) {
}
