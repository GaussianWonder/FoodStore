package com.gaussianwonder.foodpanda.models.food.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

public class UpdateFoodDto {
    @NotNull(message = "The ID is mandatory")
    @Positive(message = "Invalid ID provided")
    Long id;

    @NotEmpty(message = "The food name cannot be empty")
    @Size(min = 1, max = 255, message = "The food name should contain between [1, 255] characters")
    String name;

    @NotEmpty(message = "The food description cannot be empty")
    @Size(min = 4, max = 255, message = "The food description should contain between [4, 255] characters")
    String description;

    @NotNull(message = "The price is mandatory")
    @Positive(message = "The price cannot be negative or 0")
    Double price;

    public UpdateFoodDto() {}
    public UpdateFoodDto(Long id, String name, String description, Double price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
