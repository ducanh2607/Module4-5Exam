package com.example.module4exam.repository;

import com.example.module4exam.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IDepartmentRepository extends JpaRepository<Department, Long> {
    Department findByName(String name);
}
