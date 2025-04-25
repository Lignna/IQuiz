package demo.exception;

import demo.enums.QuizType;

import java.util.UUID;

public class QuestionNotFoundException extends RuntimeException {
    public QuestionNotFoundException(QuizType quizType, long id) {
        super(String.format("Câu hỏi ID %d không tồn tại", id));
    }
}
