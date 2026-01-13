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
  const speedLines = document.querySelectorAll(".intro .speed-line");

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

          speedLines.forEach((line, index) => {
            tl.fromTo(
              line,
              {
                y: window.innerHeight,
                opacity: 0,
              },
              {
                y: -window.innerHeight,
                opacity: 1,
                duration: 0.5,
                ease: "none",
              },
              index * 0.2
            );
          });

          words.forEach((word, index) => {
            tl.to(
              word,
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
              },
              index * 0.1
            );
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
  const trustImage1 = document.querySelector(".trust__image--1");
  const trustImage2 = document.querySelector(".trust__image--2");
  const trustImage3 = document.querySelector(".trust__image--3");
  const trustTitleBlock = document.querySelector(".trust__title-block");
  const trustLocations = document.querySelector(".trust__locations");
  const trustDescription = document.querySelector(".trust__description");

  if (!trustSection) return;

  let hasEntered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasEntered) {
          hasEntered = true;

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          tl.from(trustImage1, {
            opacity: 0,
            y: 60,
            duration: 0.8,
          })
            .from(
              trustTitleBlock,
              {
                opacity: 0,
                y: 30,
                duration: 0.8,
              },
              "-=0.4"
            )
            .from(
              trustImage2,
              {
                opacity: 0,
                y: 80,
                duration: 0.8,
              },
              "-=0.4"
            )
            .from(
              trustLocations,
              {
                opacity: 0,
                y: 30,
                duration: 0.8,
              },
              "-=0.4"
            )
            .from(
              trustImage3,
              {
                opacity: 0,
                y: 60,
                duration: 0.8,
              },
              "-=0.4"
            )
            .from(
              trustDescription,
              {
                opacity: 0,
                y: 30,
                duration: 0.8,
              },
              "-=0.4"
            );
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(trustSection);

  gsap.to(trustImage1.querySelector("img"), {
    y: -150,
    ease: "none",
    scrollTrigger: {
      trigger: trustSection,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(trustImage2.querySelector("img"), {
    y: -100,
    ease: "none",
    scrollTrigger: {
      trigger: trustSection,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(trustImage3.querySelector("img"), {
    y: -40,
    ease: "none",
    scrollTrigger: {
      trigger: trustSection,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(trustTitleBlock, {
    y: -120,
    ease: "none",
    scrollTrigger: {
      trigger: trustSection,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(trustLocations, {
    y: -60,
    ease: "none",
    scrollTrigger: {
      trigger: trustSection,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(trustDescription, {
    y: -20,
    ease: "none",
    scrollTrigger: {
      trigger: trustSection,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
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

function initPersuasionAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const persuasionSection = document.querySelector(".persuasion");
  const headline = document.querySelector(".persuasion__headline");
  const proofText = document.querySelector(".persuasion__proof");
  const image1 = document.querySelector(".persuasion__image--1");
  const image2 = document.querySelector(".persuasion__image--2");
  const image3 = document.querySelector(".persuasion__image--3");
  const bullets = document.querySelectorAll(".persuasion__bullets li");
  const cta = document.querySelector(".persuasion__cta");

  if (!persuasionSection) return;

  let hasEntered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasEntered) {
          hasEntered = true;

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          tl.from(headline, {
            opacity: 0,
            y: 80,
            duration: 0.8,
          })
            .from(
              image1,
              {
                opacity: 0,
                y: 60,
                duration: 0.8,
              },
              "-=0.4"
            )
            .from(
              proofText,
              {
                opacity: 0,
                y: 40,
                duration: 0.8,
              },
              "-=0.4"
            )
            .from(
              image2,
              {
                opacity: 0,
                y: 80,
                duration: 0.8,
              },
              "-=0.4"
            );

          bullets.forEach((bullet) => {
            tl.from(
              bullet,
              {
                opacity: 0,
                y: 30,
                duration: 0.6,
              },
              "-=0.5"
            );
          });

          tl.from(
            image3,
            {
              opacity: 0,
              y: 100,
              duration: 0.8,
            },
            "-=0.4"
          ).from(
            cta,
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
            },
            "-=0.5"
          );
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(persuasionSection);

  gsap.to(image1.querySelector("img"), {
    y: -80,
    ease: "none",
    scrollTrigger: {
      trigger: persuasionSection,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(image2.querySelector("img"), {
    y: -120,
    ease: "none",
    scrollTrigger: {
      trigger: persuasionSection,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(image3.querySelector("img"), {
    y: -60,
    ease: "none",
    scrollTrigger: {
      trigger: persuasionSection,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(headline, {
    y: -100,
    ease: "none",
    scrollTrigger: {
      trigger: persuasionSection,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
}

function initProcessAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const processSection = document.querySelector(".process");
  const headline = document.querySelector(".process__headline");
  const items = document.querySelectorAll(".process__item");
  const cta = document.querySelector(".process__cta");

  if (!processSection) return;

  let hasEntered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasEntered) {
          hasEntered = true;

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
          });

          tl.from(headline, {
            opacity: 0,
            y: 80,
            duration: 0.8,
          });

          items.forEach((item) => {
            const image = item.querySelector(".process__image");
            const step = item.querySelector(".process__step");

            tl.from(
              image,
              {
                opacity: 0,
                y: 60,
                duration: 0.8,
              },
              "-=0.4"
            ).from(
              step,
              {
                opacity: 0,
                y: 40,
                duration: 0.8,
              },
              "-=0.6"
            );
          });

          tl.from(
            cta,
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
            },
            "-=0.4"
          );
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(processSection);

  items.forEach((item) => {
    const image = item.querySelector(".process__image img");

    gsap.to(image, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  gsap.to(headline, {
    y: -60,
    ease: "none",
    scrollTrigger: {
      trigger: processSection,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
}

function init() {
  initLenis();
  initHeaderScroll();
  initHeroSlider();
  initHeroAnimations();
  initIntroAnimation();
  initTrustAnimation();
  initServicesAnimation();
  initPersuasionAnimation();
  initProcessAnimation();
}

init();
