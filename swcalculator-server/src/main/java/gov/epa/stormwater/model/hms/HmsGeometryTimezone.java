package gov.epa.stormwater.model.hms;

public class HmsGeometryTimezone {
    private String name;

    private Integer offset;

    private Boolean dls;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Boolean getDls() {
        return dls;
    }

    public void setDls(Boolean dls) {
        this.dls = dls;
    }

    @Override
    public String toString() {
        return "HMSGeometryTimezone{" +
                "name='" + name + '\'' +
                ", offset=" + offset +
                ", dls=" + dls +
                '}';
    }
}
