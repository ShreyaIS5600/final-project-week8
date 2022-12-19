package ipl.project.service;

import ipl.project.entity.Team;

import java.util.List;

public interface TeamService {

    Team save(Team team);

    Team getTeam(Integer teamId);

    Team getTeam(String teamName);

    List<Team> getAllTeams();

    void addMatchPlay(Team team);

    void wonMatchPlay(Team team);

    void lostMatchPlay(Team team);
}
