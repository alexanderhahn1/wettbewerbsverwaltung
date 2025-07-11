package at.htl.leonding.features.project;

public record ProjectStatusDTO(
        String name,
        String status,
        String next_step,
        String contributors
) {
    public static ProjectStatusDTO toResource(final Project project) {
        return new ProjectStatusDTO(project.getProjectName(), project.getStatus(), project.getNextStep(), project.getContributors());
    }
}
