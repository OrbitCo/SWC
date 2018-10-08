package gov.epa.stormwater.model.hms;

public class HmsPostModel {
    private String source;

    private HmsDateTimeSpan dateTimeSpan;

    private HmsGeometry geometry;

    private String dataValueFormat;

    private String temporalResolution;

    private Boolean timeLocalized;

    private String units;

    private String outputFormat;

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public HmsDateTimeSpan getDateTimeSpan() {
        return dateTimeSpan;
    }

    public void setDateTimeSpan(HmsDateTimeSpan dateTimeSpan) {
        this.dateTimeSpan = dateTimeSpan;
    }

    public HmsGeometry getGeometry() {
        return geometry;
    }

    public void setGeometry(HmsGeometry geometry) {
        this.geometry = geometry;
    }

    public String getDataValueFormat() {
        return dataValueFormat;
    }

    public void setDataValueFormat(String dataValueFormat) {
        this.dataValueFormat = dataValueFormat;
    }

    public String getTemporalResolution() {
        return temporalResolution;
    }

    public void setTemporalResolution(String temporalResolution) {
        this.temporalResolution = temporalResolution;
    }

    public Boolean getTimeLocalized() {
        return timeLocalized;
    }

    public void setTimeLocalized(Boolean timeLocalized) {
        this.timeLocalized = timeLocalized;
    }

    public String getUnits() {
        return units;
    }

    public void setUnits(String units) {
        this.units = units;
    }

    public String getOutputFormat() {
        return outputFormat;
    }

    public void setOutputFormat(String outputFormat) {
        this.outputFormat = outputFormat;
    }

    @Override
    public String toString() {
        return "HmsPostModel{" +
                "source='" + source + '\'' +
                ", dateTimeSpan=" + dateTimeSpan +
                ", geometry=" + geometry +
                ", dataValueFormat='" + dataValueFormat + '\'' +
                ", temporalResolution='" + temporalResolution + '\'' +
                ", timeLocalized=" + timeLocalized +
                ", units='" + units + '\'' +
                ", outputFormat='" + outputFormat + '\'' +
                '}';
    }
}
