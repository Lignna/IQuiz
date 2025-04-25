package demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MultipleChoiceOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String answer;
    private LocalDateTime createdAt = LocalDateTime.now();
    @ManyToOne
    private MultipleChoiceQuestion multipleChoiceQuestion;

    public static MultipleChoiceOption createMCOption(MultipleChoiceQuestion multipleChoiceQuestion, String answer) {
        MultipleChoiceOption option = new MultipleChoiceOption();

        option.setMultipleChoiceQuestion(multipleChoiceQuestion);
        option.setAnswer(answer);

        return option;
    }
}
