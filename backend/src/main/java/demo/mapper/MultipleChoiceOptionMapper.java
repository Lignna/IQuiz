package demo.mapper;

import demo.dto.MultipleChoiceOptionDTO;
import demo.model.MultipleChoiceOption;

public class MultipleChoiceOptionMapper {
    public static MultipleChoiceOptionDTO toDTO(MultipleChoiceOption multipleChoiceOption) {
        MultipleChoiceOptionDTO dto = new MultipleChoiceOptionDTO();

        dto.setId(multipleChoiceOption.getId());
        dto.setAnswer(multipleChoiceOption.getAnswer());

        return dto;
    }
}
