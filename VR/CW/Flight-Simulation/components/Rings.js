AFRAME.registerComponent("target-ring", {
  init: function () {
    for (let i = 1; i <= 10; i++) {
      //id
      let id = `ring${i}`;

      //position variables
      let posX = Math.random() * 3000 + -1000;
      let posY = Math.random() * 2 + -1;
      let posZ = Math.random() * 3000 + -1000;

      let position = { x: posX, y: posY, z: posZ };

      //call the function
      this.createRings(id, position);
    }
  },

  createRings: function (id, position) {
    let terrainEl = document.querySelector("#terrain");
    let ringEl = document.createElement("a-entity");

    ringEl.setAttribute("id", id);
    ringEl.setAttribute("material", "color", "#ff9100");
    ringEl.setAttribute("position", position);
    ringEl.setAttribute("geometry", { primitive: "torus", radius: 8 });
    ringEl.setAttribute("static-body", {
      shape: "sphere",
      sphereRadius: 2,
    });
    ringEl.setAttribute("gameplay", {
      elementId: `#${id}`,
    });

    terrainEl.appendChild(ringEl);
  },
});
