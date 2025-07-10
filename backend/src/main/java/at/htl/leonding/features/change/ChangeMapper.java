package at.htl.leonding.features.change;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ChangeMapper {

    public ChangeDTO toResource(Change change) {
        return new ChangeDTO(change.competition.getId(), change.getAttribute(), change.getOldValue(), change.getNewValue(),
                change.getDate(), change.getChangedBy());
    }
}
