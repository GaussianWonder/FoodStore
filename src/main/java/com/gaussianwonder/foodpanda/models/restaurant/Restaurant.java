package com.gaussianwonder.foodpanda.models.restaurant;

import com.gaussianwonder.foodpanda.models.food.Food;
import com.gaussianwonder.foodpanda.models.user.User;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id @GeneratedValue(strategy = GenerationType.AUTO) Long id;

    @Column(nullable = false) String name;

    @OneToOne()
    @JoinColumn(name = "user_id")
    User user;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    List<Food> foodList;

    public Restaurant() {}
    public Restaurant(String name) {
        this.name = name;
    }
}
