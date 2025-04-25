package demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MultipleChoice {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;
    @Column(nullable = false, columnDefinition = "VARCHAR(255)")
    private String title;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime lastUpdatedAt = LocalDateTime.now();

    @ManyToOne
    private User uploader;
    @OneToMany(mappedBy = "multipleChoice", cascade = CascadeType.ALL, orphanRemoval = true)
    List<MultipleChoiceQuestion> questions;

    public static MultipleChoice createMultipleChoice(User uploader, String title) {
        MultipleChoice multipleChoice = new MultipleChoice();

        multipleChoice.setUploader(uploader);
        multipleChoice.setTitle(title);

        return multipleChoice;
    }
}
