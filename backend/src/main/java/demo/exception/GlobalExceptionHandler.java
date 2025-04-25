package demo.exception;

import demo.response.RestResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map> handleUserNotFound(UserNotFoundException e) {
        return ResponseEntity.ok(RestResponse.failure(e.getMessage()).toMap());
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<Map> handleInvalidPasswordException(InvalidPasswordException e) {
        return ResponseEntity.ok(RestResponse.failure(e.getMessage()).toMap());
    }

    @ExceptionHandler(InvalidUsernameException.class)
    public ResponseEntity<Map> handleInvalidUsernameException(InvalidUsernameException e) {
        return ResponseEntity.ok(RestResponse.failure(e.getMessage()).toMap());
    }

    @ExceptionHandler(QuizNotFoundException.class)
    public ResponseEntity<Map> handleQuizNotFoundException(QuizNotFoundException e) {
        return ResponseEntity.ok(RestResponse.failure(e.getMessage()).toMap());
    }

    @ExceptionHandler(QuizAccessDeniedException.class)
    public ResponseEntity<Map> handleQuizAccessDeniedException(QuizAccessDeniedException e) {
        return ResponseEntity.ok(RestResponse.failure(e.getMessage()).toMap());
    }

    @ExceptionHandler(QuestionNotFoundException.class)
    public ResponseEntity<Map> handleQuestionNotFoundException(QuestionNotFoundException e) {
        return ResponseEntity.ok(RestResponse.failure(e.getMessage()).toMap());
    }
}