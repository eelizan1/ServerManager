package io.getarrays.server.model;

import io.getarrays.server.enumeration.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.AUTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Server {
    @Id // denote as primary key in database
    @GeneratedValue(strategy = AUTO) // auto generate id for each server row instance
    private Long id;
    @Column(unique = true) // puts a constraint on the ip address so that we can't have more than one
    @NotEmpty(message = "IP Address can't be empty or NULL")
    private String ipAddress;
    private String name;
    private String memory;
    private String type;
    private String imageUrl;
    private Status status;
}
