package demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, columnDefinition = "VARCHAR(50)")
    private String username;
    @Column(nullable = false, columnDefinition = "VARCHAR(255)")
    private String password;
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    @OneToMany(mappedBy = "uploader", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Flashcard> flashcards;
    @OneToMany(mappedBy = "uploader", cascade = CascadeType.ALL, orphanRemoval = true)
    List<MultipleChoice> multipleChoices;

    public static User createUser(String username, String password) {
        User user = new User();

        user.setUsername(username);
        user.setPassword(password);

        return user;
    }

    @Override
    public boolean equals(Object obj) {
        User target = (User) obj;
        return id.equals(target.getId());
    }
}
