package at.htl.leonding.features.competitionImage;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CompetitionImageMapper {

    public CompetitionImageDTO toResource(CompetitionImage competitionImage) {
        return new CompetitionImageDTO(competitionImage.id, competitionImage.pictureName, competitionImage.contentType, "http://localhost:8080/api/images/" + competitionImage.id);
    }
}
