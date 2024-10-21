from flask import Flask, request, jsonify
import sqlite3
import hashlib

app = Flask(__name__)

# Function to hash the password
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Connect to the SQLite database
def get_db_connection():
    conn = sqlite3.connect('user.sqlite')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/users', methods=['GET'])
def get_users():
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users')
            users = cursor.fetchall()
        return jsonify([dict(user) for user in users])
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500

@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users WHERE userId = ?', (user_id,))
            user = cursor.fetchone()
        if user:
            return jsonify(dict(user))
        else:
            return jsonify({'error': 'User not found'}), 404
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500

# New endpoint to fetch user information by username
@app.route('/user', methods=['GET'])
def get_user_by_username():
    username = request.args.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400

    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
            user = cursor.fetchone()
            if user:
                return jsonify(dict(user)), 200
            else:
                return jsonify({'error': 'User not found'}), 404
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500

@app.route('/user', methods=['POST'])
def create_user():
    try:
        new_user = request.json
        required_fields = ['username', 'password', 'phoneNum', 'emailAddress', 'dateOfBirth']
        if not all(field in new_user for field in required_fields):
            return jsonify({'error': 'Missing fields in request'}), 400

        username = new_user['username']
        password = hash_password(new_user['password'])
        phoneNum = new_user['phoneNum']
        emailAddress = new_user['emailAddress']
        dateOfBirth = new_user['dateOfBirth']

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(''' 
                INSERT INTO users (username, password, phoneNum, emailAddress, dateOfBirth) 
                VALUES (?, ?, ?, ?, ?)''', (username, password, phoneNum, emailAddress, dateOfBirth))
            conn.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500

@app.route('/user/update', methods=['PUT'])
def update_user():
    try:
        data = request.json
        username = data.get('username')
        name = data.get('name')
        dob = data.get('dateOfBirth')
        email = data.get('emailAddress')
        avatar = data.get('avatar')  # If you are storing avatar as an index or URL

        if not username:
            return jsonify({'error': 'Username is required'}), 400

        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                UPDATE users
                SET username = ?, dateOfBirth = ?, emailAddress = ?, avatar = ?
                WHERE username = ?''', (name, dob, email, avatar, username))
            conn.commit()
        
        return jsonify({'message': 'User updated successfully'}), 200

    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500


@app.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM users WHERE userId = ?', (user_id,))
            if cursor.rowcount == 0:
                return jsonify({'error': 'User not found'}), 404
            conn.commit()
        return jsonify({'message': 'User deleted successfully'})
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    hashed_password = hash_password(password)
    
    print(f"Username: {username}")
    print(f"Hashed Password: {hashed_password}")

    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, hashed_password))
            user = cursor.fetchone()
            if user:
                return jsonify({'message': 'Login successful'}), 200
            else:
                return jsonify({'error': 'Invalid username or password'}), 401
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500


@app.route('/register', methods=['POST'])
def register_user():
    try:
        new_user = request.json
        required_fields = ['username', 'password', 'phoneNum', 'emailAddress', 'dateOfBirth']
        if not all(field in new_user for field in required_fields):
            return jsonify({'error': 'Missing fields in request'}), 400

        username = new_user['username']
        password = hash_password(new_user['password'])  # Hash the password here
        phoneNum = new_user['phoneNum']
        emailAddress = new_user['emailAddress']
        dateOfBirth = new_user['dateOfBirth']

        # Check if the username already exists
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
            existing_user = cursor.fetchone()
            if existing_user:
                return jsonify({'error': 'Username already exists'}), 400

            # Insert new user into the database
            cursor.execute('''INSERT INTO users (username, password, phoneNum, emailAddress, dateOfBirth)
                              VALUES (?, ?, ?, ?, ?)''', (username, password, phoneNum, emailAddress, dateOfBirth))
            conn.commit()

        return jsonify({'message': 'User registered successfully'}), 201

    except sqlite3.Error as e:
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
