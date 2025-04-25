package demo.controller;

import demo.model.MultipleChoiceQuestion;
import demo.service.FlashcardQuestionService;
import demo.service.MultipleChoiceQuestionService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/multiple-choices/{uuid}")
public class MultipleChoiceQuestionController {
    @Autowired
    MultipleChoiceQuestionService multipleChoiceQuestionService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createEmptyQuestion(
            @PathVariable(name = "uuid") UUID uuid,
            HttpSession session
    ) {
        return ResponseEntity.ok(multipleChoiceQuestionService.createEmptyQuestion(session, uuid).toMap());
    }
}

