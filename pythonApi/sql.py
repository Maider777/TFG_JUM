import pyodbc
cnxn = pyodbc.connect('DRIVER={SQL Server};SERVER=185.60.40.210,58015;DATABASE=TFG_JUM;UID=sa;PWD=Pa88word;')
cursor = cnxn.cursor()

cursor.execute("SELECT * FROM usuarios")

for row in cursor.fetchall():
    print(row)