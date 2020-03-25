import json
def jsonOpen():
    with open('data.txt', 'r') as inputfile:
     jsonloaded = json.load(inputfile)
    return jsonloaded
def creatinsert(Name,Publishing_house,Autor,Year,BookType,Description,Graphic):
    query=( "INSERT INTO book (name,publishinghouse,autor,year,booktype,description,graphic)VALUES(\'"+
    Name.replace("\'","''")+"','"+Publishing_house.replace("\'","''")+"\',\'"+Autor.replace("\'","''")+"\',\'"+Year+"','"+BookType+"','"+Description.replace("\'","''")+"','"+Graphic.replace("\'","''")+"');" )
    return query
    
jsonloaded=jsonOpen()

f = open('queryInsert.sql', 'a',encoding='utf-8')
f.write("USE bookalike;\n")
for ksiazka in jsonloaded['ksiazka']:
    fullquery=creatinsert(ksiazka['tytul'],
        ksiazka['wydawnictwo'],
        ksiazka['autor'],
        ksiazka['datawydania'],
        ksiazka['kategoria'], #chodzi o gatunek
        ksiazka['dlugiopis'],
        ksiazka['src'])
    buff=json.dumps(fullquery)
    buff2=json.loads(buff)
    fullquery+="\n"

    f = open('queryInsert.sql', 'a',encoding='utf-8')
    try:
        f.write(fullquery)
    except UnicodeEncodeError:
        print('UnicodeEncodeError, encoding data...')
        f.write(fullquery)
        print('data encoded and saved')
    f.close()