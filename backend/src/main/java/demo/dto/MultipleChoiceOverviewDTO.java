package demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MultipleChoiceOverviewDTO {
    private String uuid;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdatedAt;
    private int questionCount;
}
