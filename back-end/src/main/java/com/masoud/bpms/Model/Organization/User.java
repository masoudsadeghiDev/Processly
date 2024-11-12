package com.masoud.bpms.Model.Organization;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.masoud.bpms.Model.BaseModel;
import com.masoud.bpms.Model.Role;
import com.masoud.bpms.Utility.Security.Password;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import javax.persistence.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Entity
@Table(name = "UserTbl")
public class User extends BaseModel {

    private String name;
    private String family;
    private Role role;
    private String username;
    private String password;
    private String email;
    private String profile;
    private Boolean enable;

    @JsonIgnore
    @ManyToOne
    private Organization organization;
    @JsonIgnore
    @OneToOne
    private Position position;
    @JsonIgnore
    @OneToOne
    private Area area;
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "User_Skill",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "Skill_id")}
    )
    private List<Skill> skills;
    @JsonIgnore
    @OneToOne
    private BusinessRole businessRole;

    public User() {
    }

    public User(Integer id) {
        super.setID(id);
    }

    public User(Map<String, Object> userInfo) {
        this.enable = true;
        if (userInfo.containsKey("username") && userInfo.get("username")!=null) {
            this.username = (String) userInfo.get("username");
        }
        if (userInfo.containsKey("name")&& userInfo.get("name")!=null) {
            this.name = (String) userInfo.get("name");
        }
        if (userInfo.containsKey("family")&& userInfo.get("family")!=null) {
            this.family = (String) userInfo.get("family");
        }
        if (userInfo.containsKey("email")&& userInfo.get("email")!=null) {
            this.email = (String) userInfo.get("email");
        }
        if (userInfo.containsKey("password")&& userInfo.get("password")!=null) {
            this.password = (String) userInfo.get("password");
        }
        if (userInfo.containsKey("profile")&& userInfo.get("profile")!=null) {
            this.profile = (String) userInfo.get("profile");
        }
        if (userInfo.containsKey("organization")&& userInfo.get("organization")!=null) {
            this.organization = new Organization((Integer) userInfo.get("organization"));
        }
        if (userInfo.containsKey("position")&& userInfo.get("position")!=null) {
            this.position = new Position((Integer) userInfo.get("position"));
        }
        if (userInfo.containsKey("area")&& userInfo.get("area")!=null) {
            this.area = new Area((Integer) userInfo.get("area"));
        }
        if (userInfo.containsKey("businessRole")&& userInfo.get("businessRole")!=null) {
            this.businessRole = new BusinessRole((Integer) userInfo.get("businessRole"));
        }
        if (userInfo.containsKey("role")&& userInfo.get("role")!=null) {
            this.role = Role.valueOf((String) userInfo.get("role"));
        }

    }


    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public com.masoud.bpms.Model.Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @JsonIgnore
    public void hashPassword() {
        if (this.password != null) {
            this.password = Password.hashPassword(this.password);
        }
    }

    public boolean checkPassword(String inputPassword) {
        return Password.checkPassword(inputPassword, this.password);
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFamily() {
        return family;
    }

    public void setFamily(String family) {
        this.family = family;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    public BusinessRole getBusinessRole() {
        return businessRole;
    }

    public void setBusinessRole(BusinessRole businessRole) {
        this.businessRole = businessRole;
    }

    public Boolean getEnable() {
        return enable;
    }

    public void setEnable(Boolean enable) {
        this.enable = enable;
    }

    @JsonIgnore
    public Claims toClaims() {

        Claims claims = Jwts.claims();
        claims.put("role", this.getRole());
        claims.put("username", this.getUsername());
        claims.put("name", this.getName());
        claims.put("family", this.getFamily());
        claims.put("profile", this.getProfile());
        claims.put("userId", this.getID());

        return claims;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", family='" + family + '\'' +
                ", role=" + role +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
