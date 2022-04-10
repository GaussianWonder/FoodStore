package com.gaussianwonder.foodpanda.models.restaurant.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class UpdateRestaurantDto extends RestaurantDto {
    @NotNull(message = "ID cannot be null")
    @Positive(message = "Invalid ID")
    Long id;

    public UpdateRestaurantDto() {}
    public UpdateRestaurantDto(Long id, String name) {
        super(name);
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
