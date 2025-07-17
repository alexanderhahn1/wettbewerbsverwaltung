package at.htl.leonding.features.project;

import at.htl.leonding.features.competition.Competition;
import jakarta.persistence.*;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    Competition competition;

    @Column(name = "name")
    String projectName;
    String status;
    @Column(name = "next_step")
    String nextStep;
    String contributors;

    public Project() {}

    public Project(Competition competition, String projectName, String status, String nextStep, String contributors) {
        this.competition = competition;
        this.projectName = projectName;
        this.status = status;
        this.nextStep = nextStep;
        this.contributors = contributors;
    }

    public void setEverything(String projectName, String status, String nextStep, String contributors) {
        this.projectName = projectName;
        this.status = status;
        this.nextStep = nextStep;
        this.contributors = contributors;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Competition getCompetition() {
        return competition;
    }

    public void setCompetition(Competition competition) {
        this.competition = competition;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNextStep() {
        return nextStep;
    }

    public void setNextStep(String nextStep) {
        this.nextStep = nextStep;
    }

    public String getContributors() {
        return contributors;
    }

    public void setContributors(String contributors) {
        this.contributors = contributors;
    }
}
