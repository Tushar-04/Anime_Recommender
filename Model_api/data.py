import simplejson
import pandas as pd
import numpy as np
import pickle
import time
from flask import Flask
from flask_cors import CORS


df=pd.read_csv("Ultimate.csv")
animes_dict = pickle.load(open('animes_dict.pkl','rb'))
animes = pd.DataFrame(animes_dict)
animes.drop('combined_feature',axis=1,inplace=True)

#3.40 min
similarity = pickle.load(open('similarity.pkl', 'rb'))

def get_title_from_index(idi,flag):
    if flag == 1:
        return animes[animes['mal_id'] == idi]['title'].values
    return animes[animes['mal_id'] == idi]['title_english'].values

def get_data(anime):
    index_T = animes[animes["title"] == anime].index
    index_TE = animes[animes["title_english"] == anime].index
    f = 0
    if len(index_T) == 1:
        distances = sorted(list(enumerate(similarity[index_T[0]])), reverse=True, key=lambda r: r[1])
        f = 1
    elif len(index_TE) == 1:
        distances = sorted(list(enumerate(similarity[index_TE[0]])), reverse=True, key=lambda r: r[1])
        f = 2
    else:
        #API Bad Responses something shonfsvbufaovnoafv
        data={"data" : ["NOT FOUND"]}
        data=simplejson.dumps(data, ignore_nan=True)
        return data

    co = 0
    i = 1
    h = pd.DataFrame(columns = animes.columns.to_list())
    while co <= 9 and i < len(distances):
        title = get_title_from_index(distances[i][0],f)
        if len(title) == 1:
            h = h.append(animes[animes['title'] == title[0]], ignore_index = True)
            co += 1
        i += 1

    data={}
    dlist=[]
    d={}
    x=h.to_dict('list')
    for i in range(len(x["mal_id"])):
        d={"mal_id":x["mal_id"][i],
        "title":x["title"][i],
        "title_english":x["title_english"][i],
        "genres":x["genres"][i],
        "synopsis":x["synopsis"][i],
        "score":x["score"][i],
        "images":x["images"][i],
        "type":x["type"][i],
        "episodes":x["episodes"][i],
        "status":x["status"][i],
        "rating":x["rating"][i],
        "rank":x["rank"][i],
        "popularity":x["popularity"][i]
        }
        dlist.append(d)
      
    data={"data":dlist}
    data=simplejson.dumps(data, ignore_nan=True)
    return data


app = Flask(__name__)
CORS(app)
@app.route("/<string:n>")
def user(n):
    name = n
    print(name)
    AnimeList = get_data(name)
    return AnimeList


if __name__ == '__main__':
    app.run(debug=True)


