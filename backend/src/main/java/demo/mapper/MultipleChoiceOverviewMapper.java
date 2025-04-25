package demo.mapper;

import demo.dto.MultipleChoiceOverviewDTO;
import demo.dto.MultipleChoiceQuestionDTO;
import demo.model.MultipleChoice;
import demo.model.MultipleChoiceQuestion;

public class MultipleChoiceOverviewMapper {
    public static MultipleChoiceOverviewDTO toDTO(MultipleChoice multipleChoice) {
        MultipleChoiceOverviewDTO dto = new MultipleChoiceOverviewDTO();

        dto.setUuid(multipleChoice.getUuid().toString());
        dto.setTitle(multipleChoice.getTitle());
        dto.setCreatedAt(multipleChoice.getCreatedAt());
        dto.setQuestionCount(multipleChoice.getQuestions().size());

        return dto;
    }
}
