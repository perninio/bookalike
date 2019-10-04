import mysql.connector
from mysql.connector import errorcode
#
#Dane inicjalizujące bazę danych
#
DB_NAME = 'bookalike'
#Parametry konfiguracyjne do połączenia z bazą
connString = {
      'user': 'root',
      'password': 'admin1',
      'host': '127.0.0.1',
      'raise_on_warnings': True
    }
#Tabele bazy danych
tables={}
tables['books'] = (
    "CREATE TABLE `books` ("
    "  `bookid` int NOT NULL AUTO_INCREMENT,"
    "  `book_name` varchar(100) NOT NULL,"
    "  `date` date,"
    "  `publishing_hause_name` varchar(10),"
    "  `tag` enum('kryminał','przygodowa','sci-fi','fantasy','popularno-naukowa','belatrystyczna'),"
    "  'book_foto' varchar(100),"
    "   PRIMARY KEY (`bookid`)",
    "   FOREIGN KEY (`authorid`) "
    "       REFERENCES `authors` (`authorid`)"
    ") ENGINE=InnoDB")

tables['authors'] = (
    "CREATE TABLE `authors` ("
    "  `authorid` int NOT NULL AUTO_INCREMENT,"
    "  `name` varchar(40) NOT NULL,"
    "  'firstname' varchar(40) NOT NULL,"
    "   PRIMARY KEY (`authorid`)",
    ") ENGINE=InnoDB")

tables['rates'] = (
    "CREATE TABLE `likes` ("
    "   'rateid' int NOT NULL AUTO_INCREMENT,"
    "  `bookid` int NOT NULL,"
    "  `userid` varchar(40) NOT NULL,"
    "  `rate` int  NOT NULL,"
    "   CHECK (rate<5 AND rate>=0),"
    "  PRIMARY KEY `rateid`,"
    "  FOREIGN KEY (`bookid`) "
    "     REFERENCES `books` (`bookid`),"
    "  FOREIGN KEY (`userid`) "
    "     REFERENCES `user` (`userid`),"
    ") ENGINE=InnoDB")
    
tables['users'] = (
    "CREATE TABLE `users` ("
    "  'userid' varchar(40) NOT NULL,"
    "  `username` int NOT NULL,"
    "  PRIMARY KEY `userid`,"
    ") ENGINE=InnoDB")


def connect_database(config):    
    try:
      cnx = mysql.connector.connect(**config)
    except mysql.connector.Error as err:
      if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
      elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
      else:
        print(err)
    else:
      print("connected")      
    return cnx
    
def create_database(cursor):
    try:
        cursor.execute(
            "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(DB_NAME))
    except mysql.connector.Error as err:
        print("Failed creating database: {}".format(err))
        exit(1)
    print("Database created")
    
def create_tables(cursor):
    for table_name in tables:
        table_description = tables[table_name]
        try:
            print("Creating table {}: ".format(table_name), end='')
            cursor.execute(table_description)
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                print("already exists.")
            else:
                print(err.msg)
        else:
            print("OK")

###############
def main():
    cnx=connect_database(connString)
    cursor=cnx.cursor()
    try:
        cursor.execute("USE {}".format(DB_NAME))
    except mysql.connector.Error as err:
        print("Database {} does not exists.".format(DB_NAME))
        if err.errno == errorcode.ER_BAD_DB_ERROR:
            create_database(cursor)
            print("Database {} created successfully.".format(DB_NAME))
            cnx.database = DB_NAME
            cursor=cnx.cursor()
            create_tables(cursor)
        else:
            print(err)
            exit(1) 
    else:
        print("database exists")
    cursor.close()
    cnx.close()
    
if __name__== "__main__" :
    main()
 