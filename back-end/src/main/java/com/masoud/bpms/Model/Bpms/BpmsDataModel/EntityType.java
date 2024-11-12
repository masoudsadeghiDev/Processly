package com.masoud.bpms.Model.Bpms.BpmsDataModel;

public enum EntityType {
    MASTER,
    PARAMETER;

    private String value;

    public static class Values {
        public static final String MASTER = "MASTER";
        public static final String PARAMETER = "PARAMETER";
    }
}
