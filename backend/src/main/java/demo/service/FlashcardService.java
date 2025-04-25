package demo.service;

import demo.enums.QuizType;
import demo.exception.QuizNotFoundException;
import demo.mapper.FlashcardDetailsMapper;
import demo.mapper.FlashcardOverviewMapper;
import demo.model.Flashcard;
import demo.model.FlashcardQuestion;
import demo.model.User;
import demo.repository.FlashcardQuestionRepository;
import demo.repository.FlashcardRepository;
import demo.repository.UserRepository;
import demo.response.RestResponse;
import demo.utils.AuthUtil;
import demo.utils.QuizUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class FlashcardService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    FlashcardRepository flashcardRepository;
    @Autowired
    FlashcardQuestionRepository flashcardQuestionRepository;
    private Flashcard findQuizByUuid(UUID uuid) {
        return flashcardRepository.findByUuid(uuid).orElseThrow(() -> new QuizNotFoundException(QuizType.FLASHCARD, uuid));
    }

    public RestResponse getQuiz(HttpSession session, UUID uuid) {
        User uploader = AuthUtil.getUserFromSession(userRepository, session);
        Flashcard flashcard = findQuizByUuid(uuid);

        QuizUtil.validateFlashcardQuizUploader(uploader, flashcard);

        return RestResponse.success(FlashcardDetailsMapper.toDTO(flashcard));
    }

    @Transactional
    public RestResponse createQuiz(HttpSession session, String title, List<Map<String, String>> questions) {
        User uploader = AuthUtil.getUserFromSession(userRepository, session);

        Flashcard flashcard = Flashcard.createFlashcard(uploader, title);
        Flashcard savedQuiz = flashcardRepository.save(flashcard);

        for (Map<String, String> questionData : questions) {
            String front = questionData.get("front");
            String back = questionData.get("back");
            FlashcardQuestion question = FlashcardQuestion.createFCQuestion(flashcard, front, back);
            flashcardQuestionRepository.save(question);
        }

        return RestResponse.success(FlashcardOverviewMapper.toDTO(savedQuiz));
    }

    @Transactional
    public RestResponse updateQuiz(HttpSession session, UUID uuid, String title, List<Map<String, Object>> questions) {
        User uploader = AuthUtil.getUserFromSession(userRepository, session);
        Flashcard flashcard = flashcardRepository.findByUuid(uuid).orElseThrow(() -> new QuizNotFoundException(QuizType.FLASHCARD, uuid));

        QuizUtil.validateFlashcardQuizUploader(uploader, flashcard);

        flashcard.setTitle(title);
        Flashcard savedFlashcard = flashcardRepository.save(flashcard);

        List<Long> updatedIds = new ArrayList<>();

        for (Map<String, Object> questionData : questions) {
            Number idNumber = (Number) questionData.get("id");
            Long id = idNumber.longValue();
            updatedIds.add(id);
            String front = (String) questionData.get("front");
            String back = (String) questionData.get("back");

            FlashcardQuestion question = flashcardQuestionRepository.findById(id).orElse(null);
            if (question != null) {
                question.setFront(front);
                question.setBack(back);
                flashcardQuestionRepository.save(question);
            }
        }

        flashcard.getQuestions().removeIf(q -> !updatedIds.contains(q.getId()));
        flashcardRepository.save(flashcard);

        return RestResponse.success();
    }

    @Transactional
    public RestResponse deleteQuiz(HttpSession session, UUID uuid) {
        User uploader = AuthUtil.getUserFromSession(userRepository, session);
        Flashcard flashcard = flashcardRepository.findByUuid(uuid).orElseThrow(() -> new QuizNotFoundException(QuizType.FLASHCARD, uuid));

        QuizUtil.validateFlashcardQuizUploader(uploader, flashcard);

        flashcardRepository.delete(flashcard);
        return RestResponse.success();
    }
}
