const dateContiner = document.querySelector(".js-date"),
      dateTitle = dateContiner.querySelector("h1");
const date = new Date();

function getToday() {
    
    const year = date.getFullYear();
    const month =("0" + (1 + date.getMonth())).slice(-2);
    const days = ("0" + date.getDate()).slice(-2);
    
    dateTitle.innerText =  `${year
    }.${
        month
    }.${
        days
    }
`;
 
    
}



function init() {
    getToday();
    setInterval(getToday,1000);
  }
  init();