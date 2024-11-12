package com.masoud.bpms.Model.Form.Designer;

import java.util.List;

public class RowData {

    String displayName;
    RowKind kind;
    Object data;
    List options;

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public RowKind getKind() {
        return kind;
    }

    public void setKind(RowKind kind) {
        this.kind = kind;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public List getOptions() {
        return options;
    }

    public void setOptions(List options) {
        this.options = options;
    }
}
