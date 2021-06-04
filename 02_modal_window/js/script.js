document.querySelector(".btn").addEventListener("click", popupOpen);

function popupOpen() {
  const overlay = document.createElement("div");

  overlay.className = "overlay";
  overlay.innerHTML = `
  <div class="pop-up">
    <button class="pop-up__close">
      <div class="bar"></div>
    </button>
    <h3 class="pop-up__header">I'm a modal window 😍</h3>
    <p class="pop-up__text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
      doloribus doloremque aut exercitationem aperiam quam! Dolore quod,
      quas possimus facere debitis aperiam, voluptatibus sed quia rem et
      eligendi praesentium. Laborum optio suscipit sapiente distinctio ex
      voluptatem incidunt odit, repudiandae enim ipsa, quos cum nihil ipsum
      est, voluptatum rem sint labore minima nostrum. Porro aut vero magni
      est ex?
    </p>
  </div>`;

  overlay.addEventListener("click", (ev) => {
    if (
      ev.target.className.includes("overlay") ||
      ev.target.className.includes("pop-up__close")
    ) {
      popupClose();
    }
  });

  document.body.appendChild(overlay);
}

function popupClose() {
  document.body.removeChild(document.querySelector(".overlay"));
}
