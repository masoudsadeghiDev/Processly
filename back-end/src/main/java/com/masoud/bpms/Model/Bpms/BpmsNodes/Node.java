package com.masoud.bpms.Model.Bpms.BpmsNodes;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.masoud.bpms.Model.Bpms.Process;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;


@Entity
@Table(name = "NodeTbl")
@Inheritance(
        strategy = InheritanceType.JOINED
)
public abstract class Node {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ID;

    private String name;

    private String diagramId;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Node before;

    @OneToMany(mappedBy = "before")
    private Set<Node> next = new HashSet<>();

    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn
    private Process process;

    protected NodeType type;

    public Node() {
    }

    public Integer getID() {
        return ID;
    }

    public void setID(Integer id) {
        this.ID = id;
    }


    public Node getBefore() {
        return before;
    }

    public void setBefore(Node before) {
        this.before = before;
    }

    public String getDiagramId() {
        return diagramId;
    }

    public void setDiagramId(String diagramId) {
        this.diagramId = diagramId;
    }

    @JsonIgnore
    public Set<Node> getNext() {
        if (next == null)
            return new HashSet<>();
        next = next.stream().map(node -> {
            node.setBefore(null);
            return node;
        }).collect(Collectors.toSet());

        if (next == null)
            return new HashSet<>();

        return next;
    }

    public void setNext(Set<Node> next) {
        this.next = next;
    }

    @JsonIgnore
    public Process getProcess() {
        return process;
    }

    public void setProcess(Process process) {
        this.process = process;
    }

    public NodeType getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(NodeType type) {
        this.type = type;
    }

    @JsonIgnore
    public void syncNodes(Session session) {
        this.next = (Set) this.next.stream().map(node -> {
            node.syncNodes(session);
            return this.getMainNode(session, node.getID(), node.getType());
        }).collect(Collectors.toSet());
    }

    @JsonIgnore
    private Object getMainNode(Session session, Integer nodeId, NodeType type) {
        Class<? extends NodeType> typeClass = NodeType.toClass(type);
        Object result = session.createCriteria(typeClass)
                .add(Restrictions.eq("id", nodeId))
                .uniqueResult();
        return result;
    }
}
