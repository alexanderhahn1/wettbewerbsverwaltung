package at.htl.leonding.features.competitionImage;

import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.annotations.providers.multipart.PartType;

public class ImageUploadForm {

    @FormParam("file")
    @PartType("application/octet-stream")
    public byte[] file;

    @FormParam("fileName")
    @PartType("text/plain")
    public String fileName;

    @FormParam("fileContentType")
    @PartType("text/plain")
    public String fileContentType;
}
