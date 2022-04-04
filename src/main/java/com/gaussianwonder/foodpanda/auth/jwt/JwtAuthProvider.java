package com.gaussianwonder.foodpanda.auth.jwt;

import com.gaussianwonder.foodpanda.auth.TokenAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class JwtAuthProvider extends AbstractUserDetailsAuthenticationProvider {
    TokenAuth auth;

    @Autowired
    public JwtAuthProvider(
            TokenAuth auth
    ) {
        this.auth = auth;
    }

    @Override
    protected void additionalAuthenticationChecks(final UserDetails d, final UsernamePasswordAuthenticationToken auth) {
        // Can additionally perform checks on
        // d.getAuthorities()
        // d.getUsername()
    }

    @Override
    protected UserDetails retrieveUser(final String username, final UsernamePasswordAuthenticationToken authentication) {
        final Object token = authentication.getCredentials();
        return Optional.ofNullable(token)
                .map(String::valueOf)
                .flatMap(auth::findByToken)
                .orElseThrow(() -> new UsernameNotFoundException("Couldn't find user: " + token));
    }
}
