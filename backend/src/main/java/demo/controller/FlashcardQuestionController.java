package demo.controller;

import demo.service.FlashcardQuestionService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/flashcards/{uuid}")
public class FlashcardQuestionController {
    @Autowired
    FlashcardQuestionService flashcardQuestionService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createEmptyQuestion(
            @PathVariable(name = "uuid") UUID uuid,
            HttpSession session
        ) {
            return ResponseEntity.ok(flashcardQuestionService.createEmptyQuestion(session, uuid).toMap());
    }
}
