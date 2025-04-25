package demo.controller;

import demo.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/sign-in")
    public ResponseEntity<Map> handleSignIn(
            @RequestBody Map<String, String> credential,
            HttpSession session,
            HttpServletResponse response
    ) {
        String username = credential.get("username");
        String password = credential.get("password");

        return ResponseEntity.ok(authService.signIn(response, session, username, password).toMap());
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Map> handleSignUp(
            @RequestBody Map<String, String> credential,
            HttpSession session,
            HttpServletResponse response
    ) {
        String username = credential.get("username");
        String password = credential.get("password");

        return ResponseEntity.ok(authService.signUp(response, session, username, password).toMap());
    }

    @PostMapping("/logout")
    public ResponseEntity<Map> handleLogout(
            HttpSession session
    ) {
        return ResponseEntity.ok(authService.logout(session).toMap());
    }

    @PutMapping("/password/reset")
    public ResponseEntity<Map> resetPassword(
            @RequestBody Map<String, String> credential
    ) {
        String username = credential.get("username");
        String newPassword = credential.get("newPassword");

        return ResponseEntity.ok(authService.resetPassword(username, newPassword).toMap());
    }

    @PutMapping("/password/change")
    public ResponseEntity<Map> changePassword(
            @RequestBody Map<String, String> credential,
            HttpSession session
            ) {
        String username = (String) credential.get("username");
        String newPassword = credential.get("newPassword");

        return ResponseEntity.ok(authService.changePassword(username, newPassword).toMap());
    }
}
