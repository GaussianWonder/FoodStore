package com.gaussianwonder.foodpanda.models.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    final CategoryRepo categoryRepo;

    @Autowired
    public CategoryService(
            CategoryRepo categoryRepo
    ) {
        this.categoryRepo = categoryRepo;
    }

    public List<Category> all() {
        return this.categoryRepo.findAll();
    }

    public Optional<Category> findId(Long id) {
        return this.categoryRepo.findById(id);
    }

    public Category updateComputed(Category category) {
        return this.categoryRepo.save(category);
    }
}
