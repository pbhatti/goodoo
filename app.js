(() => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  /* ——— JourneyBoard (data-driven) ——— */
  const journeyRows = [
    [
      {
        type: "milestone",
        month: "Sept",
        year: "2024",
        copy: "Goodoo Animal Welfare Trust was registered.",
        copyMobile: "Goodoo Trust was registered.",
      },
      {
        type: "image",
        src: "assets/story-sitara.jpg",
        alt: "A hopeful rescue dog looking through a green fence",
      },
      {
        type: "milestone",
        month: "Jan",
        year: "2025",
        copy: "Land for Goodoo Rescue and Rehab Centre leased.",
        copyMobile: "Rescue Centre land leased.",
      },
      {
        type: "image",
        src: "assets/golden.png",
        alt: "A golden retriever rescue looking toward the camera",
      },
      {
        type: "milestone",
        month: "Apr",
        year: "2025",
        copy: "Goodoo Rescue and Rehab Centre becomes operational.",
        copyMobile: "Rescue Centre opens.",
      },
    ],
    [
      {
        type: "image",
        src: "assets/AnoopaDog.png",
        alt: "Anoopa Anand with a rescue dog",
      },
      {
        type: "stat",
        value: "150+",
        label: "rescued",
        copy: "Dogs and cats rescued, rehabilitated, and rehomed.",
        copyMobile: "Rescued, rehabbed & rehomed.",
      },
      {
        type: "image",
        src: "assets/hero-dog.jpg",
        alt: "A white rescue dog standing outdoors",
      },
      {
        type: "stat",
        value: "45+",
        label: "adoptions",
        copy: "Successful adoptions…and counting!",
        copyMobile: "Adoptions—and counting!",
      },
      {
        type: "image",
        src: "assets/halfway-home.jpg",
        alt: "A joyful Labrador being gently scratched under the chin",
      },
    ],
    [
      {
        type: "milestone",
        month: "Jan",
        year: "2026",
        copy: "Serene's Home for Senior Dogs becomes operational.",
        copyMobile: "Serene's Home opens.",
      },
      {
        type: "image",
        src: "assets/pack-dogs.jpg",
        alt: "A Goodoo volunteer with a pack of rescued dogs",
      },
      {
        type: "stat",
        value: "100+",
        label: "wards",
        copy: "At Goodoo Rescue and Rehab Centre and Serene's Home for Senior Dogs.",
        copyMobile: "Across Rescue Centre & Serene's Home.",
      },
      {
        type: "image",
        src: "assets/story-beach.jpg",
        alt: "A happy rescue dog outdoors after rehabilitation",
      },
      {
        type: "milestone",
        month: "Apr",
        year: "2026",
        copy: "New lease signed for an additional 30,000sqft. Goodoo 2.0 begins!",
        copyMobile: "30,000sqft lease — Goodoo 2.0 begins!",
      },
    ],
    [
      {
        type: "image",
        src: "assets/rescue-close.jpg",
        alt: "Close-up of a smiling rescue dog",
      },
      {
        type: "milestone",
        month: "May",
        year: "2026",
        copy: "Construction underway at Goodoo 2.0.",
        copyMobile: "Goodoo 2.0 construction underway.",
      },
    ],
  ];

  const journeyCopyHtml = (copy, copyMobile) => `
    <p class="journey-card-copy">
      <span class="journey-card-copy__full">${copy}</span>
      <span class="journey-card-copy__mobile">${copyMobile || copy}</span>
    </p>
  `;

  const MilestoneCard = ({ month, year, copy, copyMobile }) => {
    const article = document.createElement("article");
    article.className = "journey-card journey-card--milestone";
    article.innerHTML = `
      <p class="milestone-date"><span>${month}</span><span>${year}</span></p>
      ${journeyCopyHtml(copy, copyMobile)}
    `;
    return article;
  };

  const StatCard = ({ value, label, copy, copyMobile }) => {
    const article = document.createElement("article");
    article.className = "journey-card journey-card--stat";
    article.innerHTML = `
      <p class="stat-value">${value}<span class="stat-label">${label}</span></p>
      ${journeyCopyHtml(copy, copyMobile)}
    `;
    return article;
  };

  const toWebp = (src) => src.replace(/\.(jpe?g|png)$/i, ".webp");

  const PictureImg = ({ src, alt, width = 800, height = 800, loading = "lazy" }) => {
    const picture = document.createElement("picture");
    const source = document.createElement("source");
    source.srcset = toWebp(src);
    source.type = "image/webp";
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.loading = loading;
    img.decoding = "async";
    img.width = width;
    img.height = height;
    picture.append(source, img);
    return picture;
  };

  const ImageCard = ({ src, alt }) => {
    const figure = document.createElement("figure");
    figure.className = "journey-card journey-card--image";
    figure.appendChild(PictureImg({ src, alt, width: 800, height: 800 }));
    return figure;
  };

  const renderCard = (card) => {
    if (card.type === "milestone") return MilestoneCard(card);
    if (card.type === "stat") return StatCard(card);
    return ImageCard(card);
  };

  const JourneyBoard = (rows, mount) => {
    if (!mount) return;
    mount.replaceChildren();
    rows.forEach((rowCards) => {
      const row = document.createElement("div");
      row.className = "journey-row";
      rowCards.forEach((card) => row.appendChild(renderCard(card)));
      mount.appendChild(row);
    });
  };

  JourneyBoard(journeyRows, document.querySelector("[data-journey-board]"));

  /* ——— Rescue stories carousel ——— */
  const donateCta = (name) => ({
    href: "#donate",
    label: `Help the next ${name} heal →`,
  });

  const rescueStories = [
    {
      id: 1,
      image1: "assets/story-sitara.png",
      image1Alt: "Sitara, a Great Dane puppy, in a crate with bandaged front legs during rescue",
      image2: "assets/story-beach.png",
      image2Alt: "Sitara healthy and free on a sandy beach after rehabilitation",
      meta: "Great Dane · Female · Puppy",
      title: "Sitara",
      description: [
        "Sitara was Goodoo’s first official rescue. A Great Dane who was caged most of her life till she was abandoned in a desolate area, Sitara had multiple broken bones and hairline fractures, and a completely twisted spine. After months of rehabilitation, Sitara was adopted into a wonderful home with a pack of rescue dogs to call her own!",
      ],
      cta: donateCta("Sitara"),
    },
    {
      id: 2,
      image1: "assets/story-sundari-1.png",
      image1Alt: "Sundari looking up from a shelter enclosure after rescue",
      image2: "assets/story-sundari-2.png",
      image2Alt: "Sundari resting outdoors, safe and at ease at Goodoo Halfway Home",
      meta: "Rottweiler · Female",
      title: "Sundari",
      description: [
        "Sundari lived her entire life in a captive breeding facility before being abandoned. By the time she was rescued, she had lost the use of her hind legs due to extreme physical abuse, diet-related obesity, and the sheer number of litters she was made to have. Months of rehabilitation later, today Sundari is safe and happy at Goodoo Halfway Home.",
      ],
      cta: donateCta("Sundari"),
    },
    {
      id: 3,
      image1: "assets/story-mimi-1.png",
      image1Alt: "Mimi nursing her puppies at Goodoo Halfway Home",
      image2: "assets/story-mimi-2.png",
      image2Alt: "Mimi resting with her puppies in a sheltered space at Goodoo",
      meta: "Indie · Female",
      title: "Mimi",
      description: [
        "Mimi is a feral community dog who was rescued from a neighbourhood when she was almost full-term. The hostile neighbours were attempting to poison her so she wouldn’t have her litter on the street. Mimi came to Goodoo a day before she delivered. As we write, Mimi and her 7 puppies are safe and healthy at Goodoo Halfway Home.",
      ],
      cta: donateCta("Mimi"),
    },
    {
      id: 4,
      image1: "assets/story-sweetie-1.png",
      image1Alt: "Sweetie sitting beside her newborn puppies in a basin after rescue",
      image2: "assets/story-sweetie-2.png",
      image2Alt: "Sweetie resting with her puppies on a blanket, safe in Goodoo’s care",
      meta: "Indian Spitz · Female",
      title: "Sweetie",
      description: [
        "Sweetie accidentally mated with an Indy and had two healthy puppies. However, she and her litter were deemed useless by the breeder and dumped together in a cement mixing trough, in the middle of a public park. Sweetie’s puppies were a mere 5 days old when the three of them were rescued. All three are now safe and sound in Goodoo’s care.",
      ],
      cta: donateCta("Sweetie"),
    },
    {
      id: 5,
      image1: "assets/story-mitra-1.png",
      image1Alt: "Mitra after reconstructive surgery on facial wounds from rescue",
      image2: "assets/story-mitra-2.png",
      image2Alt: "Mitra recovered and looking up, now at Goodoo Halfway Home",
      meta: "Male · Halfway Home",
      title: "Mitra",
      description: [
        "Like so many purebred dogs, Mitra was discarded when he became an inconvenience, after the family had a baby. He was found with maggot wounds having eaten up half his face. After many weeks in hospital and a reconstructive facial surgery, Mitra came to Goodoo Halfway Home, where he is cherished for his intelligence and fine personality.",
      ],
      cta: donateCta("Mitra"),
    },
    {
      id: 6,
      image1: "assets/story-shilo-1.png",
      image1Alt: "Shilo on a veterinary table after rescue, receiving medical care",
      image2: "assets/story-shilo-2.png",
      image2Alt: "Shilo resting on the grass at Goodoo, looking toward the camera",
      meta: "Super-senior · Female",
      title: "Shilo",
      description: [
        "Shilo was found tied to an abandoned vegetable cart with a massive tumour in her anus. As a super-senior dog, the prognosis was bleak initially, but she took four rounds of chemo very well. She made it through two surgeries to remove the remnants of the growths. She is now at Goodoo, living out the rest of her life with us.",
      ],
      cta: donateCta("Shilo"),
    },
  ];

  const StorySlide = (story, index, total) => {
    const article = document.createElement("article");
    article.className = "story-slide";
    article.dataset.storySlide = "";
    article.setAttribute("aria-roledescription", "slide");
    article.setAttribute("aria-label", `${index + 1} of ${total}`);

    const paragraphs = story.description
      .map((text) => `<p>${text}</p>`)
      .join("");

    const webpTag = (src) =>
      /\.jpe?g$/i.test(src) ? `<source srcset="${toWebp(src)}" type="image/webp" />` : "";

    article.innerHTML = `
      <figure class="story-card story-card--image">
        <picture>
          ${webpTag(story.image1)}
          <img src="${story.image1}" alt="${story.image1Alt}" width="900" height="1200" loading="lazy" decoding="async" />
        </picture>
      </figure>
      <figure class="story-card story-card--image story-card--image-secondary">
        <picture>
          ${webpTag(story.image2)}
          <img src="${story.image2}" alt="${story.image2Alt}" width="1000" height="1100" loading="lazy" decoding="async" />
        </picture>
      </figure>
      <div class="story-card story-card--content">
        <p class="story-meta">${story.meta}</p>
        <h3>${story.title}</h3>
        ${paragraphs}
        <a class="text-link" href="${story.cta.href}">${story.cta.label}</a>
      </div>
    `;
    return article;
  };

  const StoriesCarousel = (root, stories) => {
    if (!root || !stories?.length) return;

    const track = root.querySelector("[data-stories-track]");
    const viewport = root.querySelector(".stories-viewport");
    const prevBtn = root.querySelector("[data-stories-prev]");
    const nextBtn = root.querySelector("[data-stories-next]");
    const dotsMount = root.querySelector("[data-stories-dots]");
    if (!track) return;

    track.replaceChildren();
    const slides = stories.map((story, i) => {
      const slide = StorySlide(story, i, stories.length);
      track.appendChild(slide);
      return slide;
    });

    let activeIndex = 0;
    const total = slides.length;
    const dots = [];
    const mobileMq = window.matchMedia("(max-width: 61.1875rem)");
    const isMobile = () => mobileMq.matches;

    const syncUi = (index) => {
      activeIndex = Math.max(0, Math.min(index, total - 1));

      slides.forEach((slide, i) => {
        const isActive = i === activeIndex;
        slide.setAttribute("aria-hidden", String(!isActive));
        slide.setAttribute("aria-label", `${i + 1} of ${total}`);
        slide.inert = !isActive;
      });

      dots.forEach((dot, i) => {
        const isActive = i === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", String(isActive));
        dot.tabIndex = isActive ? 0 : -1;
      });

      if (prevBtn) prevBtn.disabled = activeIndex === 0;
      if (nextBtn) nextBtn.disabled = activeIndex === total - 1;
    };

    const syncMobileChrome = () => {
      const controls = root.querySelector(".stories-controls");
      if (!controls) return;
      if (isMobile()) {
        controls.hidden = true;
        controls.setAttribute("aria-hidden", "true");
      } else {
        controls.hidden = false;
        controls.removeAttribute("aria-hidden");
      }
    };

    const setActive = (index, { smooth = true } = {}) => {
      syncUi(index);

      if (isMobile()) {
        track.style.transform = "";
        const slide = slides[activeIndex];
        if (viewport && slide) {
          viewport.scrollTo({
            left: slide.offsetLeft - (parseFloat(getComputedStyle(track).paddingLeft) || 0),
            behavior: smooth ? "smooth" : "auto",
          });
        }
        return;
      }

      if (viewport) viewport.scrollLeft = 0;
      track.style.transform = `translateX(-${activeIndex * 100}%)`;
    };

    if (dotsMount) {
      dotsMount.replaceChildren();
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "stories-dot";
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", `Go to rescue story ${i + 1}`);
        dot.addEventListener("click", () => setActive(i));
        dotsMount.appendChild(dot);
        dots.push(dot);
      });
    }

    prevBtn?.addEventListener("click", () => setActive(activeIndex - 1));
    nextBtn?.addEventListener("click", () => setActive(activeIndex + 1));

    root.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActive(activeIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActive(activeIndex + 1);
      }
    });

    if (viewport) {
      let ticking = false;
      viewport.addEventListener(
        "scroll",
        () => {
          if (!isMobile() || ticking) return;
          ticking = true;
          requestAnimationFrame(() => {
            ticking = false;
            const left = viewport.scrollLeft;
            let closest = 0;
            let closestDist = Infinity;
            slides.forEach((slide, i) => {
              const dist = Math.abs(slide.offsetLeft - left);
              if (dist < closestDist) {
                closestDist = dist;
                closest = i;
              }
            });
            if (closest !== activeIndex) syncUi(closest);
          });
        },
        { passive: true }
      );
    }

    const onBreakpointChange = () => {
      syncMobileChrome();
      setActive(activeIndex, { smooth: false });
    };
    if (mobileMq.addEventListener) {
      mobileMq.addEventListener("change", onBreakpointChange);
    } else if (mobileMq.addListener) {
      mobileMq.addListener(onBreakpointChange);
    }

    syncMobileChrome();
    setActive(0, { smooth: false });
  };

  StoriesCarousel(document.querySelector("[data-stories-carousel]"), rescueStories);

  /* ——— Our Centre accordion gallery ——— */
  const CentreGallery = (root) => {
    if (!root) return;
    const track = root.querySelector(".accordion-gallery");
    const panels = [...root.querySelectorAll("[data-accordion-panel]")];
    if (!track || !panels.length) return;

    const parsedDefault = Number.parseInt(root.dataset.defaultIndex ?? "2", 10);
    const defaultIndex = Number.isFinite(parsedDefault)
      ? Math.min(panels.length - 1, Math.max(0, parsedDefault))
      : 2;
    const hoverTrigger = (root.dataset.trigger || "hover") === "hover";
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const expandRatio = Number.parseFloat(root.dataset.expandRatio || "0.52");
    root.style.setProperty("--ag-count", String(panels.length));
    if (Number.isFinite(expandRatio) && expandRatio > 0.2 && expandRatio < 0.9) {
      root.style.setProperty("--ag-expand-ratio", String(expandRatio));
    }
    let activeIndex = defaultIndex;

    const setActive = (index) => {
      const next = Math.max(0, Math.min(panels.length - 1, index));
      if (next === activeIndex && panels[next].classList.contains("is-active")) return;
      activeIndex = next;
      panels.forEach((panel, i) => {
        const active = i === next;
        panel.classList.toggle("is-active", active);
        panel.setAttribute("aria-pressed", active ? "true" : "false");
        if (active) {
          panel.removeAttribute("data-tilt");
        } else {
          panel.setAttribute("data-tilt", i < next ? "left" : "right");
        }
      });
    };

    const panelAtPoint = (clientX) => {
      let nearest = 0;
      let best = Infinity;
      panels.forEach((panel, index) => {
        const rect = panel.getBoundingClientRect();
        const mid = (rect.left + rect.right) / 2;
        const dist = Math.abs(clientX - mid);
        if (dist < best) {
          best = dist;
          nearest = index;
        }
      });
      return nearest;
    };

    panels.forEach((panel, index) => {
      panel.addEventListener("focus", () => setActive(index));
      panel.addEventListener("click", () => setActive(index));
    });

    track.addEventListener("pointermove", (event) => {
      if (!hoverTrigger || !hoverMq.matches || event.pointerType !== "mouse") return;
      const panel = event.target.closest("[data-accordion-panel]");
      setActive(panel ? panels.indexOf(panel) : panelAtPoint(event.clientX));
    });

    root.addEventListener("pointerleave", (event) => {
      if (!hoverTrigger || !hoverMq.matches || event.pointerType !== "mouse") return;
      setActive(defaultIndex);
    });

    track.addEventListener("keydown", (event) => {
      const keys = { ArrowLeft: -1, ArrowRight: 1, Home: "home", End: "end" };
      const action = keys[event.key];
      if (action == null) return;
      event.preventDefault();
      const next =
        action === "home" ? 0 : action === "end" ? panels.length - 1 : activeIndex + action;
      setActive(next);
      panels[activeIndex].focus();
    });

    setActive(defaultIndex);
  };

  CentreGallery(document.querySelector("[data-centre-gallery]"));

  /* Active nav underline based on scroll position */
  const navLinks = [...document.querySelectorAll("[data-nav-link]")];
  const navSections = navLinks
    .map((link) => {
      const id = link.getAttribute("href")?.slice(1);
      const section = id ? document.getElementById(id) : null;
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  const setActiveNav = () => {
    if (!navSections.length) return;
    const offset = 120;
    const firstTop = navSections[0].section.offsetTop;
    if (window.scrollY + offset < firstTop) {
      navLinks.forEach((link) => link.classList.remove("is-active"));
      return;
    }
    const probe = window.scrollY + window.innerHeight * 0.28;
    let current = navSections[0];
    navSections.forEach((item) => {
      if (item.section.offsetTop <= probe) current = item;
    });
    navLinks.forEach((link) => link.classList.toggle("is-active", link === current?.link));
  };

  setActiveNav();
  window.addEventListener("scroll", setActiveNav, { passive: true });

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && header && mobileNav) {
    const setMenuOpen = (open) => {
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      mobileNav.hidden = !open;
      document.body.style.overflow = open ? "hidden" : "";
      if (open) {
        mobileNav.querySelector("a")?.focus();
      } else {
        toggle.focus();
      }
    };

    toggle.addEventListener("click", () => {
      setMenuOpen(!header.classList.contains("is-open"));
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && header.classList.contains("is-open")) {
        setMenuOpen(false);
      }
    });

    const desktopNavMq = window.matchMedia("(min-width: 61.25rem)");
    const onDesktopNavChange = (event) => {
      if (event.matches && header.classList.contains("is-open")) {
        setMenuOpen(false);
      }
    };
    if (desktopNavMq.addEventListener) {
      desktopNavMq.addEventListener("change", onDesktopNavChange);
    } else if (desktopNavMq.addListener) {
      desktopNavMq.addListener(onDesktopNavChange);
    }
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const saveData =
    navigator.connection?.saveData ||
    /2g/.test(navigator.connection?.effectiveType || "");
  const syncLazyVideo = (video) => {
    if (!video) return;
    const src = video.getAttribute("data-src");
    if (!src) return;
    if (prefersReducedMotion.matches || saveData) {
      video.pause?.();
      video.removeAttribute("autoplay");
      video.removeAttribute("src");
      video.load?.();
      return;
    }
    if (video.getAttribute("src") !== src) {
      video.setAttribute("src", src);
      video.load?.();
    }
    video.setAttribute("autoplay", "");
    video.play?.().catch(() => {});
  };
  const heroVideo = document.querySelector(".hero-video");
  const donateVideo = document.querySelector(".donate-shell-video");
  syncLazyVideo(heroVideo);
  prefersReducedMotion.addEventListener?.("change", () => {
    syncLazyVideo(heroVideo);
    syncLazyVideo(donateVideo);
  });
  if (donateVideo) {
    if ("IntersectionObserver" in window) {
      const donateVideoIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) syncLazyVideo(donateVideo);
            else donateVideo.pause?.();
          });
        },
        { rootMargin: "240px 0px" }
      );
      donateVideoIo.observe(donateVideo);
    } else {
      syncLazyVideo(donateVideo);
    }
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -100px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  requestAnimationFrame(() => {
    document.querySelectorAll(".hero .reveal").forEach((el) => {
      el.classList.add("is-visible");
    });
  });

  const formatINR = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n);

  const formatDonateAmount = (n) =>
    `₹ ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n)}`;

  const bankNote = document.querySelector("[data-bank-note]");

  /**
   * Structured handoff for a future payment gateway.
   * Swap the console.log body for Razorpay / Stripe / etc.
   */
  const submitDonation = (payload) => {
    console.log(payload);
    return payload;
  };

  const initDonationForm = (form) => {
    const state = {
      frequency: "monthly",
      amount: 2000,
      isOther: false,
      customAmount: "",
    };

    const heading = form.querySelector("[data-donation-heading]");
    const submitBtn = form.querySelector("[data-donation-submit]");
    const freqButtons = form.querySelectorAll("[data-freq]");
    const amountButtons = form.querySelectorAll(".donation-amount");
    const customWrap = form.querySelector("[data-custom-amount-wrap]");
    const customInput = form.querySelector("[data-custom-amount]");
    const customError = form.querySelector("[data-custom-error]");

    const syncHeading = ({ animate = false } = {}) => {
      if (!heading) return;
      const isBlessTheme =
        document.documentElement.getAttribute("data-theme") === "green-4" ||
        document.documentElement.getAttribute("data-theme") === "option-1";
      if (isBlessTheme) {
        heading.innerHTML = `Choose an amount<br />to donate`;
        return;
      }
      const phrase = state.frequency === "monthly" ? "per month" : "once";
      heading.innerHTML = `Choose an amount<br />to donate <div class="fx-marker">${phrase}</div>`;
      if (!animate) return;
      const marker = heading.querySelector(".fx-marker");
      if (!marker) return;
      void marker.offsetWidth;
      marker.classList.add("is-active");
    };

    const getResolvedAmount = () => {
      if (state.isOther) {
        const value = Number(state.customAmount);
        return Number.isFinite(value) && value > 0 ? value : null;
      }
      return state.amount;
    };

    const syncSubmitLabel = () => {
      if (!submitBtn) return;
      const amount = getResolvedAmount();
      const cadence = state.frequency === "monthly" ? "monthly" : "once";

      if (!amount) {
        submitBtn.innerHTML = `Donate today <span class="donation-submit-arrow" aria-hidden="true">→</span>`;
        return;
      }

      submitBtn.innerHTML = `Donate <span class="donation-submit-amount">${formatDonateAmount(
        amount
      )}</span> ${cadence} <span class="donation-submit-arrow" aria-hidden="true">→</span>`;
    };

    const syncBankNote = () => {
      if (!bankNote || !form.closest("[data-donate-panel]")) return;
      const amount = getResolvedAmount();
      if (!amount) {
        bankNote.innerHTML = "Choose an amount above, then transfer using the details below.";
        return;
      }
      bankNote.innerHTML = `Suggested transfer: <strong>${formatINR(amount)}</strong> (${
        state.frequency === "monthly" ? "monthly" : "one-time"
      }).`;
    };

    const setFrequency = (frequency) => {
      state.frequency = frequency;
      freqButtons.forEach((btn) => {
        const selected = btn.dataset.freq === frequency;
        btn.classList.toggle("is-selected", selected);
        btn.setAttribute("aria-pressed", String(selected));
      });
      syncHeading({ animate: true });
      syncSubmitLabel();
      syncBankNote();
    };

    const setPresetAmount = (amount) => {
      state.isOther = false;
      state.amount = amount;
      state.customAmount = "";
      if (customInput) customInput.value = "";
      if (customWrap) customWrap.hidden = true;
      if (customError) customError.hidden = true;

      amountButtons.forEach((btn) => {
        const selected = btn.dataset.amount === String(amount);
        btn.classList.toggle("is-selected", selected);
        btn.setAttribute("aria-pressed", String(selected));
      });
      syncSubmitLabel();
      syncBankNote();
    };

    const setOtherAmount = () => {
      state.isOther = true;
      amountButtons.forEach((btn) => {
        const selected = btn.dataset.amount === "other";
        btn.classList.toggle("is-selected", selected);
        btn.setAttribute("aria-pressed", String(selected));
      });
      if (customWrap) customWrap.hidden = false;
      if (customError) customError.hidden = true;
      customInput?.focus();
      syncSubmitLabel();
      syncBankNote();
    };

    freqButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        setFrequency(btn.dataset.freq === "once" ? "once" : "monthly");
      });
    });

    amountButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.amount === "other") {
          setOtherAmount();
          return;
        }
        setPresetAmount(Number(btn.dataset.amount) || 2000);
      });
    });

    customInput?.addEventListener("input", () => {
      const digitsOnly = customInput.value.replace(/\D/g, "").slice(0, 7);
      if (customInput.value !== digitsOnly) {
        customInput.value = digitsOnly;
      }
      state.customAmount = digitsOnly;
      if (customError) customError.hidden = true;
      syncSubmitLabel();
      syncBankNote();
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const amount = getResolvedAmount();

      if (state.isOther && !amount) {
        if (customError) customError.hidden = false;
        customInput?.focus();
        return;
      }

      const payload = {
        frequency: state.frequency === "monthly" ? "monthly" : "one-time",
        amount,
      };

      submitDonation(payload);
    });

    syncHeading();
    syncSubmitLabel();
    syncBankNote();
  };

  const initAdvisorPopovers = () => {
    const cards = [...document.querySelectorAll("[data-advisor]")];
    if (!cards.length) return;

    const mobileMq = window.matchMedia("(max-width: 61.1875rem)");
    const isMobile = () => mobileMq.matches;
    const backdrop = document.querySelector("[data-advisor-backdrop]");
    const homes = new WeakMap();
    let openCard = null;
    let restoreTimer = 0;

    const popoverFor = (card) => {
      const id = card.querySelector("[data-advisor-trigger]")?.getAttribute("aria-controls");
      return id ? document.getElementById(id) : card.querySelector("[data-advisor-popover]");
    };

    const clearPlace = (popover) => {
      if (!popover) return;
      popover.style.top = "";
      popover.style.bottom = "";
    };

    const park = (popover) => {
      if (!popover || popover.parentElement === document.body) return;
      homes.set(popover, { parent: popover.parentElement, next: popover.nextSibling });
      document.body.appendChild(popover);
    };

    const restore = (popover) => {
      const slot = homes.get(popover);
      if (!slot?.parent) return;
      if (slot.next) slot.parent.insertBefore(popover, slot.next);
      else slot.parent.appendChild(popover);
      homes.delete(popover);
      clearPlace(popover);
    };

    const setBackdrop = (open) => {
      if (!backdrop) return;
      backdrop.hidden = !open;
      backdrop.classList.toggle("is-open", open);
    };

    const setExpanded = (card, open) => {
      const trigger = card.querySelector("[data-advisor-trigger]");
      const popover = popoverFor(card);
      card.classList.toggle("is-open", open);
      popover?.classList.toggle("is-open", open);
      trigger?.setAttribute("aria-expanded", open ? "true" : "false");
      if (!popover) return;
      popover.setAttribute("aria-hidden", open ? "false" : "true");
      popover.inert = !open;
      if (open && isMobile()) {
        popover.setAttribute("role", "dialog");
        popover.setAttribute("aria-modal", "true");
        popover.setAttribute("tabindex", "-1");
      } else {
        popover.setAttribute("role", "region");
        popover.removeAttribute("aria-modal");
        popover.removeAttribute("tabindex");
      }
    };

    const place = (card) => {
      const popover = popoverFor(card);
      const trigger = card.querySelector("[data-advisor-trigger]");
      if (!popover || !trigger) return;
      if (isMobile()) {
        clearPlace(popover);
        return;
      }
      const triggerRect = trigger.getBoundingClientRect();
      const popoverHeight = popover.offsetHeight || 220;
      const gap = 2;
      const spaceBelow = window.innerHeight - triggerRect.bottom - gap;
      const spaceAbove = triggerRect.top - gap;
      const prefersTop = spaceBelow < popoverHeight + 16 && spaceAbove > spaceBelow;
      card.dataset.placement = prefersTop ? "top" : "bottom";
      const offset = `${trigger.offsetHeight + 2}px`;
      if (prefersTop) {
        popover.style.top = "auto";
        popover.style.bottom = offset;
      } else {
        popover.style.bottom = "auto";
        popover.style.top = offset;
      }
    };

    const close = (card = openCard) => {
      if (!card) return;
      const trigger = card.querySelector("[data-advisor-trigger]");
      const popover = popoverFor(card);
      const wasMobileSheet = popover?.parentElement === document.body;
      setExpanded(card, false);
      setBackdrop(false);
      document.body.style.overflow = "";
      if (openCard === card) openCard = null;
      if (wasMobileSheet && popover) {
        window.clearTimeout(restoreTimer);
        restoreTimer = window.setTimeout(() => restore(popover), 500);
      }
    };

    const open = (card) => {
      if (openCard && openCard !== card) close(openCard);
      const popover = popoverFor(card);
      window.clearTimeout(restoreTimer);
      if (isMobile() && popover) {
        park(popover);
        setBackdrop(true);
        document.body.style.overflow = "hidden";
      }
      setExpanded(card, true);
      openCard = card;
      place(card);
      if (isMobile()) popover?.focus();
    };

    cards.forEach((card) => {
      const trigger = card.querySelector("[data-advisor-trigger]");
      trigger?.addEventListener("click", (event) => {
        event.stopPropagation();
        if (card.classList.contains("is-open")) close(card);
        else open(card);
      });
    });

    document.addEventListener("click", (event) => {
      if (!openCard || isMobile()) return;
      const popover = popoverFor(openCard);
      if (openCard.contains(event.target) || popover?.contains(event.target)) return;
      close();
    });

    backdrop?.addEventListener("click", () => {
      const trigger = openCard?.querySelector("[data-advisor-trigger]");
      close();
      trigger?.focus();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !openCard) return;
      const trigger = openCard.querySelector("[data-advisor-trigger]");
      close();
      trigger?.focus();
    });

    const reposition = () => {
      if (!openCard) return;
      const popover = popoverFor(openCard);
      if (isMobile()) {
        if (popover) park(popover);
        setBackdrop(true);
        document.body.style.overflow = "hidden";
        place(openCard);
        return;
      }
      if (popover?.parentElement === document.body) restore(popover);
      setBackdrop(false);
      document.body.style.overflow = "";
      place(openCard);
    };
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", () => {
      if (openCard && !isMobile()) place(openCard);
    }, { passive: true });
  };

  initAdvisorPopovers();

  document.querySelectorAll("[data-donation-form]").forEach(initDonationForm);

  document.querySelectorAll("[data-copy-btn]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy-btn") || "";
      const label = btn.getAttribute("aria-label") || "Copy";
      const idle = btn.querySelector("[data-copy-idle]");
      try {
        await navigator.clipboard.writeText(value);
        btn.classList.add("is-copied");
        btn.setAttribute("aria-label", `${label.replace(/^Copy /, "Copied ")}`);
        setTimeout(() => {
          btn.classList.remove("is-copied");
          btn.setAttribute("aria-label", label);
        }, 1600);
      } catch {
        if (idle) idle.textContent = "Select & copy";
        else btn.textContent = "Select & copy";
      }
    });
  });
})();
