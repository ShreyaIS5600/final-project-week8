package ipl.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Data
@Entity
public class MatchDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;
    private String city;
    @JoinColumn(name = "term1_id", referencedColumnName = "Id")
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Team.class)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Team team1;
    @JoinColumn(name = "term2_id", referencedColumnName = "Id")
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Team.class)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Team team2;
    private Date date;
    private String venue;
    @JoinColumn(name = "toss_winner_id", referencedColumnName = "Id")
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Team.class)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Team tossWinner;
    @JoinColumn(name = "toss_decision_id", referencedColumnName = "Id")
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Team.class)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Team tossDecision;
    @JoinColumn(name = "winning_team_id", referencedColumnName = "Id")
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Team.class)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Team winningTeam;
    @JoinColumn(name = "losing_team_id", referencedColumnName = "Id")
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Team.class)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Team losingTeam;
    private String marginMethod;
    private String umpire1;
    private String umpire2;
}
