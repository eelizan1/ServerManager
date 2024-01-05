package io.getarrays.server.service;

import io.getarrays.server.model.Server;

import java.io.IOException;
import java.util.Collection;

public interface ServerService {
    // saves server to db
    Server create(Server server);
    Server ping(String ipAddress) throws IOException;
    // returns first servers up to limit
    Collection<Server> list(int limit);
    Server get(long Id);
    Server update(Server server);
    Boolean delete(Long id);
}
