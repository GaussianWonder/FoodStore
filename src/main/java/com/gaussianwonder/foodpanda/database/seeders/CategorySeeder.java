package com.gaussianwonder.foodpanda.database.seeders;

import com.gaussianwonder.foodpanda.models.category.Category;
import com.gaussianwonder.foodpanda.models.category.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

@Component
public class CategorySeeder implements CommandLineRunner {
    final CategoryRepo categoryRepo;

    @Autowired
    public CategorySeeder(
            CategoryRepo categoryRepo
    ) {
        this.categoryRepo = categoryRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        if (this.categoryRepo.count() == 0) {
            Collection<Category> categories = List.of(
                    new Category("Breakfast", "First meal of the day"),
                    new Category("Desert", "Sweet, sweet dessert"),
                    new Category("Grill", "Grilled food"),
                    new Category("Pasta", "Spagetti"),
                    new Category("Pizza", "Usually round"),
                    new Category("Salad", "Usually green"),
                    new Category("Soup", "Usually liquid")
            );
            this.categoryRepo.saveAllAndFlush(categories);
        }
    }
}
