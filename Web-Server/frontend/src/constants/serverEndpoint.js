const HOST = window.location.hostname;

export const dataserverAPIBooksEndpoint = "http://" + HOST + ":5060/api/books";
export const dataserverAPIUserEndpoint = "http://" + HOST + ":5060/api/user";

export const webserverAPIUserEndpoint = "http://" + HOST + ":5150/api/user";
export const webserverAPIBookEndpoint = "http://" + HOST + ":5150/book/";

export const recommendationserverAPIEndpoint =
  "http://" + HOST + ":5200/recommend/";

export const authorizationAPITokenEndpoint = "http://" + HOST + ":5300/token";
