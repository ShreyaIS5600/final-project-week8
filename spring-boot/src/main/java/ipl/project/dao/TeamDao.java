package ipl.project.dao;

import ipl.project.entity.Team;
import ipl.project.repository.TeamRepository;
import ipl.project.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TeamDao implements TeamService {

    @Autowired
    private TeamRepository repository;

    @Override
    public Team save(Team team) {
        return repository.save(team);
    }

    @Override
    public Team getTeam(Integer teamId) {
        return repository.findById(teamId).get();
    }

    @Override
    public Team getTeam(String teamName) {
        return repository.findByName(teamName);
    }

    @Override
    public List<Team> getAllTeams() {
        return repository.findAll();
    }

    @Override
    public void addMatchPlay(Team team) {
        team.setMatchPlayed(team.getMatchPlayed() + 1);
        repository.save(team);
    }

    @Override
    public void wonMatchPlay(Team team) {
        team.setMatchWon(team.getMatchWon() + 1);
        repository.save(team);
    }

    @Override
    public void lostMatchPlay(Team team) {
        team.setMatchLost(team.getMatchLost() + 1);
        repository.save(team);
    }

}
