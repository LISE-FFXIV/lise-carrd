document.addEventListener("DOMContentLoaded", () => {
  document.title = "Lise - The Veil of Secrets";

  const meta = {
    description: "Courte description du site ou du personnage",
    ogTitle: "Lise - The Veil of Secrets",
    ogDescription: "Description courte",
    ogImage: "assets/img/preview.jpg",
  };

  document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);

  document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.ogTitle);

  document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.ogDescription);

  document.querySelector('meta[property="og:image"]')?.setAttribute("content", meta.ogImage);
});
