package at.htl.leonding.features.competition;

import at.htl.leonding.features.competitionImage.ImageUploadForm;

import java.time.LocalDate;
import java.util.List;

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
    List<ImageUploadForm> images
) {
}
