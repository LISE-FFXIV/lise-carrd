class CharacterSection extends HTMLElement {
  async connectedCallback() {
    this.file = this.getAttribute("data-file");
    this.title = this.getAttribute("title");

    try {
      const res = await fetch(`./assets/data/${this.file}.json`);
      const data = await res.json();

      this.render(data);
    } catch (err) {
      console.error("JSON load error:", err);
      this.innerHTML = `<p>Erreur de chargement des données.</p>`;
    }
  }

  render(data) {
    const [number, ...nameParts] = (this.title || "").split(" ");
    const name = nameParts.join(" ");

    this.innerHTML = `
        <h2 class="section__title">
          <span class="section__title-number">${number || ""}</span>
          <span class="section__title-name">${name || ""}</span>
        </h2>

        ${this.generateFields(data)}
        ${this.generatePets(data)}
        ${this.generateStory(data)}
        ${this.generateAudio(data)}
    `;
  }

  /* =========================
     FIELDS (profil simple)
  ========================= */
  generateFields(data) {
    const excluded = ["voiceJP", "voiceEN", "pets", "story"];

    return Object.entries(data)
      .filter(([key, value]) => !excluded.includes(key) && typeof value !== "object")
      .map(([key, value]) => this.renderField(key, value))
      .join("");
  }

  renderField(key, value) {
    return `
      <div class="section__item">
        <span class="section__label">${this.formatKey(key)}</span>
        <span class="section__value">${value}</span>
      </div>
    `;
  }

  /* =========================
     PETS
  ========================= */
  generatePets(data) {
    const pets = data.pets;

    if (!Array.isArray(pets) || pets.length === 0) return "";

    return `
        ${pets.map((pet) => this.renderPet(pet)).join("")}
    `;
  }

  renderPet(pet) {
    return `
      <div class="pet__item">
          <img class="section__image" src="${pet.image}" alt="${pet.name}">
          <h3 class="section__name">${pet.name}</h3>
          <div class="section__rank">${pet.title}</div>
          <p class="section__text">${pet.text}</p>

      </div>
    `;
  }

  /* =========================
     STORY (NEW)
  ========================= */
  generateStory(data) {
    const story = data.story;

    if (!Array.isArray(story) || story.length === 0) return "";

    return `
    <div class="story__bloc">
        ${story.map((item, i) => this.renderStory(item, i)).join("")}
    </div>
    `;
  }

  renderStory(item, index) {
    const sideClass = index % 2 === 0 ? "left" : "right";

    return `
      <div class="story__section story-${sideClass}">
       <div class="section__image" style="background-image:url('${item.image}');"></div>


          <h3 class="section__chapter">${item.titre}</h3>
          <span class="section__date">${item.date}</span>
          <p class="section__text">${item.texte}</p>
      </div>
    `;
  }

  /* =========================
     AUDIO
  ========================= */
  generateAudio(data) {
    if (!data.voiceJP && !data.voiceEN) return "";

    return `
      <div class="audio__section">
      <span class="section__label">Voices</span>
        ${this.renderAudio("EN", data.voiceEN)}
        ${this.renderAudio("JP", data.voiceJP)}
      </div>
    `;
  }

  renderAudio(lang, voice) {
    if (!voice) return "";

    const safeLang = lang.toUpperCase();

    return `
    <div class="audio__item">
        <span class="audio__label audio__voice-${safeLang}">${voice.name}</span>

      <audio class="audio__ambient" controls>
        <source src="${voice.url}" type="audio/ogg" />
      </audio>
    </div>
  `;
  }

  /* =========================
     UTILS
  ========================= */
  formatKey(key) {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }
}

customElements.define("character-section", CharacterSection);
