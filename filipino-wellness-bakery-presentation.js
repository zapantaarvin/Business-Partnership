const setupCarousel = (root) => {
  const panels = Array.from(root.querySelectorAll(".carousel-panel"));
  const tabs = Array.from(root.querySelectorAll("[data-carousel-jump]"));
  const prev = root.querySelector("[data-carousel-prev]");
  const next = root.querySelector("[data-carousel-next]");
  const status = root.querySelector("[data-carousel-status]");
  let index = 0;

  const render = () => {
    panels.forEach((panel, panelIndex) => {
      panel.classList.toggle("is-active", panelIndex === index);
    });

    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (status) {
      status.textContent = `Section ${index + 1} of ${panels.length}`;
    }

    if (prev) {
      prev.disabled = index === 0;
    }

    if (next) {
      next.disabled = index === panels.length - 1;
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      index = Number(tab.dataset.carouselJump);
      render();
    });
  });

  if (prev) {
    prev.addEventListener("click", () => {
      if (index > 0) {
        index -= 1;
        render();
      }
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      if (index < panels.length - 1) {
        index += 1;
        render();
      }
    });
  }

  render();
};

document.querySelectorAll("[data-carousel]").forEach(setupCarousel);
