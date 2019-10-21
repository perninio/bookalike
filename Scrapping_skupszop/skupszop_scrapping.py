import requests
from bs4 import BeautifulSoup
import json
from urllib.request import Request, urlopen 
import urllib.request
import random
import re
import time

ksiazki = {}
ksiazki['ksiazka']=[]
mainurl = "https://skupszop.pl/ksiazki/wszystkie-kategorie"
url="https://skupszop.pl"
catclass="child-categories"
allcaturls=[]
#scope of scrapping book pages
startbookspage=1
endbookspage=3

def main():
    counter=1
    getallCatUrls()  
    allcaturls.append({'link':'https://skupszop.pl/fantasy-145894','gatunek':'fantasy'})
    allbooknumber=str(len(allcaturls)*30*pagesnumber)
    print("Ogólna liczba książek do scrapowania:"+allbooknumber)

    for link in allcaturls:
       for x in range(startbookspage,pagesnumber):
         odpowiedz= requests.get(link['link']+"?page="+str(x))
         if odpowiedz.status_code==200:
             print("scrapowanie linku:"+link['link']+"?page="+str(x))
             print("O tematyce: "+link['gatunek'])
             soup = BeautifulSoup(odpowiedz.text, 'html.parser')     
             if  (soup.find(class_="product-content-list-ul"))!=None:       
                 for href in soup.findAll("li",class_="product-grid-item"):                  
                    bookurl=href.div.figure.a.get('href')            
                    print ("Adres książki: "+bookurl)
                    answer = requests.get(bookurl)
                    
                    if answer.status_code==200:
                        booksoup = BeautifulSoup(answer.text, 'html.parser')
                        counter=getBookInfoSkupSzop(booksoup,link['gatunek'],counter)  
                        print(str(counter)+'/'+allbooknumber)
                    else:
                        time.sleep(2)
         else:
             time.sleep(2)
     
    f=open('data.txt', 'a+',encoding='utf-8')
    jsondump=json.dumps(ksiazki) 
    f.write(jsondump)
    f.close()
    print("Liczba ksiazek pobranych: "+str(counter))    

def getallCatUrls():
    odpowiedz= requests.get(mainurl)
    soup = BeautifulSoup(odpowiedz.text, 'html.parser')
    answer=soup.find(class_=catclass)
    if  (answer)!=None:
        for link in answer.findAll('a'):
            odpowiedz2= requests.get(url+link.get('href'))
            if odpowiedz2.status_code==200:
                soup2 = BeautifulSoup(odpowiedz2.text, 'html.parser')
                answer2=soup2.find(class_='child-categories activeCategory')
                if answer2.findAll('a')!=None :            
                    for link2 in answer2.findAll('a'):
                        parturl=link2.get("href")
                        print(url+parturl)
                        allcaturls.append({'link':url+parturl,'gatunek':link2.span.get_text()})
                    #print("Cat urls: "+url+parturl+link.get_text())
            else :
                print(str(answer2.status_code))
    else:
        print("Błąd scrapowania linków")
    
def getBookInfoSkupSzop(soup,gatunek,counter):       
    title="None"
    liczbastron="None"
    data_wydania="None"
    description="None"
    autor="None"  
    imglink="None"
    wydawnictwo="None"
   
    patterndata = re.compile("Rok wydania")
    patternstrony = re.compile("Ilość stron")
    patternwydawnictwo = re.compile("Wydawnictwo")    
    classname="wrapper product itemscope"

    booksoup=soup.find(class_=classname)
    if(booksoup.find(class_="product-name"))!=None:
        title=booksoup.find(class_="product-name").text.replace("\n", '');
        print("Tytuł: "+title)
    if(booksoup.find("p",itemprop="description"))!=None:
        description=booksoup.find("p",itemprop="description").text.replace("\n", '');
        #print("Opis: "+description)    
    if(booksoup.findAll("p",class_="bookDetails-value"))!=None:
        for obj in booksoup.findAll("p",class_="bookDetails-value"):
            if patterndata.match(obj.text):
                data_wydania=obj.span.text.replace("\n", '');
                #print("Rok wydania: "+data_wydania)
            if patternstrony.match(obj.text):
                liczbastron=obj.span.text.replace("\n", ''); 
                #print("Liczba stron: "+liczbastron)
    if(booksoup.find("div",class_="publishing-name"))!=None:
        wydawnictwo=booksoup.find("div",class_="publishing-name").p.a.get_text().replace("\n", '');            
        #print("Wydawnictwo: "+wydawnictwo)        
    if(booksoup.find("a",class_="authors-item"))!=None:
        autor=booksoup.find("a",class_="authors-item").text.replace("\n", '');
        #print("Autor: "+autor)     
    if(booksoup.find("img",itemprop="image"))!=None:
        imglink=booksoup.find("img",itemprop="image").get('src')
        #print("Imglink: "+str(imglink))   
        #downloader(imglink,title)
    
    saveToJSON(title,autor,description,data_wydania,gatunek.replace("\n", ''),liczbastron,wydawnictwo,imglink)
    counter+=1
    return counter

def saveToJSON(tytul,autor,dlugiopis,data_wydania,kategoria,liczbastron,wydawnictwo,imglink):
    ksiazki['ksiazka'].append({'tytul':tytul, 'autor':autor,'dlugiopis':dlugiopis,'datawydania':data_wydania, 'kategoria':kategoria.replace("\n", ''),'liczbastron':liczbastron,'wydawnictwo':wydawnictwo,'src':imglink})

def imagedownloader(image_url,nazwaplikujpg):
    file_name = nazwaplikujpg
    full_file_name = str(file_name) + '.jpg'    
    req = requests.get(image_url, headers={'User-Agent': 'Mozilla/5.0'})
    #webpage = urlopen(req).read()
    if req.status_code == 200:
        with open(full_file_name, 'wb') as f:
            f.write(req.content)


#def jsonOpen():
    #with open('data.txt', 'r') as inputfile:
   # jsonloaded = json.load(inputfile)
    #print(jsonloaded[1])
  #  return


if __name__ == '__main__':
    main()
