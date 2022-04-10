package com.gaussianwonder.foodpanda.auth.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class AuthDto {
    @NotEmpty(message = "The username cannot be empty")
    @Size(min = 1, max = 255, message = "Illegal amount of characters used for the username")
    String username;
    @NotEmpty(message = "The password cannot be empty")
    @Size(min = 8, max = 255, message = "The password needs at least 8 characters, and no more than 255.")
    String password;

    public AuthDto(String username, String password) {
        this.username = username;
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

    public void setPassword(String password) {
        this.password = password;
    }
}
