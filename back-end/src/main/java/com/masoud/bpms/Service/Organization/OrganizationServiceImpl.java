package com.masoud.bpms.Service.Organization;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.masoud.bpms.Model.Organization.Organization;
import com.masoud.bpms.Model.Organization.Position;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.json.JSONObject;
import org.springframework.beans.PropertyAccessor;
import org.springframework.beans.PropertyAccessorFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class OrganizationServiceImpl implements OrganizationService {

    private static final String BASE_PATH = "com.masoud.bpms.Model.Organization.";
    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public void create(Organization organization) {
        sessionFactory.getCurrentSession().save(organization);
    }

    @Override
    public void createSubItem(String subItemName, JSONObject subItem, Integer organizationId) {
        try {
            Class<?> cls = this.getSubItemClass(subItemName);
            Object subItemCls = new ObjectMapper().readValue(subItem.toString(), cls);

            PropertyAccessor propertyAccessor = PropertyAccessorFactory.forDirectFieldAccess(subItemCls);
            propertyAccessor.setPropertyValue("organization", new Organization(organizationId));

            sessionFactory.getCurrentSession().save(subItemCls);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @Override
    public List<Organization> list() {
        return sessionFactory.getCurrentSession()
                .createCriteria(Organization.class)
                .setProjection(Projections.projectionList()
                        .add(Projections.property("id"), "id")
                        .add(Projections.property("name"), "name")
                        .add(Projections.property("displayName"), "displayName")
                        .add(Projections.property("description"), "description")
                )
                .setResultTransformer(Transformers.aliasToBean(Organization.class))
                .list();
    }

    @Override
    public List<Position> subItemList(String subItem, Integer organizationId) {

        Class<?> cls = this.getSubItemClass(subItem);
        return sessionFactory.getCurrentSession()
                .createCriteria(cls)
                .add(Restrictions.eq("organization", new Organization(organizationId)))
                .setProjection(Projections.projectionList()
                        .add(Projections.property("id"), "id")
                        .add(Projections.property("name"), "name")
                        .add(Projections.property("displayName"), "displayName")
                        .add(Projections.property("description"), "description")
                )
                .setResultTransformer(Transformers.aliasToBean(cls))
                .list();
    }

    @Override
    public Map<String, Object> getAllSubItemList(Integer organizationId) {
        Map<String, Object> data = new HashMap<>();
        data.put("Positions", this.subItemList("Position", organizationId));
        data.put("Areas", this.subItemList("Area", organizationId));
        data.put("Skills", this.subItemList("Skill", organizationId));
        data.put("BusinessRoles", this.subItemList("BusinessRole", organizationId));
        return data;
    }

    @Override
    public List<Position> getOrganChart(Integer organizationId) {
        return sessionFactory.getCurrentSession()
                .createCriteria(Position.class)
                .add(Restrictions.eq("organization", new Organization(organizationId)))
                .add(Restrictions.eq("existInChart", true))
                .setProjection(Projections.projectionList()
                        .add(Projections.property("id"), "id")
                        .add(Projections.property("name"), "name")
                        .add(Projections.property("displayName"), "displayName")
                        .add(Projections.property("parentId"), "parentId")
                )
                .setResultTransformer(Transformers.aliasToBean(Position.class))
                .list();
    }

    @Override
    public List<Position> getOrganChartMenu(Integer organizationId) {
        return sessionFactory.getCurrentSession()
                .createCriteria(Position.class)
                .add(Restrictions.eq("organization", new Organization(organizationId)))
                .add(Restrictions.or(Restrictions.isNull("existInChart"),Restrictions.eq("existInChart",false)))
                .setProjection(Projections.projectionList()
                        .add(Projections.property("id"), "id")
                        .add(Projections.property("name"), "name")
                        .add(Projections.property("displayName"), "displayName")
                        .add(Projections.property("parentId"), "parentId")
                )
                .setResultTransformer(Transformers.aliasToBean(Position.class))
                .list();
    }

    @Override
    @Transactional
    public void setParent(Integer parentId, Integer id) {
        sessionFactory.getCurrentSession().createNativeQuery(String.format("UPDATE PositionTbl SET parentId = %s , existInChart='true' WHERE ID = %s", parentId, id)).executeUpdate();
    }

    private Class<?> getSubItemClass(String subItem) {
        try {
            return Class.forName(BASE_PATH + subItem);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }
}
