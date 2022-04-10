package com.gaussianwonder.foodpanda.models.restaurant.dto;

import com.gaussianwonder.foodpanda.models.restaurant.Restaurant;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class RestaurantDto {
    @NotEmpty(message = "The restaurant name cannot be empty")
    @Size(min = 4, max = 255, message = "The name should contain between [4, 255] characters")
    String name;

    public RestaurantDto() {}
    public RestaurantDto(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
