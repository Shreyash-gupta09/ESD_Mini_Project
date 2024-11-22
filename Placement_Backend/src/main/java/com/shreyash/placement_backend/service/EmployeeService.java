package com.shreyash.placement_backend.service;

import com.shreyash.placement_backend.dto.LoginRequest;
import com.shreyash.placement_backend.entity.Employee;
import com.shreyash.placement_backend.helper.JWTHelper;
import com.shreyash.placement_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Service;

import static java.lang.String.format;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JWTHelper jwtHelper;

    public String login(LoginRequest request) {
        Employee employee = getEmail(request.email());

        // Directly compare the plaintext password
        if (!request.password().equals(employee.getPassword())) {
            return "Wrong Password or Email";
        }
        if (!"Outreach".equalsIgnoreCase(employee.getDepartment())) {
            return "Wrong Department";
        }
        // Generate and return JWT token if passwords match
        return jwtHelper.generateToken(request.email());
    }

    private Employee getEmail(String email) {
        return employeeRepository.findByEmail(email)
                .orElseThrow(() -> new ExpressionException(
                        format("Cannot Find Employee:: No Employee found with email: %s", email)
                ));
    }
}
