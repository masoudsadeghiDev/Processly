package com.masoud.bpms.Service.Request;

import com.masoud.bpms.Model.Bpms.Request;

import java.util.List;

public interface RequestService {

    public Integer createRequest(Integer processId);
    public List<Request> getUserSendRequests(Integer page,Integer size);
    public List<Request> getUserReceivedRequests(Integer page,Integer size);
    public void getRequestCanStart();
    public  Object getRequestStatistic(Integer appId,boolean allUser);
}
