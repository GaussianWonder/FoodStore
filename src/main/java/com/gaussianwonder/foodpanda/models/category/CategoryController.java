package com.gaussianwonder.foodpanda.models.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@Controller
@RestController
public class CategoryController {
    final CategoryService categoryService;

    @Autowired
    public CategoryController(
            CategoryService categoryService
    ) {
        this.categoryService = categoryService;
    }

    @RolesAllowed({"ADMIN", "USER"})
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {
        return new ResponseEntity<>(this.categoryService.all(), HttpStatus.OK);
    }
}
