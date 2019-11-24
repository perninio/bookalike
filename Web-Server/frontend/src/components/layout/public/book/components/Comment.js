import React from "react"

const renderstars = (count) => {
    var i;
    var inner;
      for (i = 0; i < count; i++) {
        inner += "<span class='float-right'><i class='text-warning fa fa-star'></i></span>";
    }
    console.log(inner)
    var stars = <div>{inner}</div>;
    return stars
}

const Comment = ({ data }) => {
    return (
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-2">
                        <img
                            src={data.graphic}
                            height="100"
                            width="100"
                            class="img rounded-circle img-fluid"
                        />
                        <p class="text-secondary text-center">15 Minutes Ago</p>
                    </div>
                    <div class="col-md-10">
                        <p>
                            <a class="float-left">
                                <strong>{data.imie}</strong>
                            </a>
                            <span class="float-right">
                                <i class="text-warning fa fa-star-half"></i>
                            </span>
                            <span class="float-right">
                                <i class="text-warning fa fa-star"></i>
                            </span>
                            <span class="float-right">
                                <i class="text-warning fa fa-star"></i>
                            </span>
                            <span class="float-right">
                                <i class="text-warning fa fa-star"></i>
                            </span>
                        </p>
                        <div class="clearfix"></div>
                        <p align="left">{data.desc}</p>
                        {/*<p>
                            <a class="float-right btn text-white btn-danger">
                                {" "}
                                <i class="fa fa-thumbs-down"></i> DisLike
                      </a>
                            <a class="float-right btn text-white btn-danger">
                                {" "}
                                <i class="fa fa-thumbs-up"></i> Like
                      </a>
                        </p>*/}
                       {
                           
                       }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Comment;