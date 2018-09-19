/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package gov.epa.stormwater.model.met;

import gov.epa.stormwater.model.*;
import java.util.ArrayList;
import java.util.List;
import org.codehaus.jackson.map.annotate.JsonSerialize;

/**
 *
 * @author UYEN.TRAN
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)    //do not output null values
public class MetStationModel {

    private List<PrecStationLocationModel> precStations = new ArrayList<PrecStationLocationModel>();
    private List<EvapStationLocationModel> evapStations = new ArrayList<EvapStationLocationModel>();

    public MetStationModel() {
    }

    public List<PrecStationLocationModel> getPrecStations() {
        return precStations;
    }

    public void setPrecStations(List<PrecStationLocationModel> precStations) {
        this.precStations = precStations;
    }
    
    
    public List<EvapStationLocationModel> getEvapStations() {
        return evapStations;
    }

    public void setEvapStations(List<EvapStationLocationModel> evapStations) {
        this.evapStations = evapStations;
    }


}
