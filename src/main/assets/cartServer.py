import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser
from sqlite3 import Error

app = Flask(__name__)

# Path to your SQLite database
DATABASE = 'cart.sqlite'

def get_db_connection():
    """Create a new database connection."""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Create Cart table if not exists
def create_cart_table():
    with get_db_connection() as conn:
        try:
            conn.execute('''
                  CREATE TABLE IF NOT EXISTS Cart (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL,
                    food_id INTEGER,
                    food_name TEXT NOT NULL,
                    food_price TEXT NOT NULL,
                    food_image TEXT NOT NULL,
                    quantity INTEGER NOT NULL
                )
            ''')
            conn.commit()
        except Error as e:
            print(f"An error occurred: {e}")

# Initialize database and create tables
create_cart_table()

@app.route('/add-to-cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    username = data.get('username')
    food_id = data.get('food_id')
    food_name = data.get('food_name')
    food_price = data.get('food_price')
    food_image = data.get('food_image')
    food_quantity = data.get('food_quantity', 1)

    with get_db_connection() as conn:
        try:
            # Check if the item for this user already exists in the cart
            existing_item = conn.execute(
                'SELECT * FROM Cart WHERE food_id =? AND username =?', (food_id, username)
            ).fetchone()

            if existing_item:
                # If item exists, update the quantity
                conn.execute(
                    'UPDATE Cart SET quantity = quantity + 1 WHERE food_id =? AND username =?',
                    (food_id, username)
                )
            else:
                # If item doesn't exist, insert a new record
                conn.execute(
                    'INSERT INTO Cart (username, food_id, food_name, food_price, food_image, quantity) VALUES (?,?,?,?,?,?)',
                    (username, food_id, food_name, food_price, food_image, food_quantity)
                )
            conn.commit()
            response = {'message': 'Item added to cart'}
        except Error as e:
            print(f"Error adding item to cart: {e}")
            response = {'error': str(e)}

    return jsonify(response)

@app.route('/get-cart-items/<string:username>', methods=['GET'])
def get_cart_items(username):
    with get_db_connection() as conn:
        cart_items = conn.execute('SELECT * FROM Cart WHERE username =?', (username,)).fetchall()
        items = [
            {
                'foodId': item['food_id'],
                'foodName': item['food_name'],
                'foodPrice': item['food_price'],
                'foodImage': item['food_image'],
                'quantity': item['quantity']
            }
            for item in cart_items
        ]
        return jsonify(items)

#delete certain cart item
@app.route('/delete-cart-item/<int:food_id>/<string:username>', methods=['DELETE'])
def delete_cart_item(food_id, username):
    with get_db_connection() as conn:
        try:
            conn.execute('DELETE FROM Cart WHERE food_id = ? AND username = ?', (food_id, username))
            conn.commit()
            response = {'message': 'Item deleted successfully'}
        except Error as e:
            response = {'error': str(e)}
    return jsonify(response)

@app.route('/update-cart-item/increase/<int:food_id>/<string:username>', methods=['PUT'])
def increase_cart_item_quantity(food_id, username):
    with get_db_connection() as conn:
        try:
            conn.execute(
                'UPDATE Cart SET quantity = quantity + 1 WHERE food_id =? AND username =?',
                (food_id, username)
            )
            conn.commit()
            updated_quantity = conn.execute(
                'SELECT quantity FROM Cart WHERE food_id =? AND username =?', (food_id, username)
            ).fetchone()['quantity']
            response = {'message': 'Item quantity increased successfully', 'quantity': updated_quantity}
        except Error as e:
            response = {'error': str(e)}
    return jsonify(response)

@app.route('/update-cart-item/decrease/<int:food_id>/<string:username>', methods=['PUT'])
def decrease_cart_item_quantity(food_id, username):
    with get_db_connection() as conn:
        try:
            conn.execute(
                'UPDATE Cart SET quantity = quantity - 1 WHERE food_id =? AND username =? AND quantity > 0',
                (food_id, username)
            )
            conn.commit()
            updated_quantity = conn.execute(
                'SELECT quantity FROM Cart WHERE food_id =? AND username =?', (food_id, username)
            ).fetchone()['quantity']
            response = {'message': 'Item quantity decreased successfully', 'quantity': updated_quantity}
        except Error as e:
            response = {'error': str(e)}
    return jsonify(response)


@app.route('/clear-cart', methods=['DELETE'])
def clear_cart():
    username = request.args.get('username')
    with get_db_connection() as conn:
        try:
            conn.execute('DELETE FROM Cart WHERE username =?', (username,))
            conn.commit()
            response = {'message': f'All items cleared from cart for user {username}'}
        except Error as e:
            response = {'error': str(e)}

    return jsonify(response)




if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5050, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)
