package at.htl.leonding.features.competition;

import at.htl.leonding.features.change.Change;
import at.htl.leonding.features.competitionImage.CompetitionImage;
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

    @OneToMany(mappedBy = "competition", cascade = CascadeType.ALL)
    List<Project> projects;

    @OneToMany(mappedBy = "competition", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    List<Change> changes;

    @OneToMany(mappedBy = "competition", cascade = CascadeType.ALL)
    List<CompetitionImage> images;

    @Column(name = "name")
    String competitionName;
    String link;
    String deadline;
    @Column(name = "deadline_date")
    LocalDate deadlineDate;
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
    @Column(name = "created_by")
    String createdBy;
    @Column(name = "is_relevant")
    Boolean isRelevant;

    public LocalDate getLastChangeDate() {
        if (changes == null || changes.isEmpty()) {
            return dateCreated;
        } else {
            return changes.getLast().getDate();
        }
    }

    public Competition() {}

    public Competition(String competitionName, String link, String deadline, LocalDate deadlineDate, String prize, String informationMaterial, String submissionForms, String contact, Boolean isActive, String schoolYear, String createdBy, Boolean isRelevant) {
        this.competitionName = competitionName;
        this.link = link;
        this.deadline = deadline;
        this.deadlineDate = deadlineDate;
        this.prize = prize;
        this.informationMaterial = informationMaterial;
        this.submissionForms = submissionForms;
        this.contact = contact;
        this.isActive = isActive;
        this.schoolYear = schoolYear;
        this.createdBy = createdBy;
        this.dateCreated = LocalDate.now();
        this.isRelevant = isRelevant;
    }

    public LocalDate getDeadlineDate() {
        return deadlineDate;
    }

    public void setDeadlineDate(LocalDate deadlineDate) {
        this.deadlineDate = deadlineDate;
    }

    public Boolean getRelevant() {
        return isRelevant;
    }

    public void setRelevant(Boolean relevant) {
        isRelevant = relevant;
    }

    public List<CompetitionImage> getImages() {
        return images;
    }

    public void setImages(List<CompetitionImage> images) {
        this.images = images;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Change> getChanges() {
        return changes;
    }

    public void setChanges(List<Change> changes) {
        this.changes = changes;
    }

    public String getSchoolYear() {
        return schoolYear;
    }

    public void setSchoolYear(String schoolYear) {
        this.schoolYear = schoolYear;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
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
