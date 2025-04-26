package demo.repository;

import demo.model.Flashcard;
import demo.model.MultipleChoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MultipleChoiceRepository extends JpaRepository<MultipleChoice, Long> {
    Optional<MultipleChoice> findByUuid(UUID uuid);
}
