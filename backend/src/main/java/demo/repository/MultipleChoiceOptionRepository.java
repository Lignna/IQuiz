package demo.repository;

import demo.model.MultipleChoiceOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MultipleChoiceOptionRepository extends JpaRepository<MultipleChoiceOption, Long> {
}
