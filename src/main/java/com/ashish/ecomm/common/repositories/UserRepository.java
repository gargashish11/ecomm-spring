package com.ashish.ecomm.common.repositories;

import com.ashish.ecomm.common.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}
