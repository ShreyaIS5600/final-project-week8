package ipl.project.repository;

import ipl.project.entity.MatchDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchRepository extends JpaRepository<MatchDetails, Integer> {
}
