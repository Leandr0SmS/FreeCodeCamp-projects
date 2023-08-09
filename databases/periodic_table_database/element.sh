# !/bin/bash
PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"
if [ $# -eq 0 ]
then
  echo "Please provide an element as an argument."
else
  # Check if the argument is a number.
  if [[ $1 =~ ^[0-9]+$ ]]
  then
    ATOMIC_NUMBER=$($PSQL "SELECT atomic_number FROM elements WHERE atomic_number=$1;")
  # Check if the argument is a string less then 3 char.
  elif [[ ${#1} -lt 3 ]]
  then
    ATOMIC_NUMBER=$($PSQL "SELECT atomic_number FROM elements WHERE symbol='$1';")
  # Check if the argument is a string grater then or equal to 3 char.
  elif [[ ${#1} -ge 3 ]]
  then
    ATOMIC_NUMBER=$($PSQL "SELECT atomic_number FROM elements WHERE name='$1';")
  fi
  # Check if the selection of atomic_number is true.
  if [[ $ATOMIC_NUMBER ]]
  then
    # Query elements and properties tables
    ELEMENT_INFO=$($PSQL "SELECT name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM properties RIGHT JOIN elements USING(atomic_number) INNER JOIN types USING(type_id) WHERE atomic_number=$ATOMIC_NUMBER;")
    if [[ ELEMENT_INFO ]]
    then
      IFS="|"
      # Extract INFO into an array
      read -r -a INFO <<< "$ELEMENT_INFO"
      # Assign array INFO to individual variables
      NAME="${INFO[0]}"
      SYMBOL="${INFO[1]}"
      TYPE="${INFO[2]}"
      ATOMIC_MASS="${INFO[3]}"
      MELTING_POINT="${INFO[4]}"
      BOILING_POINT="${INFO[5]}"
      # Output the response 
      echo -e "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
    else 
      echo "I could not find that element in the database."
    fi
  else
    echo "I could not find that element in the database."
  fi
fi