package demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlashcardQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String front;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String back;
    private LocalDateTime createdAt;
    @ManyToOne
    private Flashcard flashcard;

    public static FlashcardQuestion createFCQuestion(Flashcard flashcard, String front, String back) {
        FlashcardQuestion question = new FlashcardQuestion();

        question.setFlashcard(flashcard);
        question.setFront(front);
        question.setBack(back);

        return question;
    }
}
