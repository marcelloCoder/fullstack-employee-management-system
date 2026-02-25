package br.com.mcoder.ems.services.impl;

import br.com.mcoder.ems.dto.EmployeeDto;
import br.com.mcoder.ems.entities.Employee;
import br.com.mcoder.ems.mapper.EmployeeMapper;
import br.com.mcoder.ems.repositories.EmployeeRepository;
import br.com.mcoder.ems.services.EmployeeService;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        return null;
    }
}
