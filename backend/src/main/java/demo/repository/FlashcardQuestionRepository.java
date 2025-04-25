package demo.repository;

import demo.model.FlashcardQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlashcardQuestionRepository extends JpaRepository<FlashcardQuestion, Long> {
}
