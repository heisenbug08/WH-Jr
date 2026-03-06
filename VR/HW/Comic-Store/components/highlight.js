AFRAME.registerComponent("highlight", {
  schema: {
    selected: { default: "", type: "string" },
  },
  init: function () {
    this.handleMouseEnter();
    this.handleMouseLeave();
  },
  handleMouseEnter: function () {
    this.el.addEventListener("mouseenter", () => {      
      let borderEl = this.el.children[0]
      borderEl.setAttribute("scale", { x: 3.2, y: 3.1, z: 0 });
      borderEl.setAttribute("color", "forestgreen");
    });
  },
  handleMouseLeave: function () {
    this.el.addEventListener("mouseleave", () => {      
      let borderEl = this.el.children[0];
      borderEl.setAttribute("scale", { x: 3.1, y: 3, z: 0 });
      borderEl.setAttribute("color", "orange");
    });
  },
});
