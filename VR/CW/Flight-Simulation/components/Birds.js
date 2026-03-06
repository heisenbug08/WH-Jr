AFRAME.registerComponent("flying-birds", {
  init: function () {
    for (let i = 1; i <= 30; i++) {
      //id
      let id = `hurdle${i}`;

      //position variables
      let posX = Math.random() * 3000 + -1000;
      let posY = Math.random() * 2 + -5;
      let posZ = Math.random() * 3000 + -1000;

      let position = { x: posX, y: posY, z: posZ };

      //call the function
      this.flyingBirds(id, position);
    }
  },
  flyingBirds: (id, position) => {
    //Get the terrain element
    let terrainEl = document.querySelector("#terrain");

    //creating the bird model entity
    let birdEl = document.createElement("a-entity");

    //Setting multiple attributes
    birdEl.setAttribute("id", id);
    birdEl.setAttribute("position", position);
    birdEl.setAttribute("scale", { x: 2, y: 2, z: 2 });

    //set the gLTF model attribute
    birdEl.setAttribute("gltf-model", "./models/bird/scene.gltf");

    birdEl.setAttribute("static-body", {
      shape: "sphere",
      sphereRadius: 5,
    });

    birdEl.setAttribute("gameplay", {
      elementId: `#${id}`,
    });

    //append the bird entity as the child of the terrain entity
    terrainEl.appendChild(birdEl);
  },
});
