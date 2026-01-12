function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
}

function initHeaderScroll() {
  const header = document.querySelector(".header");
  let lastScroll = 0;
  let ticking = false;

  function updateHeader(currentScroll) {
    if (currentScroll > 100) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }

    if (currentScroll > lastScroll && currentScroll > 1) {
      header.classList.add("header--hidden");
    } else {
      header.classList.remove("header--hidden");
    }

    lastScroll = currentScroll;
  }

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeader(currentScroll);
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero__bg-slide");
  if (slides.length === 0) return;

  let currentSlide = 0;
  const slideInterval = 3000;

  slides[0].classList.add("active");

  function showSlide(index) {
    const prevIndex = currentSlide;

    slides[prevIndex].classList.add("exiting");
    slides[prevIndex].classList.remove("active");

    setTimeout(() => {
      slides[index].classList.add("active");
      slides[index].classList.remove("exiting");
    }, 50);

    setTimeout(() => {
      slides[prevIndex].classList.remove("exiting");
    }, 3000);
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
    currentSlide = nextIndex;
  }

  setInterval(nextSlide, slideInterval);
}

function initHeroAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  const heroServiceLeft = document.querySelector(".hero__service-left");
  const heroServiceCenter = document.querySelector(".hero__service-center");
  const heroServiceRight = document.querySelector(".hero__service-right");
  const heroTitle = document.querySelector(".hero__title");
  const heroCtas = document.querySelector(".hero__ctas");

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: 0.5,
  });

  tl.from(heroServiceLeft, {
    opacity: 0,
    x: -40,
    duration: 1,
  })
    .from(
      heroServiceCenter,
      {
        opacity: 0,
        y: 0,
        duration: 1,
      },
      "-=0.8"
    )
    .from(
      heroServiceRight,
      {
        opacity: 0,
        x: 40,
        duration: 1,
      },
      "-=0.8"
    )
    .from(
      heroTitle,
      {
        opacity: 0,
        y: 60,
        duration: 1.4,
      },
      "-=0.5"
    )
    .from(
      heroCtas,
      {
        opacity: 0,
        y: 0,
        duration: 0.8,
      },
      "-=0.6"
    );

  gsap.to(heroTitle, {
    y: -280,
    scale: 0.95,
    ease: "none",
    immediateRender: false,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to([heroServiceLeft, heroServiceCenter, heroServiceRight], {
    y: -450,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(heroCtas, {
    y: -150,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });
}

function initIntroAnimation() {
  const introSection = document.querySelector(".intro");
  const introText = document.querySelector(".intro__text");
  const introImages = document.querySelectorAll(".intro__image");
  if (!introText) return;

  Splitting({ target: introText, by: "words" });

  const words = introText.querySelectorAll(".word");
  let hasEntered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasEntered) {
          hasEntered = true;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: introSection,
              start: "top top",
              end: `+=${words.length * 100}`,
              scrub: 1,
              pin: true,
            },
          });

          const totalWords = words.length;

          words.forEach((word, index) => {
            tl.to(word, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            });

            if (index === Math.floor(totalWords * 0.1)) {
              tl.to(
                introImages[0],
                { y: 0, opacity: 1, duration: 2, ease: "power2.out" },
                "<"
              );
            }
            if (index === Math.floor(totalWords * 0.3)) {
              tl.to(
                introImages[1],
                { y: 0, opacity: 1, duration: 2, ease: "power2.out" },
                "<"
              );
            }
            if (index === Math.floor(totalWords * 0.5)) {
              tl.to(
                introImages[2],
                { y: 0, opacity: 1, duration: 2, ease: "power2.out" },
                "<"
              );
            }
            if (index === Math.floor(totalWords * 0.7)) {
              tl.to(
                introImages[3],
                { y: 0, opacity: 1, duration: 2, ease: "power2.out" },
                "<"
              );
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(introSection);
}

function initTrustAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const trustSection = document.querySelector(".trust");
  const trustElements = document.querySelectorAll(".trust__number, .trust__label, .trust__locations, .trust__description");

  if (!trustSection || trustElements.length === 0) return;

  gsap.set(trustElements, { opacity: 0, y: 30 });

  gsap.to(trustElements, {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: trustSection,
      start: "top 80%",
      once: true,
    },
  });
}

function initServicesAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector(".services");
  const wrapper = document.querySelector(".services__wrapper");
  const cards = gsap.utils.toArray(".service-card");

  if (!section || !wrapper || cards.length === 0) return;

  let hasEntered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasEntered) {
          hasEntered = true;

          // Pin the wrapper
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: wrapper,
            pinSpacing: false,
          });

          cards.forEach((card, index) => {
            if (index > 0) {
              gsap.set(card, { xPercent: 100 });
            }
          });

          cards.forEach((card, index) => {
            if (index === 0) return; 

            const progress = (index - 1) / cards.length;
            const nextProgress = index / cards.length;

            gsap.fromTo(
              card,
              { xPercent: 100 },
              {
                xPercent: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: `top+=${progress * section.offsetHeight} top`,
                  end: `top+=${nextProgress * section.offsetHeight} top`,
                  scrub: 1,
                },
              }
            );
          });
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(section);
}

function init() {
  initLenis();
  initHeaderScroll();
  initHeroSlider();
  initHeroAnimations();
  initIntroAnimation();
  initTrustAnimation();
  initServicesAnimation();
}

init();
