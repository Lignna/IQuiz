package demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MultipleChoiceQuestionDAO {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public void deleteAllByMultipleChoiceId(Long multipleChoiceId) {
        String sql = "CALL deleteAddMCQ(?);";
        jdbcTemplate.update(sql, multipleChoiceId);
    }
}
