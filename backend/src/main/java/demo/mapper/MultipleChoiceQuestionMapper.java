package demo.mapper;

import demo.dto.MultipleChoiceOptionDTO;
import demo.dto.MultipleChoiceQuestionDTO;
import demo.model.MultipleChoiceOption;
import demo.model.MultipleChoiceQuestion;

import java.util.ArrayList;
import java.util.List;

public class MultipleChoiceQuestionMapper {
    public static MultipleChoiceQuestionDTO toDTO(MultipleChoiceQuestion multipleChoiceQuestion) {
        MultipleChoiceQuestionDTO dto = new MultipleChoiceQuestionDTO();

        dto.setId(multipleChoiceQuestion.getId());
        dto.setQuestion(multipleChoiceQuestion.getQuestion());
        dto.setExplanation(multipleChoiceQuestion.getExplanation());
        dto.setCreatedAt(multipleChoiceQuestion.getCreatedAt());

        for (int i = 0; i < multipleChoiceQuestion.getOptions().size(); i++) {
            if (multipleChoiceQuestion.getCorrectOption().getId() == multipleChoiceQuestion.getOptions().get(i).getId()) {
                dto.setCorrectOptionIndex(i);
                break;
            }
        }

        List<String> optionDTOList = new ArrayList<>();
        List<MultipleChoiceOption> multipleChoiceOptions = multipleChoiceQuestion.getOptions();
        for (MultipleChoiceOption option : multipleChoiceOptions) {
            optionDTOList.add(option.getAnswer());
        }
        dto.setOptions(optionDTOList);

        return dto;
    }
}
