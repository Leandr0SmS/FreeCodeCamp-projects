#! /bin/bash
PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

echo -e "\n~~~ Welcome to Hair Style Salon ~~~\n"

MAIN_MENU() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi

  # Get services available
  AVAILABLE_SERVICES=$($PSQL "SELECT service_id, name FROM services;")
  if [[ -z $AVAILABLE_SERVICES ]]
  then
    echo "Sorry, we don't have any service available."
  else
    # display and ask what service
    echo -e "These are the options to take care of your beauty:\n"
    echo "$AVAILABLE_SERVICES" | while read SERVICE_ID BAR NAME 
    do
      echo "$SERVICE_ID) $NAME"
    done
    echo -e "\nWhich one would you like?"
    read SERVICE_ID_SELECTED
    SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id=$SERVICE_ID_SELECTED;")
    if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]] || [[ -z $SERVICE_NAME ]]
    then 
      MAIN_MENU "**** That is not a valid service number. ****\n"
    else
      # Ask the phone
      echo -e "\nWhat is your phone number?"
      read CUSTOMER_PHONE
      # Get customer info 
      CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE';")
      if [[ -z $CUSTOMER_NAME ]]
      then
        echo -e "\nWhat's your name?"
        read CUSTOMER_NAME
        # insert new customer
        INSERT_CUSTOMER_INFO=$($PSQL "INSERT INTO customers(name, phone) VALUES('$CUSTOMER_NAME', '$CUSTOMER_PHONE')")
      fi
      echo -e "\nHello $CUSTOMER_NAME\nWhat time would you like to schedule your $SERVICE_NAME?"
      read SERVICE_TIME
      if [[ $SERVICE_TIME ]]
      then
        CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE';")
        INSERT_CUSTOMER_APPOINTMENT=$($PSQL "INSERT INTO appointments(service_id, customer_id, time) VALUES($SERVICE_ID_SELECTED, $CUSTOMER_ID, '$SERVICE_TIME');")
        if [[ INSERT_CUSTOMER_APPOINTMENT ]]
        then
          echo -e "\nI have put you down for a $(echo $SERVICE_NAME | sed -r 's/^ *| *$//g') at $SERVICE_TIME, $(echo $CUSTOMER_NAME | sed -r 's/^ *| *$//g')." 
        fi
      fi
    fi
  fi
}

EXIT() {
  echo -e "\nThank you for stopping in.\n"
}

MAIN_MENU