package demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlashcardOverviewDTO {
    private String uuid;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdatedAt;
    private int questionCount;
}
