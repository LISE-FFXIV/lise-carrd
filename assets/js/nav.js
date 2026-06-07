class SiteNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav class="nav">
      <div class="titre">Navigation</div>
      <div class="nav-links">
        <a href="index.html">home</a>
        <a href="profile.html">profile</a>
        <a href="hooks-facts.html">hooks & facts</a>
        <a href="relationships.html">relationships</a>
        <a href="gallery.html">gallery</a>
                <a href="ooc.html">OOC</a>
      </div>
    </nav>
        `;

    this.setActive();
  }

  setActive() {
    let current = window.location.pathname.split("/").pop();
    if (!current) current = "index.html";

    this.querySelectorAll("a").forEach((a) => {
      if (a.getAttribute("href") === current) {
        a.classList.add("active");
      }
    });
  }
}

customElements.define("site-nav", SiteNav);
