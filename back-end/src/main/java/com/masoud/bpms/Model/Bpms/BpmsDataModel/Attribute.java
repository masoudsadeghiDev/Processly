package com.masoud.bpms.Model.Bpms.BpmsDataModel;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.masoud.bpms.Model.Bpms.BpmsBaseModel;
import javax.persistence.*;

@Entity
@Table(name = "AttributeTbl")
public class Attribute extends BpmsBaseModel {

    private String description;
    private Integer length;
    private String defaultValue;
    private AttributeType type;
    private String primitiveType;
    private String attrUi;
    private String className;

    public Attribute() {
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public String getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }

    public AttributeType getType() {
        return type;
    }

    public void setType(AttributeType type) {
        this.type = type;
    }

    public String getAttrUi() {
        return attrUi;
    }

    public void setAttrUi(String attrUi) {
        this.attrUi = attrUi;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getPrimitiveType() {
        return primitiveType;
    }

    public void setPrimitiveType(String primitiveType) {
        this.primitiveType = primitiveType;
    }

    @JsonIgnore
    public String getColumnName() {
        return String.format("<entity>_COL", this.getName().toUpperCase());
    }

    @JsonIgnore
    public String getRelatedColName() {
        return String.format("%s_COL", this.getClassName().toUpperCase());
    }

    @JsonIgnore
    public String getTableName() {
        return String.format("<entity>_%s", this.getClassName().toUpperCase());
    }

    @Override
    public String toString() {
        switch (type) {
            case PRIMITIVE:
                return String.format("<property name = \"%s\" column = \"%s\" type = \"%s\"/>\n", getName(), getName().toUpperCase(), primitiveType);
            case ONE_TO_ONE:
                return String.format("<one-to-one class=\"%s\" name=\"%s\" cascade=\"all\"  /> ", getClassName(), getName());
            case ONE_TO_MANY:
                return String.format("<set name=\"%s\" >\n" +
                        "<key column=\"%s\"  />\n" +
                        "<one-to-many class=\"%s\"/>\n" +
                        "</set>", getName(), getColumnName(), getClassName());
            case MANY_TO_MANY:
                return String.format("<set name=\"%s\" table=\"%s\" cascade=\"all\">\n" +
                        "<key column=\"%s\"/>\n" +
                        "<many-to-many column=\"%s\" class=\"%s\" />\n" +
                        "</set> ", getName(), getTableName(), getColumnName(), getRelatedColName(), getClassName());
            case MANY_TO_ONE:
                return String.format(
                        "<many-to-one name=\"%s\" class=\"%s\" fetch=\"select\">\n" +
                                "            <column name=\"%s\"  />\n" +
                                "        </many-to-one>", getName(), getClassName(), getRelatedColName()
                );
            default:
                return "";
        }
    }
}
