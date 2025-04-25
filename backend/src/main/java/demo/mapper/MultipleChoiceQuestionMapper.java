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

        List<MultipleChoiceOptionDTO> optionDTOList = new ArrayList<>();
        List<MultipleChoiceOption> multipleChoiceOptions = multipleChoiceQuestion.getOptions();
        for (MultipleChoiceOption option : multipleChoiceOptions) {
            optionDTOList.add(MultipleChoiceOptionMapper.toDTO(option));
        }
        dto.setOptions(optionDTOList);

        return dto;
    }
}
