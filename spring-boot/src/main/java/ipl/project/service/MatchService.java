package ipl.project.service;

import ipl.project.entity.MatchDetails;

import java.util.List;

public interface MatchService {

    MatchDetails save(MatchDetails match);

    MatchDetails getMatch(int id);

    List<MatchDetails> getAllMatches();

    MatchDetails getLatestMatch(String teamName);

    MatchDetails getLatestMatchWin(String teamName);

    MatchDetails getLatestMatchLoss(String teamName);

    List<MatchDetails> getAllMatchWin(String teamName);

    List<MatchDetails> getAllMatchesLoss(String teamName);

}
