package at.htl.leonding.features.project;

public record ProjectDTO(
        String name,
        String status,
        String next_step,
        String contributors
) {
    public static ProjectDTO toResource(final Project project) {
        return new ProjectDTO(project.getProjectName(), project.getStatus(), project.getNextStep(), project.getContributors());
    }
}
