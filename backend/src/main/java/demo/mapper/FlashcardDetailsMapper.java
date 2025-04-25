package demo.mapper;

import demo.dto.FlashcardDetailsDTO;
import demo.dto.FlashcardQuestionDTO;
import demo.model.Flashcard;
import demo.model.FlashcardQuestion;

import java.util.ArrayList;
import java.util.List;

public class FlashcardDetailsMapper {
    public static FlashcardDetailsDTO toDTO(Flashcard flashcard) {
        FlashcardDetailsDTO dto = new FlashcardDetailsDTO();

        dto.setUuid(flashcard.getUuid().toString());
        dto.setTitle(flashcard.getTitle());
        dto.setCreatedAt(flashcard.getCreatedAt());
        dto.setLastUpdatedAt(flashcard.getLastUpdatedAt());

        List<FlashcardQuestionDTO> questionDTOS = new ArrayList<>();
        List<FlashcardQuestion> questions = flashcard.getQuestions();
        for (FlashcardQuestion question : questions) {
            questionDTOS.add(FlashcardQuestionMapper.toDTO(question));
        }

        dto.setQuestions(questionDTOS);

        return dto;
    }
}
