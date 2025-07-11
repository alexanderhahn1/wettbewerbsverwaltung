package at.htl.leonding.features.competition;

import at.htl.leonding.features.project.ProjectStatusDTO;

import java.time.LocalDate;
import java.util.List;

public record StatusDTO(
        String name,
        LocalDate last_update,
        List<ProjectStatusDTO> projects
) {
}
