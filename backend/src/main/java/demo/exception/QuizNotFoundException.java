package demo.exception;

import demo.enums.QuizType;

import java.util.UUID;

public class QuizNotFoundException extends RuntimeException{
    public QuizNotFoundException(QuizType quizType, UUID uuid) {
        super(switch (quizType) {
            case FLASHCARD -> String.format("Flashcard %s does not exist", uuid.toString());
            case MULTIPLE_CHOICE -> String.format("Multiple choice %s does not exist", uuid.toString());
        });
    }
}
