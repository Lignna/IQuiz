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
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MultipleChoiceQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, columnDefinition = "TEXT")
    private String question;
    @Column(columnDefinition = "TEXT")
    private String explanation;
    private LocalDateTime createdAt = LocalDateTime.now();
    @ManyToOne
    private MultipleChoice multipleChoice;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private MultipleChoiceOption correctOption;
    @OneToMany(mappedBy = "multipleChoiceQuestion", cascade = CascadeType.ALL, orphanRemoval = true)
    List<MultipleChoiceOption> options;

    public static MultipleChoiceQuestion createMCQuestion(MultipleChoice multipleChoice, String question, String explanation) {
        MultipleChoiceQuestion multipleChoiceQuestion = new MultipleChoiceQuestion();

        multipleChoiceQuestion.setMultipleChoice(multipleChoice);
        multipleChoiceQuestion.setQuestion(question);
        multipleChoiceQuestion.setExplanation(explanation);

        return multipleChoiceQuestion;
    }

    public void setCorrectOption(MultipleChoiceOption correctOption) {
        if (!options.contains(correctOption)) {
            throw new IllegalArgumentException("Correct option must be one of the available options.");
        }
        this.correctOption = correctOption;
    }
}
