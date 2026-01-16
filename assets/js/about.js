function initAboutHero() {
  const hero = document.querySelector(".about-hero");
  const title = document.querySelector(".about-hero__title");
  const intro = document.querySelector(".about-hero__intro");
  const image = document.querySelector(".about-hero__image");

  if (!hero) return;

  gsap.from(title, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    delay: 0.5,
    ease: "power3.out",
  });

  gsap.from(intro, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.8,
    ease: "power3.out",
  });

  gsap.from(image, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    delay: 1.1,
    ease: "power3.out",
  });
}

function init() {
  initAboutHero();
}

init();
