const clockCont = document.querySelector(".js-clock-2022"),
      clockTit = clockCont.querySelector("h2");
     

function getTime2022() {
    const now = new Date();
    const dDay = new Date("2022-01-01:00:00:00+0900");
    const gap = (dDay-now) / 1000;
    const gapDays = Math.floor(gap/3600/24);
    const gapHours = Math.floor((gap-(gapDays*3600*24))/3600);
    const gapMiutes = Math.floor((gap-(gapDays*3600*24)-(gapHours*3600))/60);
    const gapSeconds = Math.floor((gap-(gapDays*3600*24)-(gapHours*3600)-(gapMiutes*60)));
   
    clockTit.innerText =  `${
        gapDays
    }d ${
        gapHours < 10 ? `0${gapHours}` : gapHours
    }h ${
        gapMiutes < 10? `0${gapMiutes}m` : gapMiutes
    }m ${
        gapSeconds < 10 ? `0${gapSeconds}m` : gapSeconds
    }s`;
    
}




function init() {
    getTime2022();
    setInterval(getTime2022,1000);
  }
  init();