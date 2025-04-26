package demo.service;

import demo.enums.QuizType;
import demo.exception.QuizNotFoundException;
import demo.mapper.FlashcardDetailsMapper;
import demo.mapper.FlashcardOverviewMapper;
import demo.mapper.MultipleChoiceDetailsMapper;
import demo.mapper.MultipleChoiceOverviewMapper;
import demo.model.*;
import demo.repository.*;
import demo.response.RestResponse;
import demo.utils.AuthUtil;
import demo.utils.QuizUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class MultipleChoiceService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    MultipleChoiceRepository multipleChoiceRepository;
    @Autowired
    MultipleChoiceQuestionRepository multipleChoiceQuestionRepository;
    @Autowired
    MultipleChoiceOptionRepository multipleChoiceOptionRepository;

    private MultipleChoice findQuizByUuid(UUID uuid) {
        return multipleChoiceRepository.findByUuid(uuid).orElseThrow(() -> new QuizNotFoundException(QuizType.MULTIPLE_CHOICE, uuid));
    }

    public RestResponse takeQuiz(HttpSession session, UUID uuid) {
        User uploader = AuthUtil.getUserFromSession(userRepository, session);
        MultipleChoice multipleChoice = findQuizByUuid(uuid);

        QuizUtil.validateMultipleChoiceQuizUploader(uploader, multipleChoice);

        return RestResponse.success(MultipleChoiceDetailsMapper.toDTO(multipleChoice));
    }

    @Transactional
    public RestResponse createQuiz(HttpSession session, String title, List<Map<String, Object>> questions, String explanation) {
        User uploader = AuthUtil.getUserFromSession(userRepository, session);

        MultipleChoice multipleChoice = MultipleChoice.createMultipleChoice(uploader, title, explanation);
        MultipleChoice saveQuiz = multipleChoiceRepository.save(multipleChoice);

        for (Map<String, Object> item : questions) {
            String question = (String) item.get("question");
            MultipleChoiceQuestion multipleChoiceQuestion = MultipleChoiceQuestion.createMCQuestion(saveQuiz, question, null);
            MultipleChoiceQuestion savedQuestion = multipleChoiceQuestionRepository.save(multipleChoiceQuestion);

            List<String> options = (List<String>) item.get("options");
            int correctOptionIndex = (int) item.get("correctOptionIndex");

            for (int i = 0; i < options.size(); i++) {
                MultipleChoiceOption option = MultipleChoiceOption.createMCOption(savedQuestion, options.get(i).toString());
                MultipleChoiceOption savedOption = multipleChoiceOptionRepository.save(option);
                if (i == correctOptionIndex) {
                    if (!options.contains(savedOption.getAnswer())) {
                        throw new IllegalArgumentException("Correct option must be one of the available options.");
                    } else {
                        savedQuestion.setCorrectOption(savedOption);
                        multipleChoiceQuestionRepository.save(savedQuestion);
                    }
                }
            }
        }

        return RestResponse.success(Map.of("uuid", saveQuiz.getUuid()));
    }

    @Transactional
    public RestResponse updateQuiz(HttpSession session, UUID uuid, String title, List<Map<String, Object>> questions) {
        User uploader = AuthUtil.getUserFromSession(userRepository, session);
        MultipleChoice multipleChoice = findQuizByUuid(uuid);

        QuizUtil.validateMultipleChoiceQuizUploader(uploader, multipleChoice);

        multipleChoice.setTitle(title);



        multipleChoiceRepository.save(multipleChoice);
        return RestResponse.success();
    }

    @Transactional
    public RestResponse deleteQuiz(HttpSession session, UUID uuid) {
        User uploader = AuthUtil.getUserFromSession(userRepository, session);
        MultipleChoice multipleChoice = findQuizByUuid(uuid);

        QuizUtil.validateMultipleChoiceQuizUploader(uploader, multipleChoice);

        multipleChoiceRepository.delete(multipleChoice);
        return RestResponse.success();
    }
}
