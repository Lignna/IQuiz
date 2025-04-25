package demo.exception;

public class InvalidUsernameException extends RuntimeException {
    public InvalidUsernameException(String msg) {
        super(msg);
    }
}
