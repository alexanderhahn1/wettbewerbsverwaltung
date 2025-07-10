package at.htl.leonding.features.change;

import at.htl.leonding.features.competition.Competition;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Change {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    Competition competition;

    String attribute;
    @Column(name = "old_name")
    String oldValue;
    @Column(name = "new_name")
    String newValue;
    LocalDate date;
    @Column(name = "changed_by")
    String changedBy;

    public Change() {}

    public Change(Competition competition, String attribute, String oldValue, String newValue, LocalDate date, String changedBy) {
        this.competition = competition;
        this.attribute = attribute;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.date = date;
        this.changedBy = changedBy;
    }

    public String getChangedBy() {
        return changedBy;
    }

    public void setChangedBy(String changedBy) {
        this.changedBy = changedBy;
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

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public String getOldValue() {
        return oldValue;
    }

    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public String getNewValue() {
        return newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
