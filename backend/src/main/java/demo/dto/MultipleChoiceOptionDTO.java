package demo.dto;

import demo.model.MultipleChoiceQuestion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MultipleChoiceOptionDTO {
    private Long id;
    private String answer;
    private LocalDateTime createdAt;
    private boolean isCorrect;
}
