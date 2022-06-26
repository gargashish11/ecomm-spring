package com.ashish.ecomm.common.controllers;

import com.ashish.ecomm.common.entities.Role;
import com.ashish.ecomm.common.entities.User;
import com.ashish.ecomm.common.services.RoleService;
import com.ashish.ecomm.common.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping("/users")
    public String listUsers(Model model) {
        List<User> listUsers = userService.listUsers();
        model.addAttribute("listUsers", listUsers);
        return "users";
    }

    @GetMapping("/users/new")
    public String createUser(Model model) {
        User user = new User();
        List<Role> roleList = roleService.listRoles();
        model.addAttribute("user", user);
        model.addAttribute("roleList", roleList);
        return "user_form";
    }

    @PostMapping("/users/save")
    public String saveUser(User user) {
        System.out.println(user);
        return "redirect:/users";
    }
}
