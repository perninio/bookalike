export const cardsData = [
  {
    imgSrc:
      "https://images.unsplash.com/photo-1548809988-619418ad859c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    cardTitle: "Społeczność",
    cardText:
      "Dodaj swoich znajomych, wymieniajcie się opiniami o książkach oraz wymieniajcie się ze sobą - nasz serwis społecznościowy to wszystko usprawni."
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    cardTitle: "Wydarzenia",
    cardText:
      "Wśród użytkowników naszego serwisu znajdziesz swoich ulubionych autorów książek, np. J.K. Rowling, A. Sapkowski - dowiedz się o wydarzeniach, np. spotkaniach z autorem w pobliżu Twojego miejsca zamieszkania"
  },
  {
    imgSrc:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80",
    cardTitle: "System rekomendacji",
    cardText:
      "Dzięki naszemu autorskiemu narzędziu, uzyskasz rekomendacje bazujące na ocenach Twoich oraz Twoich przyjaciół. System ten jest w pełni darmowy!"
  }
];

export const chartDataUsers = {
  text: "Ilość nowych użytkowników w danym miesiącu",
  data: {
    labels: [
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik"
    ],
    datasets: [
      {
        label: "Nowi użytkownicy",
        data: [44, 56, 21, 44, 111, 43, 5],
        backgroundColor: [
          "rgb(255,255,255,0.5)",
          "rgb(255,255,255,0.5)",
          "rgb(255,255,255,0.5)",
          "rgb(255,255,255,0.5)",
          "rgb(255,255,255,0.5)",
          "rgb(255,255,255,0.5)",
          "rgb(255,255,255,0.5)"
        ]
      }
    ]
  }
};

export const chartDataRates = {
  text: "Oceny zarekomendowanych książek dla użytkowników",
  data: {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Oceny",
        data: [30, 133, 300, 180, 60],
        backgroundColor: [
          "rgb(255,255,255,0.5)",
          "rgb(255,255,255,0.5)",
          "rgb(255,255,255,0.5)",
          "rgb(255,255,255,0.5)",
          "rgb(255,255,255,0.5)"
        ]
      }
    ]
  }
};
