package nim.webrtc.api.service;

import nim.webrtc.api.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Map;

public interface IUserRepository extends CrudRepository<User, Integer> {

    User findByUsername(String username);
}