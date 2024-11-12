package com.masoud.bpms.Service.Form;

import com.masoud.bpms.Model.Form.Form;

public interface FormService {

    public void create(Form form);

    public Form getFormByActivityId(Integer id);

}
