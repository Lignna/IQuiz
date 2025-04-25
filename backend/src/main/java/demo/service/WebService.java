package demo.service;

import demo.dto.FlashcardOverviewDTO;
import demo.dto.MultipleChoiceOverviewDTO;
import demo.exception.UserNotFoundException;
import demo.mapper.FlashcardOverviewMapper;
import demo.mapper.MultipleChoiceOverviewMapper;
import demo.mapper.UserMapper;
import demo.model.Flashcard;
import demo.model.MultipleChoice;
import demo.model.User;
import demo.repository.FlashcardRepository;
import demo.repository.UserRepository;
import demo.response.RestResponse;
import demo.utils.AuthUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WebService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    FlashcardRepository flashcardRepository;
    @Autowired
    FlashcardService flashcardService;

    @Transactional
    public RestResponse getDashboardData(HttpSession session) {
        User user = AuthUtil.getUserFromSession(userRepository, session);
        Map<String, Object> data = new HashMap<>();
        List<FlashcardOverviewDTO> flashcardOverviewDTOS = new ArrayList<>();
        List<MultipleChoiceOverviewDTO> multipleChoiceOverviewDTOS = new ArrayList<>();
        List<Flashcard> flashcards = user.getFlashcards();
        List<MultipleChoice> multipleChoices = user.getMultipleChoices();

        for (Flashcard flashcard : flashcards)
            flashcardOverviewDTOS.add(FlashcardOverviewMapper.toDTO(flashcard));
        for (MultipleChoice multipleChoice : multipleChoices)
            multipleChoiceOverviewDTOS.add(MultipleChoiceOverviewMapper.toDTO(multipleChoice));

        data.put("user", UserMapper.toDTO(user));
        data.put("flashcards", flashcardOverviewDTOS);
        data.put("multipleChoices", multipleChoiceOverviewDTOS);

        return RestResponse.success(data);
    }
}
