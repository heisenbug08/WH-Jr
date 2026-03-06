AFRAME.registerComponent("gameplay", {
  schema: {
    elementId: {
      type: "string",
      default: "#ring1",
    },
  },
  init: function () {
    let duration = 120;
    let timerE1 = document.querySelector("#timer");
    this.startTimer(timerE1, duration);
  },
  updateScore: function () {
    let element = document.querySelector("#score");
    let count = element.getAttribute("text").value;
    let currentscore = parseInt(count);
    currentscore += 10;
    element.setAttribute("text", { value: currentscore });
  },

  updateTarget: function () {
    let element = document.querySelector("#targets");
    let count = element.getAttribute("text").value;
    let currentTarget = parseInt(count);
    currentTarget -= 1;
    element.setAttribute("text", { value: currentTarget });
  },
  
  startTimer: function (timerE1, duration) {
    let minutes;
    let seconds;
    setInterval(() => {
      if (duration >= 0) {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        timerE1.setAttribute("text", { value: minutes + ":" + seconds });
        duration = duration - 1;
      } else {
        this.gameOver();
      }
    }, 1000);
  },
  isCollided: function (elementId) {
    const element = document.querySelector(elementId);
    element.addEventListener("collide", (e) => {
      if (elementId.includes("#ring")) {
        element.setAttribute("visible", false);
        this.updateScore();
        this.updateTarget();
      } else if (elementId.includes("#hurdle")) {
        this.gameOver();
      }
    });
  },
  gameOver: function() {
    let element = document.querySelector("#gameover_text");
    element.setAttribute("visible", true)
    let planeE1 = document.querySelector("#plane_model");
    planeE1.setAttribute("dynamic-body", { mass: 1 })
  },
  update: function () {
    this.isCollided(this.data.elementId);
  },
});
