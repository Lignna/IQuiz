package demo.dto;

import demo.model.MultipleChoiceQuestion;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MultipleChoiceDetailsDTO {
    private String uuid;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdatedAt;
    private List<MultipleChoiceQuestionDTO> questions;
}