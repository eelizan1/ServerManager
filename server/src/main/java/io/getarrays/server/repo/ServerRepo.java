package io.getarrays.server.repo;

import io.getarrays.server.model.Server;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServerRepo extends JpaRepository<Server, Long> {
    // need to have "findBy" to tell JPA this is a select statement
    Server findByIpAddress(String ipAddress);
}
