package demo.controller;

import demo.service.FlashcardService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/flashcards")
public class FlashcardController {
    @Autowired
    FlashcardService flashcardService;

    @GetMapping("/{uuid}")
    public ResponseEntity<Map<String, Object>> getQuiz(
            @PathVariable(name = "uuid") UUID uuid,
            HttpSession session
    ) {
            return ResponseEntity.ok(flashcardService.getQuiz(session, uuid).toMap());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createQuiz(
            @RequestBody Map<String, Object> data, // Updated to accept complex objects like List
            HttpSession session
    ) {
        String title = (String) data.get("title");
        List<Map<String, String>> questions = (List<Map<String, String>>) data.get("questions");

        // Pass the processed data to your service layer
        return ResponseEntity.ok(flashcardService.createQuiz(session, title, questions).toMap());
    }


    @PutMapping("/{uuid}")
    public ResponseEntity<Map<String, Object>> updateQuiz(
            @PathVariable(name = "uuid") UUID uuid,
            @RequestBody Map<String, Object> data,
            HttpSession session
    ) {
        String title = (String) data.get("title");
        List<Map<String, Object>> questions = (List<Map<String, Object>>) data.get("questions");

        return ResponseEntity.ok(flashcardService.updateQuiz(session, uuid, title, questions).toMap());
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Map<String, Object>> deleteQuiz(
        @PathVariable(name = "uuid") UUID uuid,
        HttpSession session
    ) {
        return ResponseEntity.ok(flashcardService.deleteQuiz(session, uuid).toMap());
    }
}
