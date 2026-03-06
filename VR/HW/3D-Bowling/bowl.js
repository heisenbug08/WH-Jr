AFRAME.registerComponent("ball", {
  newBall: true,
  init: function () {
    window.addEventListener("keydown", (e) => {
      if (e.code == "Space" && this.newBall) {
        this.createBall();
        this.updateTimer();
      }
    });
  },
  createBall: function () {
    let ballEl = document.createElement("a-gltf-model");
    ballEl.setAttribute("src", "./ball/scene.gltf");
    ballEl.setAttribute("scale", "2.5 2.5 2.5");
    ballEl.setAttribute("id", "ball");

    let camPos = document.querySelector("#camera").getAttribute("position");
    let dir = new Ammo.Vector3();
    ballEl.setAttribute("position", camPos);
    document.querySelector("#camera").object3D.getWorldDirection(dir);

    ballEl.setAttribute("velocity", dir.multiplyScalar(-20));

    ballEl.setAttribute("ammo-body", "type: dynamic;");
    ballEl.setAttribute(
      "ammo-shape",
      `type: sphere;
      fit: manual;
      sphereRadius: 0.3;
      offset: 0 0 0`
    );


    let sceneEl = document.querySelector("#scene");
    sceneEl.appendChild(ballEl);
    this.newBall = false;
  },
  updateTimer: function () {
    let count = 3;
    let timerEl = document.querySelector("#timer");
    timerEl.setAttribute("value", "Wait for 5...");
    let timer = setInterval(() => {
      count--;
      timerEl.setAttribute("value", `Wait for ${count}...`);
      if (count <= 0) {
        timerEl.setAttribute("value", "Press space to bowl");
        this.newBall = true;
        clearInterval(timer);
      }
    }, 1000);
  },
});

AFRAME.registerComponent("pins", {
  init: function () {
    let pins = document.querySelectorAll(".pins");
    pins.forEach(pin => {
      pin.setAttribute("src", "bowling-pin/scene.gltf")
      pin.setAttribute("scale", "3 3 3");
      pin.setAttribute("ammo-body", "type: dynamic;");
      pin.setAttribute(
        "ammo-shape",
        "type: box; fit: manual; half-extents: 0.1 0.5 0.1; offset: 0 0.5 0"
      );
    });
  },
  tick: function() {
    let pins = document.querySelectorAll(".pins");
    pins.forEach((pin) => {
      let pos = pin.getAttribute("position");
      if (pos.y <= -3) {
        pin.remove()
      }
    });
  }
});
