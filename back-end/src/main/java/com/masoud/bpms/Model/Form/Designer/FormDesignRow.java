package com.masoud.bpms.Model.Form.Designer;

import java.util.List;

public class FormDesignRow {
    private RowData data;
    private List children;

    public RowData getData() {
        return data;
    }

    public void setData(RowData data) {
        this.data = data;
    }

    public List<FormDesignRow> getChildren() {
        return children;
    }

    public void setChildren(List children) {
        this.children = children;
    }
}
