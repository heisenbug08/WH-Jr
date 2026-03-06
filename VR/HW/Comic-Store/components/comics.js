AFRAME.registerComponent("create-comics", {
  init: function () {
    this.createComics();
  },
  createComics: function () {
    const coversRef = [
      {
        id: "comic1",
        url: "./comics/comic1.jpeg",
        title: "Marvel Origins",
      },
      {
        id: "comic2",
        url: "./comics/comic2.jpeg",
        title: "Wonder Woman",
      },
      {
        id: "comic3",
        url: "./comics/comic3.jpeg",
        title: "Tinkle",
      },
      {
        id: "comic4",
        url: "./comics/comic4.jpeg",
        title: "Asterix",
      },
    ];
    // Create Comics
    let xpos = -5.5;
    for (let i of coversRef) {
      let position = { x: xpos, y: 1.4, z: -5 };
      xpos += 3.67;
      
      let comicEl = document.createElement("a-entity")
      let coverEl = this.createCover(i.url, position)
      let borderEl = this.createBorder(position)
      let titleEl = this.createTitle(i.title, position)
      
      comicEl.setAttribute("id", i.id);
      comicEl.setAttribute("highlight", '');
      comicEl.setAttribute("banner", '')
      comicEl.appendChild(borderEl);
      comicEl.appendChild(coverEl);
      comicEl.appendChild(titleEl);

      let cameraEl = document.getElementById("camera")
      cameraEl.insertAdjacentElement("beforebegin", comicEl);
    }
  },
  createCover: function (url, pos) {
    let coverEl = document.createElement("a-plane");
    coverEl.setAttribute("material", { src: url });
    coverEl.setAttribute("position", pos)
    coverEl.setAttribute("height", 1.4)
    coverEl.setAttribute("scale", { x: 2.8, y: 2.8, z: 0 })
    return coverEl;
  },
  createBorder: function (pos) {
    let borderEl = document.createElement("a-plane");
    pos.z -= 0.005
    borderEl.setAttribute("position", pos)
    borderEl.setAttribute("height", 1.4)
    borderEl.setAttribute("color", "orange")
    borderEl.setAttribute("scale", { x: 3.1, y: 3, z: 0 })
    return borderEl;
  },
  createTitle: function (title, pos) {
    let titleEl = document.createElement("a-text");
    pos.y -= 2.5
    titleEl.setAttribute("position", pos);
    titleEl.setAttribute("value", title);
    titleEl.setAttribute("font", "exo2semibold")
    titleEl.setAttribute("align", "center")
    titleEl.setAttribute("width", 7.5)
    titleEl.setAttribute("color", "black")
    return titleEl
  },
});

