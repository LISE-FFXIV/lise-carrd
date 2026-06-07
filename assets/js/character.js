function formatTraits(selector = ".character__trait") {
  document.querySelectorAll(selector).forEach((el) => {
    const parts = el.textContent
      .split("━")
      .map((s) => s.trim())
      .filter(Boolean);

    el.innerHTML = parts.map((text, i) => (i % 2 === 0 ? `<strong>${text}</strong>` : `<em>${text}</em>`)).join(' <span class="sep">━</span> ');
  });
}

formatTraits();

window.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".profile__character__content");

  function checkScroll() {
    if (!content) return;

    const hasScroll = content.scrollHeight > content.clientHeight;
    content.classList.toggle("is-scrollable", hasScroll);
  }

  checkScroll();
  window.addEventListener("resize", checkScroll);
});
