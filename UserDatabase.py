import sqlite3
import hashlib

# Function to hash the password
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Connect to SQLite database
db = sqlite3.connect('user.sqlite')

# Drop the table if it exists
db.execute('DROP TABLE IF EXISTS users')

# Create the user table with the avatar column
db.execute('''
    CREATE TABLE IF NOT EXISTS users(
        userId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        phoneNum TEXT NOT NULL,
        emailAddress TEXT NOT NULL,
        dateOfBirth TEXT NOT NULL,
        avatar INTEGER DEFAULT 1
    )
''')

# Create a cursor object
cursor = db.cursor()

# Insert records into the user table with hashed passwords and default avatar value
data = [
    ('JohnDoe', hash_password('JohnD@12x'), '0101234567', 'johndoe@gmail.com', '1995-08-22', 1),
    ('JaneSmith', hash_password('JaneS!99'), '0112345678', 'janesmith@yahoo.com', '1992-11-13', 1),
    ('AliceWong', hash_password('Alice@1980'), '0123456789', 'alice.wong@outlook.com', '1980-05-09', 1),
    ('BobBrown', hash_password('BobB$123'), '0134567890', 'bobbrown@hotmail.com', '1985-07-15', 1),
    ('CharlieKim', hash_password('Charlie@21'), '0145678901', 'charlie.kim@gmail.com', '2000-12-30', 1),
    ('DavidTan', hash_password('DavidT*01'), '0156789012', 'david.tan@gmail.com', '1990-03-01', 1),
    ('EvaNg', hash_password('EvaN@2022'), '0167890123', 'evang@yahoo.com', '1999-09-23', 1),
    ('FrankLee', hash_password('FrankL@98'), '0178901234', 'frank.lee@gmail.com', '1998-10-31', 1),
    ('GraceLim', hash_password('GraceL@55'), '0189012345', 'gracelim@outlook.com', '2002-06-27', 1),
    ('HenryPark', hash_password('HenryP@77'), '0190123456', 'henry.park@gmail.com', '1997-04-14', 1),
    ('IvyChen', hash_password('IvyC@89xx'), '0102345678', 'ivychen@gmail.com', '1994-02-19', 1),
    ('JackHuang', hash_password('JackH@76'), '0113456789', 'jackhuang@yahoo.com', '1996-07-21', 1),
    ('KarenLo', hash_password('KarenL@88'), '0124567890', 'karen.lo@outlook.com', '1993-12-12', 1),
    ('LeoWong', hash_password('LeoW@01xy'), '0135678901', 'leowong@hotmail.com', '2001-05-17', 1),
    ('MiaTan', hash_password('MiaT@20zz'), '0146789012', 'miatan@gmail.com', '1997-11-03', 1),
    ('NickLim', hash_password('NickL@98pp'), '0157890123', 'nick.lim@gmail.com', '1998-08-26', 1),
    ('OliviaNg', hash_password('OliviaN@77'), '0168901234', 'olivia.ng@yahoo.com', '2000-09-15', 1),
    ('PaulChong', hash_password('PaulC@85'), '0179012345', 'paul.chong@gmail.com', '1985-03-11', 1),
    ('QuincyYap', hash_password('QuincyY@99'), '0180123456', 'quincy.yap@outlook.com', '1999-01-28', 1),
    ('RachelLee', hash_password('RachelL@65'), '0191234567', 'rachel.lee@gmail.com', '1992-04-09', 1)
]

cursor.executemany('''
    INSERT INTO users(username, password, phoneNum, emailAddress, dateOfBirth, avatar)
    VALUES (?, ?, ?, ?, ?, ?)
''', data)

# Commit the transaction
db.commit()

# Close the database connection
db.close()
