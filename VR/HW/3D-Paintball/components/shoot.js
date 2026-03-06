AFRAME.registerComponent("shoot", {
  pause: true,
  init: function () {
    window.addEventListener("keydown", (e) => {
      if (e.code == "Space" && this.pause) {
        this.createBullet();
        this.pause = false;
      }
    });
  },
  createBullet: function () {
    let bulletEl = document.createElement("a-sphere");
    bulletEl.setAttribute("dynamic-body", { mass: 0 });
    bulletEl.setAttribute("radius", "0.15");
    bulletEl.setAttribute("class", "bullets");

    var color = this.colors[Math.floor(Math.random() * this.colors.length)];
    bulletEl.setAttribute("color", color);
    bulletEl.setAttribute("shader", "flat");

    let camPos = document.querySelector("a-camera").getAttribute("position");
    bulletEl.setAttribute("position", camPos);

    let direction = new THREE.Vector3();
    document.querySelector("a-camera").object3D.getWorldDirection(direction);
    bulletEl.setAttribute("velocity", direction.multiplyScalar(-20));

    bulletEl.addEventListener("collide", this.collision);

    let sound2El = document.querySelector("#pop");
    sound2El.components.sound.playSound();

    let sceneEl = document.querySelector("a-scene");
    sceneEl.appendChild(bulletEl);

    // Remove bullet
    setTimeout(() => {
      bulletEl.removeEventListener("collide", this.collision);
      bulletEl.remove();
    }, 5000);

    // Pause before next shot
    setTimeout(() => (this.pause = true), 200);
  },
  collision: function (e) {
    let bulletEl = e.detail.target.el;
    let hitEl = e.detail.body.el;
    
    if (hitEl.getAttribute("class") == "bulletHit") {
      let pos = bulletEl.getAttribute("position");
      let rotation = `0 0 ${Math.floor(Math.random() * 360)}`;

      let splashEl = document.createElement("a-plane");
      splashEl.setAttribute("transparent", "true");
      splashEl.setAttribute("src", "./assets/splash.png");
      splashEl.setAttribute("scale", "2.5 2.5 2.5");
      splashEl.setAttribute("side", "double");

      if (hitEl.getAttribute("id") == "ground") {
        pos.y = 0.05;
        rotation = `-90 ${Math.floor(Math.random() * 360)} 0`;
      }
      if (hitEl.getAttribute("id") == "wall1") {
        pos.z = -24.9;
        rotation = `0 0 ${Math.floor(Math.random() * 360)}`;
      }
      if (hitEl.getAttribute("id") == "wall2") {
        pos.x = -24.9;
        rotation = `0 90 ${Math.floor(Math.random() * 360)}`;
      }
      if (hitEl.getAttribute("id") == "wall3") {
        pos.z = 24.9;
        rotation = `0 180 ${Math.floor(Math.random() * 360)}`;
      }
      if (hitEl.getAttribute("id") == "wall4") {
        pos.x = 24.9;
        rotation = `0 -90 ${Math.floor(Math.random() * 360)}`;
      }
      splashEl.setAttribute("position", pos);
      splashEl.setAttribute("rotation", rotation);

      document.querySelector("a-scene").appendChild(splashEl);
      bulletEl.removeEventListener("collide", this.collision);
      bulletEl.remove();
    }
  },
  colors: [
    "aqua",
    "aquamarine",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "crimson",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgreen",
    "darkgrey",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategrey",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgrey",
    "dodgerblue",
    "firebrick",
    "forestgreen",
    "fuchsia",
    "gold",
    "goldenrod",
    "green",
    "greenyellow",
    "grey",
    "hotpink",
    "indianred",
    "indigo",
    "khaki",
    "lawngreen",
    "lightblue",
    "lightcoral",
    "lightgreen",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategrey",
    "lightsteelblue",
    "lime",
    "limegreen",
    "magenta",
    "maroon",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "navajowhite",
    "navy",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "peachpuff",
    "peru",
    "plum",
    "powderblue",
    "purple",
    "rebeccapurple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategrey",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "yellow",
    "yellowgreen",
  ],
});
