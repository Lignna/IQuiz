package demo.utils;

import demo.exception.InvalidPasswordException;
import demo.exception.InvalidUsernameException;
import demo.exception.UserNotFoundException;
import demo.model.User;
import demo.repository.UserRepository;
import jakarta.servlet.http.HttpSession;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Enumeration;

public class AuthUtil {
    public static String hashPassword(String password) {
        try {
            // Initialize SHA-256 MessageDigest instance
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            // Hash the password
            byte[] hashBytes = digest.digest(password.getBytes());

            // Encode the hash in Base64 for safe storage
            return Base64.getEncoder().encodeToString(hashBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    public static User getUserFromSession(UserRepository userRepository, HttpSession session) {
        String username = (String) session.getAttribute("username");
        System.out.println("username: " + username);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
        System.out.println("user: " + user.getUsername());
        return user;
    }

    public static void validatePassword(String password) {
        if (password.length() < 6)
            throw new InvalidPasswordException("Mật khẩu ít nhất 6 ký tự!");
        if (password.length() > 20)
            throw new InvalidPasswordException("Mật khẩu phải ít hơn 20 ký tự!");
        if (password.contains(" "))
            throw new InvalidPasswordException("Mật khẩu không được chứa dấu cách!");
    }

    public static void validateUsername(UserRepository userRepository, String username) {
        if (username.length() < 3)
            throw new InvalidUsernameException("Tên đăng nhập ít nhất 3 ký tự!");
        if (username.length() > 20)
            throw new InvalidUsernameException("Tên đăng nhập phải ít hơn 20 ký tự!");
        if (!username.matches("^[a-zA-Z0-9._]+$"))
            throw new InvalidUsernameException("Tên đăng nhập chỉ được phép chứa chữ, số, chấm (.) và gạch dưới (_)!");
        if (userRepository.existsByUsername(username))
            throw new InvalidUsernameException("Tên đăng nhập đã tồn tại!");
    }

    public static boolean verifyPassword(String originalPassword, String storedPasswordHash) {
        String hashedPassword = hashPassword(originalPassword);
        return hashedPassword.equals(storedPasswordHash);
    }
}
