package com.gaussianwonder.foodpanda.auth.dto;

import com.gaussianwonder.foodpanda.models.user.User;

public class AuthResponseDto {
    String username;
    String token;
    boolean isAdmin;

    public AuthResponseDto(String username, boolean isAdmin, String token) {
        this.username = username;
        this.isAdmin = isAdmin;
        this.token = token;
    }

    public AuthResponseDto(User user, String token) {
        this.username = user.getUsername();
        this.isAdmin = user.isAdmin();
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
