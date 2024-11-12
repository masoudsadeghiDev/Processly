package com.masoud.bpms.Model.Bpms.BpmsNodes.Data;

import com.masoud.bpms.Model.Bpms.BpmsNodes.Node;
import com.masoud.bpms.Model.Bpms.BpmsNodes.NodeType;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "DataObjectReferenceTbl")
public class DataStoreReference extends Node {

    public DataStoreReference() {
        this.type = NodeType.DataStoreReference;
    }
}
