package com.gaussianwonder.foodpanda.auth;

import com.gaussianwonder.foodpanda.models.user.User;

import java.util.Optional;

public interface TokenAuth {
    Optional<String> login(String username, String password);
    Optional<User> findByToken(String token);
    void logout(User user);
}
