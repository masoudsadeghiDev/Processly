package com.masoud.bpms.Utility.Security;

import com.masoud.bpms.Model.Organization.User;
import com.masoud.bpms.Utility.Security.Model.JwtUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by yaqub on 2/28/17.
 */
@Component
public class JwtUserFactory {
    public JwtUserFactory() {
    }

    public static JwtUser create(User user) {
        return new JwtUser(
                user.getUsername(),
                user.getPassword(),
                mapToGrantedAuthorities());
    }


    private static List<GrantedAuthority> mapToGrantedAuthorities() {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();


        grantedAuthorities.add(new SimpleGrantedAuthority("USER"));

        return grantedAuthorities;
    }
}
