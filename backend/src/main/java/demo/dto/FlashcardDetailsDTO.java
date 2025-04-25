package demo.dto;

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
public class FlashcardDetailsDTO {
    private String uuid;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdatedAt;
    private List<FlashcardQuestionDTO> questions;
}
