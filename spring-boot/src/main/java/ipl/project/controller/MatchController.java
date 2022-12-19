package ipl.project.controller;

import ipl.project.entity.MatchDetails;
import ipl.project.entity.Team;
import ipl.project.service.MatchService;
import ipl.project.service.TeamService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/Teams")
public class MatchController {

    private TeamService teamService;
    private MatchService matchService;

    @PostMapping("/addMatch")
    public ResponseEntity<?> createTeam(@RequestBody Map<String, Object> body) {

        int losingTeamId = 0;
        Integer team1Id = cInt(body.get("team1Id"));
        Integer team2Id = cInt(body.get("team2Id"));
        Integer winningTeamId = cInt(body.get("winningTeamId"));

        if (winningTeamId.toString().equalsIgnoreCase(team1Id.toString())) {
            losingTeamId = team2Id;
        } else {
            losingTeamId = team1Id;
        }

        MatchDetails match = new MatchDetails();
        Team teamOne = teamService.getTeam(team1Id);
        Team teamTwo = teamService.getTeam(team2Id);
        Team tossWinner = teamService.getTeam(cInt(body.get("tossWinner")));
        Team tossDecision = teamService.getTeam(cInt(body.get("tossDecision")));
        Team losingTeam = teamService.getTeam(losingTeamId);
        Team winningTeam = teamService.getTeam(winningTeamId);


        teamService.addMatchPlay(teamOne);
        teamService.addMatchPlay(teamTwo);
        teamService.wonMatchPlay(winningTeam);
        teamService.lostMatchPlay(losingTeam);

        match.setDate(Date.valueOf(body.get("date").toString()));
        match.setTeam1(teamOne);
        match.setTeam2(teamTwo);
        match.setWinningTeam(winningTeam);
        match.setTossDecision(tossDecision);
        match.setTossWinner(tossWinner);
        match.setLosingTeam(losingTeam);
        match.setUmpire1(body.get("umpire1").toString());
        match.setUmpire2(body.get("umpire2").toString());
        match.setVenue(body.get("venue").toString());
        match.setCity(body.get("city").toString());
        match.setMarginMethod(body.get("marginMethod").toString());

        matchService.save(match);
        return ResponseEntity.ok(Map.of("message", "Match was Successfully Added."));
    }

    private Integer cInt(Object o) {
        return Integer.valueOf(o.toString());
    }

    @GetMapping("/fetchAllMatches")
    public ResponseEntity<?> fetchAllMatches() {
        return ResponseEntity.ok(matchService.getAllMatches());
    }

    @GetMapping("/Statistics/{teamName}")
    public ResponseEntity<?> fetchTeamMatchStatistics(@PathVariable("teamName") String name) {
        return ResponseEntity.ok(Map.of(
                "matchWon", matchService.getAllMatchWin(name),
                "matchLost", matchService.getAllMatchesLoss(name)));
    }

    @GetMapping("/Matches/Latest/{teamName}")
    public ResponseEntity<?> fetchLatestMatch(@PathVariable("teamName") String name) {
        return ResponseEntity.ok(matchService.getLatestMatch(name));
    }

    @GetMapping("/Matches/Latest/win/{teamName}")
    public ResponseEntity<?> fetchLatestMatchWin(@PathVariable("teamName") String name) {
        return ResponseEntity.ok(matchService.getLatestMatchWin(name));
    }

    @GetMapping("/Matches/Latest/loss/{teamName}")
    public ResponseEntity<?> fetchLatestMatchLoss(@PathVariable("teamName") String name) {
        return ResponseEntity.ok(matchService.getLatestMatchLoss(name));
    }

}
