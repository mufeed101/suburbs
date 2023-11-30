import pymysql

# Connect to the database
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='password',
    db='SA4',
    local_infile=True  # Important: enable loading from local file
)

# Read the .sql file
with open('SA4/schema.sql', 'r') as file:
    sql_file_contents = file.read()

sql_commands = sql_file_contents.split(';')

try:
    with connection.cursor() as cursor:
        for command in sql_commands:
            if command.strip():
                cursor.execute(command)
                connection.commit()
    
    print("SQL commands executed successfully!")
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    connection.close()
