package com.masoud.bpms.Service.Organization;

import com.masoud.bpms.Model.Organization.Organization;
import com.masoud.bpms.Model.Organization.Position;
import org.json.JSONObject;

import java.util.List;
import java.util.Map;

public interface OrganizationService {

    public void create(Organization organization);

    public void createSubItem(String subItemName, JSONObject jsonObject, Integer organizationId);

    public List<Organization> list();

    public List<Position> subItemList(String subItemName, Integer organizationId);

    public Map<String, Object> getAllSubItemList(Integer organizationId);

    public List<Position> getOrganChart(Integer organizationId);

    public List<Position> getOrganChartMenu(Integer organizationId);

    public void setParent(Integer parentId, Integer id);
}
