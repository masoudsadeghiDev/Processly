package com.masoud.bpms.Model.Bpms.BpmsNodes;

import java.util.HashMap;
import java.util.Map;

public enum NodeType {

    EventBasedGateway(1, "Gateway"),
    InclusiveGateway(2, "Gateway"),
    ExclusiveGateway(3, "Gateway"),
    ComplexGateway(4, "Gateway"),
    ParallelGateway(5, "Gateway"),
    EndEvent(6, "Event"),
    StartEvent(1002, "Event"),
    IntermediateThrowEvent(2002, "Event"),
    IntermediateCatchEvent(2003, "Event"),
    ManualTask(1003, "Task"),
    Task(1004, "Task"),
    BusinessRuleTask(1005, "Task"),
    ScriptTask(1006, "Task"),
    SendTask(1007, "Task"),
    ServiceTask(1008, "Task"),
    ReceiveTask(1009, "Task"),
    UserTask(1010, "Task"),
    CallActivity(1011, "Activity"),
    DataStoreReference(1012, "Data"),
    DataObjectReference(1013, "Data"),
    SequenceFlow(1014, "Flow");
    private static final String BASE_PATH = "com.masoud.bpms.Model.Bpms.BpmsNodes.";

    private static final Map<Integer, NodeType> BY_LABEL = new HashMap<>();

    static {
        for (NodeType n : values()) {
            BY_LABEL.put(n.value, n);
        }
    }

    private int value;
    private String packageName;

    NodeType(int value, String packageName) {
        this.value = value;
        this.packageName = packageName;
    }

    public String getPackageName() {
        return packageName;
    }

    public static int valueOf(NodeType nodeType) {
        return nodeType.value;
    }

    public static NodeType create(int value) {
        return BY_LABEL.get(value);

    }

    public static Class toClass(NodeType type) {
        try {
            return Class.forName(BASE_PATH + type.getPackageName() + "." + type.name());
        } catch (ClassNotFoundException e) {
            return Node.class;
        }

    }

    public static Class toClass(String bpms2Name) {
        bpms2Name = bpms2Name.replace("bpmn2:", "");
        char firstChar = Character.toUpperCase(bpms2Name.charAt(0));
        bpms2Name = firstChar + bpms2Name.substring(1);
        NodeType type = NodeType.valueOf(bpms2Name);
        return toClass(type);
    }

}
