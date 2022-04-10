package com.gaussianwonder.foodpanda.auth;

import com.gaussianwonder.foodpanda.auth.jwt.TokenService;
import com.gaussianwonder.foodpanda.models.user.User;
import com.gaussianwonder.foodpanda.models.user.UserRepo;
import com.gaussianwonder.foodpanda.util.Hash;
import com.google.common.collect.ImmutableMap;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static lombok.AccessLevel.PRIVATE;

@Service
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class AuthService implements TokenAuth {
    TokenService tokenService;
    UserRepo userRepo;

    @Autowired
    public AuthService(TokenService tokenService, UserRepo userRepo) {
        this.tokenService = tokenService;
        this.userRepo = userRepo;
    }

    @Override
    public Optional<String> login(final String username, final String password) {
        return userRepo
                .findByUsername(username)
                .filter(user -> Hash.bcryptMatch(password, user.getPassword()))
                .map(user -> tokenService.newToken(
                        ImmutableMap.of("username", username, "id", user.getId().toString())
                ));
    }

    @Override
    public Optional<User> findByToken(final String token) {
        return Optional
                .of(tokenService.verify(token))
                .map(map -> map.get("username"))
                .flatMap(userRepo::findByUsername);
    }

    @Override
    public void logout(final User user) {
        // TODO invalidate user session data (which do not currently exist)
    }

    public static Optional<User> getAuthed() {
        try {
            Authentication authentication = SecurityContextHolder
                    .getContext()
                    .getAuthentication();
            Object principal = authentication.getPrincipal();
            if (authentication.isAuthenticated() && principal instanceof User) {
                return Optional.of((User) principal);
            }
        } catch (Throwable t) {
            t.printStackTrace();
        }
        return Optional.empty();
    }

    public static Optional<Long> getAuthedId() {
        return getAuthed().map(User::getId);
    }
}
