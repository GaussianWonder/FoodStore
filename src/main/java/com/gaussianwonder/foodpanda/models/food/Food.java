package com.gaussianwonder.foodpanda.models.food;

import com.gaussianwonder.foodpanda.models.category.Category;
import com.gaussianwonder.foodpanda.models.order.Order;
import com.gaussianwonder.foodpanda.models.restaurant.Restaurant;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "foods")
public class Food {
    @Id @GeneratedValue(strategy = GenerationType.AUTO) Long id;

    @Column(nullable = false) String name;

    @Column(nullable = false) String description;

    @Column(nullable = false) Double price;

    @ManyToOne()
    @JoinColumn(name = "category_id")
    Category category;

    @ManyToMany(mappedBy = "foodList")
    List<Order> orderList;

    @ManyToOne()
    @JoinColumn(name = "restaurant_id")
    Restaurant restaurant;

    public Food() {}
    public Food(String name, String description, Double price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }
}
