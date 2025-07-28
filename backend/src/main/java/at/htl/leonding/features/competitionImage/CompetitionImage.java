package at.htl.leonding.features.competitionImage;

import at.htl.leonding.features.competition.Competition;
import jakarta.persistence.*;

@Entity
@Table(name = "competition_image")
public class CompetitionImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "picture_name")
    public String pictureName;

    @Column(name = "content_type")
    public String contentType;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    public byte[] data;

    @ManyToOne
    public Competition competition;

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPictureName() {
        return pictureName;
    }

    public void setPictureName(String pictureName) {
        this.pictureName = pictureName;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public Competition getCompetition() {
        return competition;
    }

    public void setCompetition(Competition competition) {
        this.competition = competition;
    }
}
