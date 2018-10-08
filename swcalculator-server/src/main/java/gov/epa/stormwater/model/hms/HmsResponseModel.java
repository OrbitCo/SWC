package gov.epa.stormwater.model.hms;

import java.util.List;
import java.util.Map;

public class HmsResponseModel {
    private String dataset;

    private String dataSource;

    private HmsResponseMetadata metadata;

    private Map<String, List<String>> data;

    public String getDataset() {
        return dataset;
    }

    public void setDataset(String dataset) {
        this.dataset = dataset;
    }

    public String getDataSource() {
        return dataSource;
    }

    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }

    public HmsResponseMetadata getMetadata() {
        return metadata;
    }

    public void setMetadata(HmsResponseMetadata metadata) {
        this.metadata = metadata;
    }

    public Map<String, List<String>> getData() {
        return data;
    }

    public void setData(Map<String, List<String>> data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "HmsResponseModel{" +
                "dataset='" + dataset + '\'' +
                ", dataSource='" + dataSource + '\'' +
                ", metadata=" + metadata +
                ", data=" + data +
                '}';
    }
}
