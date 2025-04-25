package demo.mapper;

import demo.dto.MultipleChoiceDetailsDTO;
import demo.dto.MultipleChoiceQuestionDTO;
import demo.model.MultipleChoice;
import demo.model.MultipleChoiceQuestion;

import java.util.ArrayList;
import java.util.List;

public class MultipleChoiceDetailsMapper {
    public static MultipleChoiceDetailsDTO toDTO(MultipleChoice multipleChoice) {
        MultipleChoiceDetailsDTO dto = new MultipleChoiceDetailsDTO();

        dto.setUuid(multipleChoice.getUuid().toString());
        dto.setTitle(multipleChoice.getTitle());
        dto.setCreatedAt(multipleChoice.getCreatedAt());
        dto.setLastUpdatedAt(multipleChoice.getLastUpdatedAt());

        List<MultipleChoiceQuestionDTO> questionDTOS = new ArrayList<>();
        List<MultipleChoiceQuestion> questions = multipleChoice.getQuestions();
        for(MultipleChoiceQuestion question : questions) {
            questionDTOS.add(MultipleChoiceQuestionMapper.toDTO(question));
        }
        dto.setQuestions(questionDTOS);

        return dto;
    }
}
