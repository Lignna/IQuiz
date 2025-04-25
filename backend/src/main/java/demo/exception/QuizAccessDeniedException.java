package demo.exception;

import demo.enums.QuizType;

import java.util.UUID;

public class QuizAccessDeniedException extends RuntimeException{
    public QuizAccessDeniedException(QuizType quizType, UUID uuid, String username) {
        super(switch (quizType) {
            case FLASHCARD -> String.format("Người dùng %s bị từ chối truy cập vào flashcard %s",username, uuid);
            case MULTIPLE_CHOICE -> String.format("Người dùng %s bị từ chối truy cập vào flashcard %s", username, uuid);
        });
    }
}
