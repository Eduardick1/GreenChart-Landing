document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  function animateCoin(coin, index) {
    gsap.to(coin, {
      delay: index,
      y: "-=10",
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      rotation: "+=10",
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
    {
      id: "trades",
      animate: animateCoin,
    },
    {
      id: "leaders",
      animate: animateCoin,
    },
  ];

  Sections.forEach((s) => {
    const selector = `[data-section=${s.id}]`;
    ScrollTrigger.create({
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
