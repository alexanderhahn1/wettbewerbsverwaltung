package at.htl.leonding.features.projectImage;

import at.htl.leonding.features.project.Project;
import jakarta.persistence.*;

@Entity
@Table(name = "project_image")
public class ProjectImage {
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
    public Project project;

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

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
