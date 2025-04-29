document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  function animateCoin(coin, index) {
    gsap.set(coin, {
      duration: 0.5,
      opacity: 0,
      scale: 0.5,
      rotation: -180,
    });

    const tl = gsap.timeline({ delay: index });

    tl.to(coin, {
      duration: 1,
      scale: 1,
      rotation: 0,
      opacity: 1,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: coin,
        start: "top 80%",
      },
      onComplete: () =>
        gsap.to(coin, {
          y: "-=10",
          duration: 2,
          scale: 1,
          rotation: 0,
          opacity: 1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          rotation: "+=5",
        }),
    });
  }
  function animateCounter(counterElement) {
    const targetValue = parseFloat(counterElement.getAttribute("data-target"));

    if (isNaN(targetValue)) {
      console.error("target value not a number", counterElement);
      return;
    }
    const decimalPlaces = Number.isInteger(targetValue) ? 0 : 1;

    let obj = { val: 0 };

    gsap.to(obj, {
      val: targetValue,
      duration: 3.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: counterElement,
        start: "top 80%",
        once: true,
      },
      onUpdate: () =>
        (counterElement.textContent = obj.val.toFixed(decimalPlaces)),
    });
  }
  const Sections = [
    {
      id: "stats",
      animate: animateCounter,
    },
    // {
    //   id: "trades",
    //   animate: animateCoin,
    // },
    // {
    //   id: "leaders",
    //   animate: animateCoin,
    // },
  ];

  Sections.forEach((s) => {
    const selector = `[data-section=${s.id}]`;
    ScrollTrigger.create({
      once: true,
      trigger: document.querySelector(selector),
      onEnter: () => {
        const elemsToAnimate = document.querySelectorAll(
          `${selector} [data-animate]`
        );
        elemsToAnimate.forEach((e, i) => s.animate(e, i));
      },
    });
  });
});
