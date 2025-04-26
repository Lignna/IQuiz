package demo.controller;


import demo.model.MultipleChoice;
import demo.repository.MultipleChoiceRepository;
import demo.service.FlashcardService;
import demo.service.MultipleChoiceService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/multiple-choices")
public class MultipleChoiceController {
    @Autowired
    MultipleChoiceService multipleChoiceService;

    @GetMapping("/{uuid}")
    public ResponseEntity<Map<String, Object>> takeQuiz(
            @PathVariable(name = "uuid") UUID uuid,
            HttpSession session
    ) {
        return ResponseEntity.ok(multipleChoiceService.takeQuiz(session, uuid).toMap());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createQuiz(
            @RequestBody Map<String, Object> data,
            HttpSession session
    ) {
        String title = (String) data.get("title");
        String explanation = (String) data.get("explanation");
        List<Map<String, Object>> questions = (List<Map<String, Object>>) data.get("questions");

        return ResponseEntity.ok(multipleChoiceService.createQuiz(session, title, questions, explanation).toMap());
    }

    @PutMapping("/{uuid}")
    public ResponseEntity<Map<String, Object>> updateQUiz(
            @PathVariable(name = "uuid") UUID uuid,
            @RequestBody Map<String, Object> data,
            HttpSession session
    ) {
        String title = (String) data.get("title");
        List<Map<String, Object>> questions = (List<Map<String, Object>>) data.get("questions");

        return ResponseEntity.ok(multipleChoiceService.updateQuiz(session, uuid, title, questions).toMap());
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Map<String, Object>> deleteQuiz(
            @PathVariable(name = "uuid") UUID uuid,
            HttpSession session
    ) {
        return ResponseEntity.ok(multipleChoiceService.deleteQuiz(session, uuid).toMap());
    }
}
