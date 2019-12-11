import React, { useState, useEffect } from "react"
import Slider from "react-slick";
import booksdata from "./library.json"
import { Link } from "react-router-dom";
import { Alert } from "reactstrap"
import axios from "axios";

const Library = () => {
    const [data, setData] = useState(booksdata.data)
    const [ownbooks, setOwnBooks] = useState([])
    const [readbooks, setReadBooks] = useState([])
    const [wantsbooks, setWantsBooks] = useState([])

    const numberofrows = (tabela) => {
        if (tabela.length > 60) {
            return 3
        } if (tabela.length > 20) {
            return 2
        }
        else {
            return 1
        }
    }
    useEffect(() => {
        var wantstable = []
        var owntable = []
        var readtable = []
        data.map(item => { if (item.wants_read) { wantstable.push(item) } if (item.has_read) { readtable.push(item) } if (item.has_book) { owntable.push(item) } })
        setOwnBooks(owntable)
        setReadBooks(readtable)
        setWantsBooks(wantstable)

        // const fetchData = async () => {
        //   axios
        //     .get(dataserverAPIBooksEndpoint + "/" + idBook)
        //     .then(result => {
        //       setData(result.data.data);
        //     })
        //     .catch(err => console.log("Failed to get book data"));
        // };
        //fetchData();
    }, []);

    console.log("tabela", ownbooks)

    const settings = {
        className: "center",
        infinite: true,
        speed: 300,
        dots: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesPerRow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                    slidesPerRow: 1
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesPerRow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    slidesPerRow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesPerRow: 1,
                    slidesToScroll: 1,
                    slidesPerRow: 1,
                    dots:false
                }
            }
        ]
    };

    return (
        <div>
            <div>
                <div><h3>Posiadane książki:</h3></div>
                <div className="carousel">
                    {ownbooks.length != 0 ?
                        <Slider
                            {...settings}
                            slidesPerRow={5}
                            rows={numberofrows(ownbooks)}

                        >
                            {ownbooks.map(res => {
                                return (
                                    <div className="carouselbook">
                                        <div className="carouselbook">
                                            {res.graphic != "" ?
                                                <Link to={"/book/" + res.bookid}>
                                                    <img src={res.graphic} height="208" width="136" />
                                                </Link>
                                                : null
                                            }
                                        </div>
                                        {res.graphic != "" ?
                                            <div>
                                                <Link to={"/book/" + res.bookid}>{res.name}</Link>
                                            </div>
                                            : null
                                        }
                                    </div>
                                );
                            })
                            }

                        </Slider> :
                        <Alert color="warning">
                            Nie masz żadnej książki zaznaczonej jako "posiadana"
                        </Alert>
                    }
                </div>

                <div>
                    <div>
                        <div><h3>Przeczytane książki:</h3></div>
                        <div className="carousel">
                            {readbooks.length != 0 ?
                                <Slider
                                    {...settings}
                                    slidesPerRow={5}
                                    rows={numberofrows(readbooks)}
                                >
                                    {readbooks.map(res => {
                                        return (
                                            <div className="carouselbook">
                                                <div className="carouselbook">
                                                    {res.graphic != "" ?
                                                        <Link to={"/book/" + res.bookid}>
                                                            <img src={res.graphic} height="208" width="136" />
                                                        </Link>
                                                        : null
                                                    }
                                                </div>
                                                {res.graphic != "" ?
                                                    <div>
                                                        <Link to={"/book/" + res.bookid}>{res.name}</Link>
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                        );
                                    })
                                    }

                                </Slider> :
                                <Alert color="warning">
                                    Nie masz żadnej książki zaznaczonej jako "przeczytana"
                                </Alert>
                            }
                        </div>
                    </div>


                    <div>
                        <div><h3>Książki, którę chcę przeczytać:</h3></div>
                        <div className="carousel">
                            {wantsbooks.length != 0 ?
                                <Slider
                                    {...settings}
                                    slidesPerRow={5}
                                    rows={numberofrows(wantsbooks)}

                                >
                                    {wantsbooks.map(res => {
                                        return (
                                            <div className="carouselbook">
                                                <div className="carouselbook">
                                                    {res.graphic != "" ?
                                                        <Link to={"/book/" + res.bookid}>
                                                            <img src={res.graphic} height="208" width="136" />
                                                        </Link>
                                                        : null
                                                    }
                                                </div>
                                                {res.graphic != "" ?
                                                    <div>
                                                        <Link to={"/book/" + res.bookid}>{res.name}</Link>
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                        );
                                    })
                                    }

                                </Slider> :
                                <Alert color="warning">
                                    Nie masz żadnej książki zaznaczonej jako "chcę przeczytać"
                                </Alert>
                            }
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}
export default Library;