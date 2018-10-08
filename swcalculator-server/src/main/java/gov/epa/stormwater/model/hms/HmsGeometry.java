package gov.epa.stormwater.model.hms;

public class HmsGeometry {
    private String description;

    private Long comID;

    private Long hucID;

    private HmsGeometryPoint point;

    private HmsGeometryMetadata geometryMetadata;

    private HmsGeometryTimezone timezone;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getComID() {
        return comID;
    }

    public void setComID(Long comID) {
        this.comID = comID;
    }

    public Long getHucID() {
        return hucID;
    }

    public void setHucID(Long hucID) {
        this.hucID = hucID;
    }

    public HmsGeometryPoint getPoint() {
        return point;
    }

    public void setPoint(HmsGeometryPoint point) {
        this.point = point;
    }

    public HmsGeometryMetadata getGeometryMetadata() {
        return geometryMetadata;
    }

    public void setGeometryMetadata(HmsGeometryMetadata geometryMetadata) {
        this.geometryMetadata = geometryMetadata;
    }

    public HmsGeometryTimezone getTimezone() {
        return timezone;
    }

    public void setTimezone(HmsGeometryTimezone timezone) {
        this.timezone = timezone;
    }

    @Override
    public String toString() {
        return "HMSGeometry{" +
                "description='" + description + '\'' +
                ", comID=" + comID +
                ", hucID=" + hucID +
                ", point=" + point +
                ", geometryMetadata=" + geometryMetadata +
                ", timezone=" + timezone +
                '}';
    }
}
