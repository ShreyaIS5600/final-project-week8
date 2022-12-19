package ipl.project.controller;

import ipl.project.entity.Team;
import ipl.project.service.TeamService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/Teams")
public class TeamController {

    private TeamService teamService;

    @PostMapping("/createTeam")
    public ResponseEntity<?> createTeam(@RequestBody Team team) {
        Team teamObj = teamService.save(team);
        if (teamObj.getId() > 0) {
            return ResponseEntity.ok(Map.of("message", "Team was Successfully Created."));
        } else {
            return ResponseEntity.badRequest().body("Unable to Create Team");
        }
    }

    @GetMapping("/fetchAllTeam")
    public ResponseEntity<?> fetchAllTeams() {
        return ResponseEntity.ok(teamService.getAllTeams());
    }

    @GetMapping("/{teamName}")
    public ResponseEntity<?> getTeamDetails(@PathVariable("teamName") String name) {
        return ResponseEntity.ok(teamService.getTeam(name));
    }

}
