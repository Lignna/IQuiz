package demo.mapper;

import demo.dto.FlashcardOverviewDTO;
import demo.model.Flashcard;

public class FlashcardOverviewMapper {
    public static FlashcardOverviewDTO toDTO(Flashcard flashcard) {
        FlashcardOverviewDTO dto = new FlashcardOverviewDTO();

        dto.setUuid(flashcard.getUuid().toString());
        dto.setTitle(flashcard.getTitle());
        if (flashcard.getQuestions() == null)
            dto.setQuestionCount(0);
        else
            dto.setQuestionCount(flashcard.getQuestions().size());
        dto.setCreatedAt(flashcard.getCreatedAt());
        dto.setLastUpdatedAt(flashcard.getLastUpdatedAt());

        return dto;
    }
}
