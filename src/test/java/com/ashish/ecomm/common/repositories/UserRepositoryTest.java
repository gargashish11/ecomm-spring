package com.ashish.ecomm.common.repositories;

import com.ashish.ecomm.common.entities.Role;
import com.ashish.ecomm.common.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(value = false)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void createUserTest() {

    }

    @Test
    public void createNewUserWithTworolesTest(){
        User user1 = new User("ABC","XYZ","abc@xyz.com","abc2020");
        Role roleEditor = new Role(3);
        Role roleAssistant = new Role(5);

        user1.addRole(roleEditor);
        user1.addRole(roleAssistant);
        User savedUser = userRepository.save(user1);
        assertThat(savedUser.getId()).isGreaterThan(0);

    }

    @Test
    public void listAllUsersTest() {
        Iterable<User> listUsers = userRepository.findAll();
        listUsers.forEach(System.out::println);
    }

    @Test
    public void updateUserroleTest() {
        User user1 = userRepository.findById(24).get();
        Role roleEditor = new Role(3);
        Role roleSalesPerson = new Role(2);
        user1.getRoles().remove(roleEditor);
        user1.addRole(roleSalesPerson);
        userRepository.save(user1);
    }

    @Test
    public void deleteUserTest() {
        Integer userId =24;
        userRepository.deleteById(userId);
    }
}
