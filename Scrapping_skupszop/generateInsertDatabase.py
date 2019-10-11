import json
def jsonOpen():
    with open('data.txt', 'r') as inputfile:
     jsonloaded = json.load(inputfile)
    return jsonloaded
def creatinsert(Name,Publishing_house,Autor,Year,BookType,Description,Graphic):
    query=( "USE bookalike;\n INSERT INTO book (Name,`Publishing-house`,Autor,Year,BookType,Description,Graphic)VALUES(\""+
    Name+"\",\""+Publishing_house+"\",\""+Autor+"\",\""+Year+"\",\""+BookType+"\",\""+Description.replace("\"","'")+"\",\""+Graphic+"\");" )
    return query
    
jsonloaded=jsonOpen()
print(jsonloaded['ksiazka'][1]['autor'])
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
    print(fullquery[157])

    f = open('queryInsert.sql', 'a',encoding='utf-8')
    try:
        f.write(fullquery)
    except UnicodeEncodeError:
        print('UnicodeEncodeError, encoding data...')
        f.write(fullquery)
        print('data encoded and saved')
    f.close()