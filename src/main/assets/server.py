from flask import Flask
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

# Load events from JSON file
with open('./events.json') as f:
    events = json.load(f)['events']

@socketio.on('connect', namespace='/events')
def handle_connect_events():
    print('Connected to /events')

@socketio.on('client_connected', namespace='/events')
def handle_client_connected_events(data):
    print('Connection Status: {}'.format(data['connected']))

@socketio.on('fetch_events', namespace='/events')
def handle_fetch_events():
    # Emit events data to the client
    emit('server_send_events', events, namespace='/events')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=7000, debug=True)
