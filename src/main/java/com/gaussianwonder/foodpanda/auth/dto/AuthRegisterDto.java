package com.gaussianwonder.foodpanda.auth.dto;

public class AuthRegisterDto extends AuthDto {
    boolean restaurantOwner;

    public AuthRegisterDto(String username, String password, boolean restaurantOwner) {
        super(username, password);
        this.restaurantOwner = restaurantOwner;
    }

    public boolean isRestaurantOwner() {
        return restaurantOwner;
    }

    public void setRestaurantOwner(boolean restaurantOwner) {
        this.restaurantOwner = restaurantOwner;
    }
}
