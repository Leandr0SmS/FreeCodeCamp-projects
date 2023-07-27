#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.
INSERT_OK="INSERT 0 1"

$PSQL "TRUNCATE TABLE games, teams;"

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
 if [[ $YEAR != "year" ]]
 then
  #Get team_id winner
  WIN_TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$WINNER';")
  #If not found
  if [[ -z $WIN_TEAM_ID ]]
  then
    #Insert team 
    INSERT_TEAM_RESULT=$($PSQL "INSERT INTO teams(name) VALUES('$WINNER');")
    if [[ INSERT_TEAM_RESULT == INSERT_OK ]]
    then
      echo Inserted into teams: $WINNER
    fi
    #Get new team_id
    WIN_TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$WINNER';")
  fi 
  #Get team_id Opponent
  OPPONENT_TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$OPPONENT';")
  #If not found
  if [[ -z $OPPONENT_TEAM_ID ]]
  then
    #Insert team 
    INSERT_TEAM_RESULT=$($PSQL "INSERT INTO teams(name) VALUES('$OPPONENT');")
    if [[ INSERT_TEAM_RESULT == INSERT_OK ]]
    then
      echo Inserted into teams: $OPPONENT
    fi
    #Get new team_id
    OPPONENT_TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$OPPONENT';")
  fi 
  #Insert games info
  INSERT_GAMES_DATA=$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES($YEAR, '$ROUND', $WIN_TEAM_ID, $OPPONENT_TEAM_ID, $WINNER_GOALS, $OPPONENT_GOALS);")
  if [[ INSERT_GAMES_DATA == INSERT_OK ]]
  then
    echo Insert into games: $YEAR, '$ROUND', $WIN_TEAM_ID as $WINNER, $OPPONENT_TEAM_ID as $OPPONENT, $WINNER_GOALS, $OPPONENT_GOALS
  fi
 fi
done