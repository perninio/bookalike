const HOST = window.location.hostname;

export const dataserverAPIBooksEndpoint = "http://" + HOST + ":5060/api/books";
export const dataserverAPIUserEndpoint = "http://" + HOST + ":5060/api/users";
export const dataserverAPIUserInteractionEndpoint =
  "http://" + HOST + ":5060/api/book-user/";
export const dataserverAPIEndpoint = "http://" + HOST + ":5060/api/rates";

export const webserverAPIUserEndpoint = "http://" + HOST + ":5150/api/user";
export const webserverAPIBookEndpoint = "http://" + HOST + ":5150/book/";
export const postserverAPIEndpoint = "http://" + HOST + ":5400/api/posts";

export const recommendationserverAPIEndpoint =
  "http://" + HOST + ":5200/recommend/";

export const authorizationAPITokenEndpoint = "http://" + HOST + ":5300/token";
