package com.masoud.bpms.Service.Task;

import com.masoud.bpms.Model.Form.Form;

import java.util.List;
import java.util.Map;

public interface TaskService {

    public void addFilter(Map<String,Object> input);
    List getTaskUserCanCreate();
    Form getTaskForm(Integer activityId);
}
