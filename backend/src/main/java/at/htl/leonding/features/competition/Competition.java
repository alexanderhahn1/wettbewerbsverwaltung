package at.htl.leonding.features.competition;

import at.htl.leonding.features.change.Change;
import at.htl.leonding.features.project.Project;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@NamedQueries({
        @NamedQuery(name = Competition.FIND_ALL, query = "SELECT c FROM Competition c ORDER BY c.dateCreated"),
        @NamedQuery(name = Competition.FIND_ACTIVE, query = "SELECT c FROM Competition c WHERE c.isActive = true ORDER BY c.dateCreated"),
        @NamedQuery(name = Competition.FIND_BY_SCHOOL_YEAR, query = "SELECT c FROM Competition c WHERE c.schoolYear = :year ORDER BY c.dateCreated")
})

@Entity
public class Competition {
    public static final String FIND_ALL = "Competition.findAll";
    public static final String FIND_ACTIVE = "Competition.findActive";
    public static final String FIND_BY_SCHOOL_YEAR = "Competition.findBySchoolYear";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @OneToMany(mappedBy = "competition")
    List<Project> projects;

    @OneToMany(mappedBy = "competition")
    List<Change> changes;

    @Column(name = "name")
    String competitionName;
    String link;
    String deadline;
    String prize;
    @Column(name = "information_material")
    String informationMaterial;
    @Column(name = "submission_forms")
    String submissionForms;
    String contact;
    @Column(name = "is_active")
    Boolean isActive;
    @Column(name = "date_created")
    LocalDate dateCreated;
    @Column(name = "school_year")
    String schoolYear;

    public LocalDate getLastChangeDate() {
        if (changes.isEmpty()) {
            return dateCreated;
        } else {
            return changes.getLast().getDate();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompetitionName() {
        return competitionName;
    }

    public void setCompetitionName(String competitionName) {
        this.competitionName = competitionName;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String getPrize() {
        return prize;
    }

    public void setPrize(String prize) {
        this.prize = prize;
    }

    public String getInformationMaterial() {
        return informationMaterial;
    }

    public void setInformationMaterial(String informationMaterial) {
        this.informationMaterial = informationMaterial;
    }

    public String getSubmissionForms() {
        return submissionForms;
    }

    public void setSubmissionForms(String submissionForms) {
        this.submissionForms = submissionForms;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public LocalDate getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDate dateCreated) {
        this.dateCreated = dateCreated;
    }
}
