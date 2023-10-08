import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="root",
    database="DelightfulDeli"
)

mycursor = db.cursor()

mycursor.execute("SELECT * FROM DelightfulDeli_Data")

for row in  mycursor:
    print(row)