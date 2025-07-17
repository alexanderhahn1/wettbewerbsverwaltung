package at.htl.leonding.features.project;

public record ProjectDTO(
        long id,
        long competition_id,
        String name,
        String status,
        String next_step,
        String contributors
) {
}
