package com.example.module4exam.service;

import com.example.module4exam.model.Department;
import com.example.module4exam.model.Employee;

import com.example.module4exam.repository.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class EmployeeService implements ICrudService<Employee, Long> {
    @Autowired
    private IEmployeeRepository employeeRepository;


    @Override
    public Iterable<Employee> findAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> findById(Long aLong) {
        return employeeRepository.findById(aLong);
    }

    @Override
    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public void deleteById(Long aLong) {
        employeeRepository.deleteById(aLong);
    }
    public Iterable<Employee> sort(){
        return employeeRepository.findAllByOrderByAgeAsc();
    }
    public  Iterable<Employee> sortByDepartment(Long id){
        return employeeRepository.findAllByDepartment_Id(id);
    }
}
