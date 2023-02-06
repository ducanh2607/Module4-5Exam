package com.example.module4exam.controller;

import com.example.module4exam.model.Department;
import com.example.module4exam.model.Employee;
import com.example.module4exam.service.DepartmentService;
import com.example.module4exam.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employees")
@CrossOrigin("*")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DepartmentService departmentService;

    @GetMapping
    public ResponseEntity<Iterable<Employee>> findAll() {
        return new ResponseEntity<>(employeeService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> findById(@PathVariable Long id) {
        return new ResponseEntity<>(employeeService.findById(id).get(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> update(@RequestBody Employee employee, @PathVariable Long id) {
        Optional<Employee> employee1 = employeeService.findById(id);
        if (employee1.isPresent()) {
            return new ResponseEntity<>(employeeService.save(employee), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/create")
    public ResponseEntity<Employee> create(@RequestBody Employee employee){
        return new ResponseEntity<>(employeeService.save(employee), HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        employeeService.deleteById(id);
               return new ResponseEntity<>("Delete done!",HttpStatus.OK);
    }
    @GetMapping("/sort")
    public ResponseEntity<Iterable<Employee>> sort() {
        return new ResponseEntity<>(employeeService.sort(), HttpStatus.OK);
    }
    @GetMapping("/filter/{id}")
    public ResponseEntity<Iterable<Employee>> filter(@PathVariable Long id){
        return new ResponseEntity<>(employeeService.sortByDepartment(id), HttpStatus.OK);
    }

}
