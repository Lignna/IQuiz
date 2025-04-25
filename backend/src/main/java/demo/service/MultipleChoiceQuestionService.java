package demo.service;

import demo.enums.QuizType;
import demo.exception.QuestionNotFoundException;
import demo.exception.QuizNotFoundException;
import demo.model.*;
import demo.repository.*;
import demo.response.RestResponse;
import demo.utils.AuthUtil;
import demo.utils.QuizUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class MultipleChoiceQuestionService {
    @Autowired
    MultipleChoiceQuestionRepository multipleChoiceQuestionRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    MultipleChoiceRepository multipleChoiceRepository;

    private MultipleChoice findQuizByUuid(UUID uuid) {
        return multipleChoiceRepository.findByUuid(uuid).orElseThrow(() -> new QuizNotFoundException(QuizType.MULTIPLE_CHOICE, uuid));
    }

    private MultipleChoiceQuestion findQuestionByUuid(long id) {
        return multipleChoiceQuestionRepository.findById(id).orElseThrow(() -> new QuestionNotFoundException(QuizType.MULTIPLE_CHOICE, id));
    }

    public RestResponse createEmptyQuestion(HttpSession session, UUID uuid) {
        User uploader = AuthUtil.getUserFromSession(userRepository, session);
        MultipleChoice multipleChoice = findQuizByUuid(uuid);

        QuizUtil.validateMultipleChoiceQuizUploader(uploader, multipleChoice);

        MultipleChoiceQuestion question = MultipleChoiceQuestion.createMCQuestion(multipleChoice, "", "");
        MultipleChoiceQuestion savedQuestion = multipleChoiceQuestionRepository.save(question);

        return RestResponse.success(Map.of("id", savedQuestion.getId()));
    }

    public RestResponse updateQuestion(HttpSession session, long id, String question, String explanation, List<MultipleChoiceOption> options) {
        User uploader = AuthUtil.getUserFromSession(userRepository, session);
        MultipleChoiceQuestion multipleChoiceQuestion = findQuestionByUuid(id);
        MultipleChoice multipleChoice = multipleChoiceQuestion.getMultipleChoice();

        QuizUtil.validateMultipleChoiceQuizUploader(uploader, multipleChoice);

        multipleChoiceQuestion.setQuestion(question);
        multipleChoiceQuestion.setExplanation(explanation);
        multipleChoiceQuestion.setOptions(options);
        multipleChoiceQuestionRepository.save(multipleChoiceQuestion);

        return RestResponse.success();
    }

    public RestResponse deleteQuestion(HttpSession session, long id) {
        User uploader = AuthUtil.getUserFromSession(userRepository, session);
        MultipleChoiceQuestion multipleChoiceQuestion = findQuestionByUuid(id);
        MultipleChoice multipleChoice = multipleChoiceQuestion.getMultipleChoice();

        QuizUtil.validateMultipleChoiceQuizUploader(uploader, multipleChoice);

        multipleChoiceQuestionRepository.delete(multipleChoiceQuestion);
        return RestResponse.success();
    }
}
