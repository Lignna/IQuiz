package demo.mapper;

import demo.dto.UserDTO;
import demo.model.User;

public class UserMapper {
    public static UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();

        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setCreatedAt(user.getCreatedAt());

        return dto;
    }
}
