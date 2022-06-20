package com.ashish.ecomm.common.services;

import com.ashish.ecomm.common.entities.Role;
import com.ashish.ecomm.common.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public List<Role> listRoles() {
        return (List<Role>) roleRepository.findAll();
    }
}
