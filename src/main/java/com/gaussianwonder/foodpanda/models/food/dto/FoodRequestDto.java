package com.gaussianwonder.foodpanda.models.food.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class FoodRequestDto {
    @NotNull(message = "ID cannot be null")
    @Positive(message = "Invalid ID")
    Long id;

    public FoodRequestDto(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
