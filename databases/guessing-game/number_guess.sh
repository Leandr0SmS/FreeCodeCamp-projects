#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

echo "Enter your username: "
read USER_NAME

# Check user info
USER_ID=$($PSQL "SELECT user_id FROM users WHERE user_name='$USER_NAME';")
# If user not at database
if [[ -z $USER_ID ]]
then
  # Inser user at database
  INSERT_USER_NAME=$($PSQL "INSERT INTO users(user_name) VALUES('$USER_NAME');")
  # Check the insertion
  if [[ INSERT_USER_NAME ]]
  then
    USER_ID=$($PSQL "SELECT user_id FROM users WHERE user_name='$USER_NAME';")
    if [[ $USER_ID ]]
    then
      echo -e "\nWelcome, $USER_NAME! It looks like this is your first time here."
    fi
  fi
else
  # Get user best game
  USER_BEST_GAME=$($PSQL "SELECT MIN(number_of_guesses) FROM games WHERE user_id=$USER_ID;")
  USER_PLAYED_GAME=$($PSQL "SELECT COUNT(game_id) FROM games WHERE user_id=$USER_ID;")
  echo -e "Welcome back, $USER_NAME! You have played $USER_PLAYED_GAME games, and your best game took $USER_BEST_GAME guesses."
fi


# Generate random number
RANDOM_NUMBER=$(( RANDOM % 1000 + 1))
NUMBER_OF_GUESS=0
# Question to user
echo -e "\nGuess the secret number between 1 and 1000:"
read SELECTED_NUMBER
# If input is not a number
while [[ ! $SELECTED_NUMBER =~ ^[0-9]+$ ]]
do
  ((NUMBER_OF_GUESS ++))
  echo -e "\nThat is not an integer, guess again:"
  read SELECTED_NUMBER
done
((NUMBER_OF_GUESS ++))

if [[ $SELECTED_NUMBER -ne $RANDOM_NUMBER ]]
then
  # Loop to check if selected number is grater or less than random number
  while [[ $SELECTED_NUMBER -ne $RANDOM_NUMBER ]]
  do
    if [[ $SELECTED_NUMBER -gt $RANDOM_NUMBER ]]
    then
      echo -e "\n$RANDOM_NUMBER"
      echo -e "\nIt's lower than that, guess again:"
      read SELECTED_NUMBER
      # If input is not a number
      while [[ ! $SELECTED_NUMBER =~ ^[0-9]+$ ]]
      do
        ((NUMBER_OF_GUESS ++))
        echo -e "\nThat is not an integer, guess again:"
        read SELECTED_NUMBER
      done
      ((NUMBER_OF_GUESS ++))
    elif [[ $SELECTED_NUMBER -lt $RANDOM_NUMBER ]]
    then
      echo -e "\n$RANDOM_NUMBER"
      echo -e "\nIt's higher than that, guess again:"
      read SELECTED_NUMBER
      # If input is not a number
      while [[ ! $SELECTED_NUMBER =~ ^[0-9]+$ ]]
      do
        ((NUMBER_OF_GUESS ++))
        echo -e "\nThat is not an integer, guess again:"
        read SELECTED_NUMBER
      done
      ((NUMBER_OF_GUESS ++))
    fi
  done
fi
# Update data base
# Insert game
INSERT_USER_GAME=$($PSQL "INSERT INTO games(user_id, secret_number, number_of_guesses) VALUES($USER_ID, $RANDOM_NUMBER, $NUMBER_OF_GUESS);")
# Update user best game
USER_BEST_GAME=$($PSQL "SELECT MIN(number_of_guesses) FROM games WHERE user_id=$USER_ID;")
if [[ USER_BEST_GAME ]]
then
  INSERT_USER_BEST_GAME=$($PSQL "UPDATE users SET best_game=$USER_BEST_GAME WHERE user_id=$USER_ID;")
fi 
# When the selected number is equal to random number
echo -e "You guessed it in $NUMBER_OF_GUESS tries. The secret number was $SELECTED_NUMBER. Nice job!"


