package com.masoud.bpms.Service.User;

import com.masoud.bpms.Model.Bpms.Application;
import com.masoud.bpms.Model.Organization.Skill;
import com.masoud.bpms.Model.Organization.User;
import com.masoud.bpms.Model.Role;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List<User> getUserList() {
        return sessionFactory.getCurrentSession()
                .createCriteria(User.class)
                .setProjection(Projections.projectionList()
                        .add(Projections.property("ID"), "ID")
                        .add(Projections.property("username"), "username")
                        .add(Projections.property("name"), "name")
                        .add(Projections.property("family"), "family")
                        .add(Projections.property("role"), "role")
                        .add(Projections.property("email"), "email")
                        .add(Projections.property("profile"), "profile")
                        .add(Projections.property("enable"), "enable")
                )
                .setResultTransformer(Transformers.aliasToBean(User.class)).list();
    }

    @Override
    public Map getUserInfo(Integer userId) {
        User user = (User) sessionFactory.getCurrentSession()
                .createCriteria(User.class)
                .add(Restrictions.eq("id", userId))
                .uniqueResult();
        Map<String, Object> info = new HashMap<>();
        info.put("username", user.getUsername());
        info.put("name", user.getName());
        info.put("family", user.getFamily());
        info.put("role", user.getRole());
        info.put("email", user.getEmail());
        info.put("profile", user.getProfile());
        info.put("enable", user.getEnable());
        info.put("organization", user.getOrganization() != null ? user.getOrganization().getName() : "");
        info.put("skills", user.getSkills().isEmpty() ? "" : user.getSkills().stream().map(skill -> skill.getName()).collect(Collectors.joining(", ")));
        info.put("area", user.getArea() != null ? user.getArea().getName() : "");
        info.put("businessRole", user.getBusinessRole() != null ? user.getBusinessRole().getName() : "");
        info.put("position", user.getPosition() != null ? user.getPosition().getName() : "");
        return info;
    }

    @Override
    @Transactional
    public void changeStatus(Integer status, Integer userId) {
        String query = String.format("UPDATE UserTbl SET enable=%s WHERE ID = %s", status, userId);
        sessionFactory.getCurrentSession().createNativeQuery(query).executeUpdate();
    }


    @Override
    @Transactional
    public boolean register(Map<String, Object> userInfo) {
        try {
            User user = new User(userInfo);
            Integer id = (Integer) sessionFactory.getCurrentSession().save(user);

            if (userInfo.containsKey("skills") && userInfo.get("skills")!=null) {
                String skills = ((List<Integer>) userInfo.get("skills"))
                        .stream()
                        .map(skillId -> skillId.toString())
                        .collect(Collectors.joining(","));
                String query = String.format("INSERT INTO User_Skill\n" +
                        "SELECT %s AS user_id, value AS skill_id FROM string_split('%s',',')", id, skills);
                sessionFactory.getCurrentSession().createNativeQuery(query).executeUpdate();
            }


            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public User getUser(Integer userId) {
        User user = (User) sessionFactory.getCurrentSession()
                .createCriteria(User.class)
                .add(Restrictions.eq("id", userId))
                .uniqueResult();
        return user;
    }

    @Override
    @Transactional
    public void createDefaultUser() {

        String query = "INSERT INTO UserTbl (password,username,name,family,enable,role)\n" +
                "                SELECT\n" +
                "                   '$2a$10$3uGhgaegF0FeAuOA2AXBVe2vskXQa3dex16BItMVupP51BoKJJS9u' AS password,\n" +
                "                       'masoud' AS username,+\n" +
                "                       N'مسعود' AS name,\n" +
                "                       N'صادقی' AS family,\n" +
                "                        1 AS enale,\n" +
                "                       0 AS role" +
                "                WHERE NOT EXISTS(  SELECT * FROM UserTbl )\n" +
                "                SELECT COUNT(*) FROM UserTbl";
        Session session= sessionFactory.openSession();
        session.createNativeQuery(query).list();
        session.close();
    }
}
