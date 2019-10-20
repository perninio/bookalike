import React, { useState, useEffect } from "react";
import axios from "axios";

import { serverAPIBooksEndpoint } from "../../../../constants/serverEndpoint";

export const BookPage = props => {
  const idBook = props.match.params.id;
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(serverAPIBooksEndpoint + "/" + idBook)
        .then(result => {
          setData(result.data.data);
        })
        .catch(err => console.log("XD"));
    };
    fetchData();
  }, [idBook]);

  console.log(data);

  return <React.Fragment>
        
<div class="container">
  <div class="row my-row">
      
    <div class="col-md=auto my-col order-sm-1">
            <span class='bookcover'>

      <img  src="https://skupszop.pl/images/books/9788375745368.jpg" alt='Pan lodowego ogrodu'>
    </img>

</span>
    </div>

    <div class="col-md my-col  order-sm-2">
        <span class="bookinfo">
                <h2 >
                        Pan lodowego ogrodu
                    </h2>
                    <div>
                    Ocena: 4,79/5
                    </div>
    <div>
    autor: Grzędowicz
    </div>
      Opis: Dawno dawno temu, za siedmioma górami ....
      </span>
    </div>
    <div class="col-md my-col order-md-3 order-sm-4">
     reklamy kiedyś może google albo/rtbkit
    </div>

    <div  class="col-md-12 my-col order-md-4 order-sm-3">
            <span class="stars">
               gwiazdki
              
               </span>
        </div>
  </div>

 <div class="row justify-content-md-center my-row">
        <div class="col-md-12 my-col text-center">
               Carouzela z rekomndacjami
               </div>
      </div>


    <div class="row my-row-comment">
            <div  class="col-md-12 my-col text-center">
                <span class="comment">
                    <img src="https://www.tubefilter.com/wp-content/uploads/2013/11/new-youtube-comments-rosanna-pansino.jpg"/>
                
                </span>
            </div>
    </div>
</div>
  
  </React.Fragment>;
};
