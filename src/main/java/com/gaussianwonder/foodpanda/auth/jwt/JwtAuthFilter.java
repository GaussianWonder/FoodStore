package com.gaussianwonder.foodpanda.auth.jwt;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.google.common.net.HttpHeaders.AUTHORIZATION;
import static java.util.Optional.ofNullable;
import static org.apache.logging.log4j.util.Strings.isEmpty;

public class JwtAuthFilter extends AbstractAuthenticationProcessingFilter {
    public JwtAuthFilter(final RequestMatcher requiresAuth) {
        super(requiresAuth);
    }

    /**
     * Called when a secured resource is requested.
     */
    @Override
    public Authentication attemptAuthentication(
            final HttpServletRequest request,
            final HttpServletResponse response
    ) {
        final String param = ofNullable(request.getHeader(AUTHORIZATION))
                .orElse(request.getParameter("token"));

        final String token = ofNullable(param)
                .map(JwtAuthFilter::isolateToken)
                .map(String::trim)
                .orElseThrow(() -> new BadCredentialsException("No Token Found!"));

        final Authentication auth = new UsernamePasswordAuthenticationToken(token, token);
        return getAuthenticationManager()
                .authenticate(auth);
    }

    @Override
    protected void successfulAuthentication(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final FilterChain chain,
            final Authentication authResult
    ) throws IOException, ServletException {
        super.successfulAuthentication(request, response, chain, authResult);
        chain.doFilter(request, response);
    }

    public static String isolateToken(String str) {
        String remove = "Bearer";
        if (!isEmpty(str) && !isEmpty(remove)) {
            return str.startsWith(remove) ? str.substring(remove.length()) : str;
        } else {
            return str;
        }
    }
}
