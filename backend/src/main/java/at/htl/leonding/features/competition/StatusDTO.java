package at.htl.leonding.features.competition;

import at.htl.leonding.features.project.ProjectDTO;

import java.time.LocalDate;
import java.util.List;

public record StatusDTO(
        String name,
        LocalDate last_update,
        List<ProjectDTO> projects
) {
}
