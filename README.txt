DeMorgan Restaurant System


Overview:
----------
This project is a Food Booking System for DeMorgan Restaurant. It features a Flask-SocketIO server for real-time communication 
regarding upcoming events in HomeScreen.js, and an SQLite database to store user information. User records are stored with passwords 
securely hashed using the SHA-256 algorithm.


Project Structure:
-------------------
- imagePath.js
- Config.tsx
- App.tsx                       
- screens                 
    - WelcomeScreen.js                
    - LoginScreen.js
    - RegisterScreen.js
    - HomeScreen.js
    - NavigationScreen.js
    - AboutScreen.js    
    - CartScreen.tsx
    - MenuScreen.js
    - FoodDetailPage.js
    - CheckoutScreen.tsx
    - AppreciationScreen.tsx
    - ProfileScreen.js
    - ContactScreen.js

-assets
    - fonts
    - foodData.json
    - images
        - alcohol
        - beverage
        - cart
        - category
        - DeMorgan
        - dessert
        - events
        - icons
        - main_dish
        - payment
        - quotes
        - spaghetti
        - tumblr
   
    
    
- android/app/src/main/assets
    - websocketClient.js
    - websocketServer.js
    - events.json
    - cartServer.py
    - cart.sqlite
    - userServer.py
    - user.sqlite
    - server.py

- UserDatabase.py (for creating database if not exists)
- QuotesPath.js
- README.txt                       # Project documentation (this file)


Requirements:
--------------
- Python 3.x
- Flask
- Flask-SocketIO
- SQLite3
- hashlib (built-in Python library)
- React Native packages as described in Setup Instructions


Setup Instructions:
--------------------
1. Clone the Repository
    Navigate to the project directory:
    - cd DeMorgan

2. Install Dependencies:
    Ensure you have Python 3 and pip installed. Then, install the required packages:
    For react-native dependencies:
    - npm install i
    - npm install @react-navigation/native-stack                # For App.tsx
    - npm install react-native-linear-gradient                  # For WelcomeScreen.js
    - npm install react-native-sqlite-storage                   # For LoginScreen.js
    - npm install crypto-js                                     # For LoginScreen.js
    - npm install @react-native-community/datetimepicker        # For RegisterScreen.js
    - npm install react-native-snap-carousel                    # For HomeScreen.js
    - npm install socket.io-client                              # For HomeScreen.js
    - npm install @react-navigation/native                      # For AboutScreen.js
    - npm install @react-navigation/bottom-tabs                 # For NavigationScreen.js
    - npm install react-native-safe-area-context
    - npm install @react-navigation/drawer
    - npm i @expo/vector-icons
    - npx expo install react-native-gesture-handler react-native-reanimated
            Put below statement in babel.config.js
            plugins: [
            'react-native-reanimated/plugin', // Make sure this is last
        ],
    npm i react-native-screens

    - npm install @babel/runtime react-is
    - npm install react-native-vector-icons --save              # For MenuScreen.js
        -Go to android/app/build.gradle and edit below:
        apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
    - npm install @react-native-async-storage/async-storage     # For ContactScreen.js
    - npm install @react-navigation/drawer @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context  # For DrawerNavigator.js

    *****NEVER run npx audit fix --force!!!
    For Flask and Flask-Socket.IO:
    - pip install Flask Flask-SocketIO                          # For server.py


3. Database Setup:
    The project uses an SQLite database to store user records. The database is created and populated by running the 'UserDatabase.py' script.

 

    This script will:
    - Create a 'users' table in the 'user.sqlite' database.
    - Insert predefined user records with hashed passwords.
    
    Note:
    - After creating the database, copy the user.sqlite database into the assets folder.


4. Run the Flask-SocketIO Server:
    To start the server for events, run the following command in different command prompt/terminal :
    1. cd android/app/src/main/assets
        1a. python cartServer.py
        1b. python userServer.py
        1c. python server.py
        1d. node websocketServer.js

    By default, the server will run on 'http://10.0.2.2' with different port so that it would not be clashing with other port that being used.
    This is the IP address of the emulator, if you are using with the real devices, kindly replace it with your own ip.


5. Accessing Events Data:
    The server will load event data from the 'events.json' file located in the 'android/app/src/main/assets' directory. Clients can fetch this data by
    emitting a 'fetch_events' event to the server, which will respond with the event data.


6. Run The Project
    - Open Android Studio Emulator
    - Open Command Prompt and Navigate to the project directory:
        - cd DeMorgan
    - Start the react-native server on android:
        - npx react-native start
        - a


JSON File (events.json):
-------------------------
The 'events.json' file contains a list of events, each with an 'id', 'title', 'date', and 'description'. This file is used by the 
server to send event data to connected clients.

SQLite Database (user.sqlite):
-------------------------------
The SQLite database contains a single table named 'users', which stores user details such as:
- userId: A unique identifier for each user.
- username: The user's name.
- password: The user's hashed password.
- phoneNum: The user's phone number.
- emailAddress: The user's email address.
- dateOfBirth: The user's date of birth.

Hashing Function:
------------------
Passwords are hashed using the SHA-256 algorithm before being stored in the database. This ensures that even if the database 
is compromised, the plain-text passwords are not exposed.

Security Considerations:
-------------------------
- Password Hashing: The SHA-256 hashing algorithm is used to securely hash passwords before storing them in the database.
- WebSocket Security: Ensure that the Flask-SocketIO server is deployed using secure WebSocket connections (wss://) in a production environment.

