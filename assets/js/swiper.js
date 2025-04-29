const leadersSwiper = new Swiper(".leaders_swiper", {
  loop: true,
  centeredSlides: true,
  pagination: {
    el: ".leaders_swiper .swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".leaders_swiper .swiper-button-next",
    prevEl: ".leaders_swiper .swiper-button-prev",
  },
});

const advantageSwiper = new Swiper(".advantages_swiper", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween:
    parseInt(
      window
        .getComputedStyle(
          document.querySelector(".advantages_swiper .swiper-wrapper")
        )
        .getPropertyValue("gap")
    ) || 0,
  pagination: {
    el: ".advantages_swiper .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    480: {
      loop: false,
    },
  },
});
