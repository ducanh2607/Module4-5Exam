package com.example.module4exam.repository;

import com.example.module4exam.model.Department;
import com.example.module4exam.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEmployeeRepository extends JpaRepository<Employee, Long> {
    Iterable<Employee> findAllByOrderByAgeAsc();
    Iterable<Employee> findAllByDepartment_Id(Long id);
}
