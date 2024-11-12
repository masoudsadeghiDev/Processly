package com.masoud.bpms.Service.Auth;

import com.masoud.bpms.Exception.AuthException;
import com.masoud.bpms.Model.Organization.User;
import com.masoud.bpms.Service.BaseService;
import com.masoud.bpms.Utility.Security.JwtTokenUtil;

import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

import com.masoud.bpms.Exception.AuthException.AuthExceptionType;

import javax.transaction.Transactional;

@Service
@Transactional
public class AuthServiceImpl extends BaseService implements AuthService {


    @Override
    public Map<String, Object> login(User body) throws AuthException {


        User user = (User) getSession().createCriteria(User.class)
                .add(Restrictions.eq("username", body.getUsername()))
                .uniqueResult();
        if (user == null) {
            throw new AuthException(AuthExceptionType.USER_NOTFOUND);
        }
        boolean passwordIsValid = user.checkPassword(body.getPassword());
        if (passwordIsValid) {
            String token = JwtTokenUtil.generateToken(user);
            Map<String, Object> data = new HashMap<>();
            data.put("token", token);
            return data;
        } else {
            throw new AuthException(AuthExceptionType.PASSWORD_INCORRECT);
        }
    }

    @Override
    public Map<String, Object> signup(User body) throws AuthException {
        User user = (User) getSession().createCriteria(User.class)
                .add(Restrictions.eq("username", body.getUsername()))
                .uniqueResult();
        if (user != null) {
            throw new AuthException(AuthExceptionType.USER_EXIST);
        }
        body.hashPassword();
        getSession().save(body);
        String token = JwtTokenUtil.generateToken(body);
        Map<String, Object> data = new HashMap<>();
        data.put("token", token);
        return data;

    }

    @Override
    public User getOneUser(String username) {
        return (User) getSession().createCriteria(User.class)
                .add(Restrictions.eq("username", username))
                .uniqueResult();

    }
}
