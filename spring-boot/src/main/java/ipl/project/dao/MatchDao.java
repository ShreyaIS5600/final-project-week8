package ipl.project.dao;

import ipl.project.entity.MatchDetails;
import ipl.project.entity.Team;
import ipl.project.repository.MatchRepository;
import ipl.project.service.MatchService;
import ipl.project.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.Tuple;
import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MatchDao implements MatchService {

    @Autowired
    private MatchRepository repository;

    @Autowired
    private TeamService teamService;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public MatchDetails save(MatchDetails match) {
        return repository.save(match);
    }

    @Override
    public MatchDetails getMatch(int id) {
        return repository.findById(id).get();
    }

    @Override
    public List<MatchDetails> getAllMatches() {
        return repository.findAll();
    }

    @Override
    public MatchDetails getLatestMatch(String teamName) {
        String sql = "select m.* from match_details m " +
                " inner join team t1 on m.term1_id=t1.id " +
                " inner join team t2 on m.term2_id=t2.id " +
                " where t1.name=:team1 OR t2.name=:team2 order by m.date desc limit 1 ";

        Query query = entityManager.createNativeQuery(sql, Tuple.class);
        query.setParameter("team1", teamName);
        query.setParameter("team2", teamName);
        Tuple tuple = (Tuple) query.getSingleResult();

        MatchDetails match = new MatchDetails();
        match.setId(Integer.valueOf(tuple.get("id").toString()));
        match.setCity(tuple.get("city").toString());
        match.setDate(Date.valueOf(tuple.get("date").toString()));
        match.setMarginMethod(tuple.get("margin_method").toString());
        match.setUmpire1(tuple.get("umpire1").toString());
        match.setUmpire2(tuple.get("umpire2").toString());
        match.setVenue(tuple.get("venue").toString());
        match.setLosingTeam(cObj(tuple.get("losing_team_id")));
        match.setTeam1(cObj(tuple.get("term1_id")));
        match.setTeam2(cObj(tuple.get("term2_id")));
        match.setTossDecision(cObj(tuple.get("toss_decision_id")));
        match.setTossWinner(cObj(tuple.get("toss_winner_id")));
        match.setWinningTeam(cObj(tuple.get("winning_team_id")));

        return match;
    }

    @Override
    public MatchDetails getLatestMatchWin(String teamName) {
        String sql = "select m.* from match_details m " +
                " inner join team t1 on m.term1_id=t1.id " +
                " inner join team t2 on m.term2_id=t2.id " +
                " inner join team tw on m.winning_team_id=tw.id " +
                " where tw.name=:team order by m.date desc limit 1 ";

        Query query = entityManager.createNativeQuery(sql, Tuple.class);
        query.setParameter("team", teamName);
        Tuple tuple = (Tuple) query.getSingleResult();

        MatchDetails match = new MatchDetails();
        match.setId(Integer.valueOf(tuple.get("id").toString()));
        match.setCity(tuple.get("city").toString());
        match.setDate(Date.valueOf(tuple.get("date").toString()));
        match.setMarginMethod(tuple.get("margin_method").toString());
        match.setUmpire1(tuple.get("umpire1").toString());
        match.setUmpire2(tuple.get("umpire2").toString());
        match.setVenue(tuple.get("venue").toString());
        match.setLosingTeam(cObj(tuple.get("losing_team_id")));
        match.setTeam1(cObj(tuple.get("term1_id")));
        match.setTeam2(cObj(tuple.get("term2_id")));
        match.setTossDecision(cObj(tuple.get("toss_decision_id")));
        match.setTossWinner(cObj(tuple.get("toss_winner_id")));
        match.setWinningTeam(cObj(tuple.get("winning_team_id")));

        return match;
    }

    @Override
    public MatchDetails getLatestMatchLoss(String teamName) {
        String sql = "select m.* from match_details m " +
                " inner join team t1 on m.term1_id=t1.id " +
                " inner join team t2 on m.term2_id=t2.id " +
                " inner join team tl on m.losing_team_id=tl.id " +
                " where tl.name=:team order by m.date desc limit 1 ";

        Query query = entityManager.createNativeQuery(sql, Tuple.class);
        query.setParameter("team", teamName);
        Tuple tuple = (Tuple) query.getSingleResult();

        MatchDetails match = new MatchDetails();
        match.setId(Integer.valueOf(tuple.get("id").toString()));
        match.setCity(tuple.get("city").toString());
        match.setDate(Date.valueOf(tuple.get("date").toString()));
        match.setMarginMethod(tuple.get("margin_method").toString());
        match.setUmpire1(tuple.get("umpire1").toString());
        match.setUmpire2(tuple.get("umpire2").toString());
        match.setVenue(tuple.get("venue").toString());
        match.setLosingTeam(cObj(tuple.get("losing_team_id")));
        match.setTeam1(cObj(tuple.get("term1_id")));
        match.setTeam2(cObj(tuple.get("term2_id")));
        match.setTossDecision(cObj(tuple.get("toss_decision_id")));
        match.setTossWinner(cObj(tuple.get("toss_winner_id")));
        match.setWinningTeam(cObj(tuple.get("winning_team_id")));

        return match;
    }

    @Override
    public List<MatchDetails> getAllMatchWin(String teamName) {
        String sql = "select m.* from match_details m " +
                " inner join team t1 on m.term1_id=t1.id " +
                " inner join team t2 on m.term2_id=t2.id " +
                " inner join team tw on m.winning_team_id=tw.id " +
                " where tw.name=:team order by m.date desc ";

        Query query = entityManager.createNativeQuery(sql, Tuple.class);
        query.setParameter("team", teamName);

        List<Tuple> tupleList = query.getResultList();

        return tupleList.stream().map(tuple -> {
            MatchDetails match = new MatchDetails();
            match.setId(Integer.valueOf(tuple.get("id").toString()));
            match.setCity(tuple.get("city").toString());
            match.setDate(Date.valueOf(tuple.get("date").toString()));
            match.setMarginMethod(tuple.get("margin_method").toString());
            match.setUmpire1(tuple.get("umpire1").toString());
            match.setUmpire2(tuple.get("umpire2").toString());
            match.setVenue(tuple.get("venue").toString());
            match.setLosingTeam(cObj(tuple.get("losing_team_id")));
            match.setTeam1(cObj(tuple.get("term1_id")));
            match.setTeam2(cObj(tuple.get("term2_id")));
            match.setTossDecision(cObj(tuple.get("toss_decision_id")));
            match.setTossWinner(cObj(tuple.get("toss_winner_id")));
            match.setWinningTeam(cObj(tuple.get("winning_team_id")));
            return match;
        }).collect(Collectors.toList());
    }

    @Override
    public List<MatchDetails> getAllMatchesLoss(String teamName) {
        String sql = "select m.* from match_details m " +
                " inner join team t1 on m.term1_id=t1.id " +
                " inner join team t2 on m.term2_id=t2.id " +
                " inner join team tl on m.losing_team_id=tl.id " +
                " where tl.name=:team order by m.date desc ";

        Query query = entityManager.createNativeQuery(sql, Tuple.class);
        query.setParameter("team", teamName);

        List<Tuple> tupleList = query.getResultList();

        return tupleList.stream().map(tuple -> {
            MatchDetails match = new MatchDetails();
            match.setId(Integer.valueOf(tuple.get("id").toString()));
            match.setCity(tuple.get("city").toString());
            match.setDate(Date.valueOf(tuple.get("date").toString()));
            match.setMarginMethod(tuple.get("margin_method").toString());
            match.setUmpire1(tuple.get("umpire1").toString());
            match.setUmpire2(tuple.get("umpire2").toString());
            match.setVenue(tuple.get("venue").toString());
            match.setLosingTeam(cObj(tuple.get("losing_team_id")));
            match.setTeam1(cObj(tuple.get("term1_id")));
            match.setTeam2(cObj(tuple.get("term2_id")));
            match.setTossDecision(cObj(tuple.get("toss_decision_id")));
            match.setTossWinner(cObj(tuple.get("toss_winner_id")));
            match.setWinningTeam(cObj(tuple.get("winning_team_id")));
            return match;
        }).collect(Collectors.toList());
    }

    private Team cObj(Object o) {
        return teamService.getTeam(Integer.valueOf(o.toString()));
    }

}
