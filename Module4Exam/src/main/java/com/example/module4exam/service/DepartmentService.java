package com.example.module4exam.service;

import com.example.module4exam.model.Department;
import com.example.module4exam.repository.IDepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DepartmentService implements ICrudService<Department, Long>{
    @Autowired
    private IDepartmentRepository departmentRepository;

    public Department findByName(String name) {
        return departmentRepository.findByName(name);
    }

    @Override
    public Iterable<Department> findAll() {
        return departmentRepository.findAll();
    }

    @Override
    public Optional<Department> findById(Long aLong) {
        return departmentRepository.findById(aLong);
    }

    @Override
    public Department save(Department department) {
        return null;
    }

    @Override
    public void deleteById(Long aLong) {

    }
}
