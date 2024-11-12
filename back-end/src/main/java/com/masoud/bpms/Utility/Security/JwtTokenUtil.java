package com.masoud.bpms.Utility.Security;

import com.masoud.bpms.Model.Organization.User;
import com.masoud.bpms.Utility.Security.Model.JwtUser;
import com.masoud.bpms.Utility.Security.Service.JwtUserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenUtil {

    @Value("${jwt.signingkey}")
    private static String signingKey = "";

    @Autowired
    private static JwtUserService service;
    private static final String USER_NAME_KEY = "";
    private static final String PASSWORD = "";
    private static final String ROLE = "role";
    private static final String ORGAN_ID = "organId";
    private static final long ONE_HOURS_MILLIS = 3600 * 10000000;
    private static final long TEN_MINUTE_MILLIS = 600 * 1000;

    public static String getUserNameFromToken(String token) {
        Claims claims = getTokenClaims(token);
        return (String) claims.get("username");
    }

    public static Claims getTokenClaims(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(signingKey)
                .parseClaimsJws(token)
                .getBody();
        return claims;
    }

    public static String generateToken(User user) {
        return Jwts.builder()
                .setClaims(user.toClaims())
                .signWith(SignatureAlgorithm.HS512, signingKey)
                .setExpiration(new Date(System.currentTimeMillis() + ONE_HOURS_MILLIS))
                .compact();
    }


    private static Date getExpirationDateFromToken(String token) {
        Date expiration;
        try {
            final Claims claims = getTokenClaims(token);
            expiration = claims.getExpiration();
        } catch (Exception e) {
            expiration = null;
        }
        return expiration;
    }

    public static Boolean validateToken(String token, UserDetails userDetails) {

        JwtUser user = (JwtUser) userDetails;
        final String username = getUserNameFromToken(token);
        final Date expiration = getExpirationDateFromToken(token);

        return (
                username.equals(user.getUsername())
                        && !isTokenExpired(token));
    }

    private static Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
}
