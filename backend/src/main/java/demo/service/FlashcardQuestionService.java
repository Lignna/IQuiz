package demo.service;

import demo.enums.QuizType;
import demo.exception.QuestionNotFoundException;
import demo.exception.QuizNotFoundException;
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

import java.util.Map;
import java.util.UUID;

@Service
public class FlashcardQuestionService {
    @Autowired
    FlashcardQuestionRepository flashcardQuestionRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    FlashcardRepository flashcardRepository;

    private Flashcard findQuizByUuid(UUID uuid) {
        return flashcardRepository.findByUuid(uuid).orElseThrow(() -> new QuizNotFoundException(QuizType.FLASHCARD, uuid));
    }

    private FlashcardQuestion findQuestionByUuid(long id) {
        return flashcardQuestionRepository.findById(id).orElseThrow(() -> new  QuestionNotFoundException(QuizType.FLASHCARD, id));
    }

    public RestResponse createEmptyQuestion(HttpSession session, UUID uuid) {
        User uploader = AuthUtil.getUserFromSession(userRepository, session);
        Flashcard flashcard = findQuizByUuid(uuid);

        QuizUtil.validateFlashcardQuizUploader(uploader, flashcard);

        FlashcardQuestion flashcardQuestion = FlashcardQuestion.createFCQuestion(flashcard, "", "");
        FlashcardQuestion savedQuestion = flashcardQuestionRepository.save(flashcardQuestion);

        return RestResponse.success(Map.of("id", savedQuestion.getId()));
    }

    public RestResponse updateQuestion(HttpSession session, long id, String front, String back) {
        User uploader = AuthUtil.getUserFromSession(userRepository, session);
        FlashcardQuestion flashcardQuestion = findQuestionByUuid(id);
        Flashcard flashcard = flashcardQuestion.getFlashcard();

        QuizUtil.validateFlashcardQuizUploader(uploader, flashcard);

        flashcardQuestion.setFront(front);
        flashcardQuestion.setBack(back);
        flashcardQuestionRepository.save(flashcardQuestion);
        return RestResponse.success();
    }

    public RestResponse deleteQuestion(HttpSession session, long id) {
        User uploader = AuthUtil.getUserFromSession(userRepository, session);
        FlashcardQuestion flashcardQuestion = findQuestionByUuid(id);
        Flashcard flashcard = flashcardQuestion.getFlashcard();

        QuizUtil.validateFlashcardQuizUploader(uploader, flashcard);

        flashcardQuestionRepository.delete(flashcardQuestion);
        return RestResponse.success();
    }
}
