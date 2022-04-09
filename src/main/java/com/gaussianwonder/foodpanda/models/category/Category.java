package com.gaussianwonder.foodpanda.models.category;

import com.gaussianwonder.foodpanda.models.food.Food;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;

    @Column(nullable = false) String name;

    @Column(nullable = false) String description;

    @OneToMany(mappedBy = "category", cascade = CascadeType.DETACH) List<Food> foods;

    public Category() {}
    public Category(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
