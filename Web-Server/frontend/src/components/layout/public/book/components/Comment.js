import React from "react"
import ReactStars from "react-stars";

const renderstars = (count) => {
    var i;
    var inner;
    for (i = 0; i < count; i++) {
        inner += "<span className='float-right'><i className='text-warning fa fa-star'></i></span>";
    }
    console.log(inner)
    var stars = <div>{inner}</div>;
    return stars
}

const Comment = ({ comments }) => {
    return (
        <div>
            {comments.map(data => (
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-2">
                                <img
                                    src={data.graphic}
                                    height="100"
                                    width="100"
                                    className="img rounded-circle img-fluid"
                                />
                                <p className="text-secondary text-center">15 Minutes Ago</p>
                            </div>
                            <div className="col-md-10">
                                <p>
                                    <a className="float-left">
                                        <strong>{data.imie}</strong>
                                    </a>
                                    <span className="float-right">
                                        <ReactStars
                                            count={5}
                                            value={data.rate}
                                            size={24}
                                            color2={'#ffd700'}
                                            edit={false} />
                                    </span>
                                </p>
                                <div className="clearfix"></div>
                                <p align="left">{data.desc}</p>
                                {/*<p>
                            <a className="float-right btn text-white btn-danger">
                                {" "}
                                <i className="fa fa-thumbs-down"></i> DisLike
                      </a>
                            <a className="float-right btn text-white btn-danger">
                                {" "}
                                <i className="fa fa-thumbs-up"></i> Like
                      </a>
                        </p>*/}
                                {

                                }
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Comment;