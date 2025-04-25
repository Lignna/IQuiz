package demo.utils;

import demo.enums.QuizType;
import demo.exception.QuizAccessDeniedException;
import demo.model.Flashcard;
import demo.model.MultipleChoice;
import demo.model.User;
import demo.response.RestResponse;

public class QuizUtil {
    public static void validateFlashcardQuizUploader(User uploader, Flashcard flashcard) {
        if (!uploader.equals(flashcard.getUploader()))
            throw new QuizAccessDeniedException(QuizType.FLASHCARD, flashcard.getUuid(), uploader.getUsername());
    }

    public static void validateMultipleChoiceQuizUploader(User uploader, MultipleChoice multipleChoice) {
        if (!uploader.equals(multipleChoice.getUploader()))
            throw new QuizAccessDeniedException(QuizType.MULTIPLE_CHOICE, multipleChoice.getUuid(), uploader.getUsername());
    }
}
