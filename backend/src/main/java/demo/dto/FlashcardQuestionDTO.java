package demo.dto;

import demo.model.Flashcard;
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
public class FlashcardQuestionDTO {
    private Long id;
    private String front;
    private String back;
    private LocalDateTime createdAt = LocalDateTime.now();
}
