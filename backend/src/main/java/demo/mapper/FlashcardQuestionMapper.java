package demo.mapper;

import demo.dto.FlashcardQuestionDTO;
import demo.model.FlashcardQuestion;

public class FlashcardQuestionMapper {
    public static FlashcardQuestionDTO toDTO(FlashcardQuestion flashcardQuestion) {
        FlashcardQuestionDTO dto = new FlashcardQuestionDTO();

        dto.setId(flashcardQuestion.getId());
        dto.setFront(flashcardQuestion.getFront());
        dto.setBack(flashcardQuestion.getBack());
        dto.setCreatedAt(flashcardQuestion.getCreatedAt());

        return dto;
    }
}
