package demo.service;

import demo.exception.UserNotFoundException;
import demo.model.User;
import demo.repository.UserRepository;
import demo.response.RestResponse;
import demo.utils.AuthUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class AuthService {
    @Autowired
    UserRepository userRepository;

    public RestResponse signIn(HttpServletResponse response, HttpSession session, String username, String password) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException((username)));
        String userPass = user.getPassword();
        if (AuthUtil.verifyPassword(password, userPass)) {
            Cookie usernameCookie = new Cookie("username", username);
            usernameCookie.setPath("/");
            usernameCookie.setHttpOnly(false);
            response.addCookie(usernameCookie);

            session.setAttribute("username", username);
            return RestResponse.success();
        } else {
            return RestResponse.failure("Mật khẩu không chính xác!");
        }
    }

    public RestResponse changePassword(String username, String newPassword) {
        System.out.println("username: " + username);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));
        AuthUtil.validatePassword(newPassword);
        String hashedPw = AuthUtil.hashPassword(newPassword);
        if (AuthUtil.verifyPassword(newPassword, user.getPassword())) {
            return RestResponse.failure("Mật khẩu mới không được giống mật khẩu cũ");
        } else {
            user.setPassword(hashedPw);
            userRepository.save(user);
            return RestResponse.success();
        }
    }

    public RestResponse signUp(HttpServletResponse response, HttpSession session, String username, String password) {
        AuthUtil.validateUsername(userRepository, username);
        AuthUtil.validatePassword(password);

        String hashedPass = AuthUtil.hashPassword(password);
        User user = User.createUser(username, hashedPass);
        userRepository.save(user);

        Cookie usernameCookie = new Cookie("username", username);
        usernameCookie.setPath("/");
        usernameCookie.setHttpOnly(false);
        response.addCookie(usernameCookie);

        session.setAttribute("username", username);

        return RestResponse.success();
    }

    public RestResponse logout(HttpSession session) {
        // Invalidate session on logout
        session.invalidate();
        return RestResponse.success("Đăng xuất thành công");
    }

    public RestResponse resetPassword(String username, String newPassword) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException(username));

        AuthUtil.validatePassword(newPassword);

        String hashedPass = AuthUtil.hashPassword(newPassword);
        user.setPassword(hashedPass);
        userRepository.save(user);

        return RestResponse.success();
    }
}
