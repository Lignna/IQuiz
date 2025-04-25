package demo.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MultipleChoiceQuestionDTO {
    private Long id;
    private String question;
    private String explanation;
    private LocalDateTime createdAt;
    private List<MultipleChoiceOptionDTO> options;
}
