package demo.controller;

import demo.model.User;
import demo.service.WebService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class WebController {
    @Autowired
    WebService webService;

    @GetMapping("/home")
    public ResponseEntity<Map<String, Object>> getDashboardData(HttpSession session) {
        return ResponseEntity.ok(webService.getDashboardData(session).toMap());
    }

    @GetMapping("/connection/check")
    public ResponseEntity<Map<String, Object>> checkConnection() {
        return ResponseEntity.ok().body(null);
    }
}
