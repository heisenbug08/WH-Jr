AFRAME.registerComponent("banner", {
  schema: {},
  init: function () {
    this.handleMouseClick();
  },
  handleMouseClick: function () {
    this.el.addEventListener("click", () => {
      console.log("Mouse clicked on", this.el.id);
      document.querySelector("#fade").setAttribute("visible", "true");
      document.querySelector("#banner").setAttribute("visible", "true");

      let id = this.el.getAttribute("id");
      let stripEl = document.querySelector("#strip");
      let textEl = document.querySelector("#text");
      if (id == "comic1") {
        stripEl.setAttribute("src", "comics/strip1.jpeg");
        textEl.setAttribute(
          "value",
          "Origins of Marvel Comics is a 1974\ncollection of Marvel Comics comic book\nstories, selected and introduced by Marvel\nwriter and editor Stan Lee. The book was published by Fireside Books, an imprint of\nSimon & Schuster, and was Marvel's first\ntrade paperback collection."
        );
      } else if (id == "comic2") {
        stripEl.setAttribute("src", "comics/strip2.jpeg");
        textEl.setAttribute(
          "value",
          "Wonder Woman is an ongoing American\ncomic book series featuring the DC\nComics superhero Wonder Woman and occasionally other superheroes as its\nprotagonist. The character first appeared\nin All Star Comics #8 (cover dated\nDecember 1941), later featured in\nSensation Comics (January 1941) series\nuntil having her own solo title."
        );
      } else if (id == "comic3") {
        stripEl.setAttribute("src", "comics/strip3.jpeg");
        textEl.setAttribute(
          "value",
          "Tinkle is an Indian fortnightly magazine\nfor children, published mainly in India. The\nmagazine contains many comics, stories,\npuzzles, quizzes, contests and other\nfeatures targeted at school children,\nalthough its readership includes many\nadults as well."
        );
      } else if (id == "comic4") {
        stripEl.setAttribute("src", "comics/strip4.jpeg");
        textEl.setAttribute(
          "value",
          "Astérix and Obélix must win the Olympic\nGames in order to help their friend Lovesix\nmarry Princess Irina. Brutus uses every trick\nin the book to have his own team win the\ngame and get rid of his father Julius Caesar\nin the process."
        );
      }
    });
  },
});
