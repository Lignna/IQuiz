package demo.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String username) {
        super(String.format("Người dùng %s không tồn tại", username));
    }
}