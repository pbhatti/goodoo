(() => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  const THEME_KEY = "goodoo-theme";
  const THEME_LABELS = { "green-1": "Green 1", "green-2": "Green 2", "green-3": "Green 3", "green-4": "Green 4" };
  const THEMES = Object.keys(THEME_LABELS);

  const initThemeSwitcher = () => {
    const root = document.documentElement;
    const switcher = document.querySelector("[data-theme-switcher]");
    const layer = document.querySelector("[data-theme-layer]");
    if (!switcher || !layer) return;

    const themeToggle = switcher.querySelector("[data-theme-toggle]");
    const backdrop = layer.querySelector("[data-theme-backdrop]");
    const sheet = layer.querySelector("[data-theme-sheet]");
    const menu = layer.querySelector("#theme-menu");
    const label = switcher.querySelector("[data-theme-label]");
    const options = [...layer.querySelectorAll("[data-theme-option]")];
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const mobileMq = window.matchMedia("(max-width: 61.1875rem)");

    const normalizeTheme = (theme) => (theme === "green-5" ? "green-4" : theme);
    const getTheme = () => {
      const theme = normalizeTheme(root.getAttribute("data-theme"));
      return THEMES.includes(theme) ? theme : "green-2";
    };
    const isMobile = () => mobileMq.matches;
    const isNavOpen = () => document.querySelector("[data-header]")?.classList.contains("is-open");

    const applyTheme = (theme) => {
      theme = normalizeTheme(theme);
      if (!THEMES.includes(theme)) theme = "green-2";
      root.setAttribute("data-theme", theme);
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (e) {}
      if (label) label.textContent = THEME_LABELS[theme];
      options.forEach((option) => {
        const selected = option.getAttribute("data-theme-option") === theme;
        option.classList.toggle("is-selected", selected);
        option.setAttribute("aria-selected", selected ? "true" : "false");
      });
      if (themeColorMeta) {
        const accent = getComputedStyle(root).getPropertyValue("--theme-accent").trim();
        if (accent) themeColorMeta.setAttribute("content", accent);
      }
    };

    const positionSheet = () => {
      if (!sheet || !themeToggle) return;
      if (isMobile()) {
        sheet.style.top = "";
        sheet.style.left = "";
        sheet.style.right = "";
        return;
      }
      const rect = themeToggle.getBoundingClientRect();
      sheet.style.top = `${Math.round(rect.bottom + 7)}px`;
      sheet.style.left = `${Math.round(rect.left)}px`;
      sheet.style.right = "auto";
    };

    const setOpen = (open) => {
      switcher.classList.toggle("is-open", open);
      layer.classList.toggle("is-open", open);
      themeToggle?.setAttribute("aria-expanded", open ? "true" : "false");
      themeToggle?.setAttribute("aria-haspopup", isMobile() ? "dialog" : "listbox");
      menu?.setAttribute("aria-hidden", open ? "false" : "true");

      if (sheet) {
        if (open && isMobile()) {
          sheet.setAttribute("role", "dialog");
          sheet.setAttribute("aria-modal", "true");
          sheet.setAttribute("aria-labelledby", "theme-sheet-title");
        } else {
          sheet.removeAttribute("role");
          sheet.removeAttribute("aria-modal");
          sheet.removeAttribute("aria-labelledby");
        }
      }

      if (backdrop) {
        const showBackdrop = open && isMobile();
        backdrop.hidden = !showBackdrop;
      }

      if (open && isMobile()) {
        document.body.style.overflow = "hidden";
      } else if (!isNavOpen()) {
        document.body.style.overflow = "";
      }

      if (open) {
        positionSheet();
        if (isMobile()) {
          options.find((option) => option.classList.contains("is-selected"))?.focus();
        }
      }
    };

    applyTheme(getTheme());
    setOpen(false);

    themeToggle?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!switcher.classList.contains("is-open"));
    });

    options.forEach((option) => {
      option.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        applyTheme(option.getAttribute("data-theme-option"));
        setOpen(false);
        themeToggle?.focus();
      });
    });

    backdrop?.addEventListener("click", () => {
      setOpen(false);
      themeToggle?.focus();
    });

    document.addEventListener("pointerdown", (event) => {
      if (!layer.classList.contains("is-open")) return;
      const target = event.target;
      if (switcher.contains(target) || layer.contains(target)) return;
      setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (!layer.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        setOpen(false);
        themeToggle?.focus();
      }
    });

    window.addEventListener(
      "resize",
      () => {
        if (!layer.classList.contains("is-open")) return;
        if (!isMobile()) {
          if (backdrop) backdrop.hidden = true;
          sheet?.setAttribute("aria-modal", "false");
          if (!isNavOpen()) document.body.style.overflow = "";
        }
        positionSheet();
      },
      { passive: true }
    );

    const onMobileChange = () => {
      if (layer.classList.contains("is-open")) setOpen(false);
    };
    if (mobileMq.addEventListener) {
      mobileMq.addEventListener("change", onMobileChange);
    } else if (mobileMq.addListener) {
      mobileMq.addListener(onMobileChange);
    }
  };

  initThemeSwitcher();

  /* ——— JourneyBoard (data-driven) ——— */
  const journeyRows = [
    [
      {
        type: "milestone",
        month: "Sept",
        year: "2024",
        copy: "Goodoo Animal Welfare was registered this year.",
        copyMobile: "Goodoo was registered this year.",
      },
      {
        type: "image",
        src: "assets/story-sitara.jpg",
        alt: "A hopeful rescue dog looking through a green fence",
      },
      {
        type: "stat",
        value: "80",
        label: "rescues",
        copy: "Our rescues include dogs, cats, and urban wildlife.",
        copyMobile: "Dogs, cats & urban wildlife.",
      },
      {
        type: "image",
        src: "assets/golden.png",
        alt: "A golden retriever rescue looking toward the camera",
      },
      {
        type: "stat",
        value: "10",
        label: "adoptions",
        copy: "Successful dog and cat adoptions. And counting.",
        copyMobile: "Dog & cat adoptions—and counting.",
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
        value: "45",
        label: "wards",
        copy: "Currently home to 38 rescues, with Phase 1 construction having made room for 45.",
        copyMobile: "Home to 38; room for 45.",
      },
      {
        type: "image",
        src: "assets/hero-dog.jpg",
        alt: "A white rescue dog standing outdoors",
      },
      {
        type: "milestone",
        month: "Jan",
        year: "2025",
        copy: "Signed a lease agreement for Goodoo Halfway Home.",
        copyMobile: "Halfway Home lease signed.",
      },
      {
        type: "image",
        src: "assets/halfway-home.jpg",
        alt: "A joyful Labrador being gently scratched under the chin",
      },
    ],
    [
      {
        type: "stat",
        value: "77",
        label: "releases",
        copy: "Over 65 in-patient releases and 12 treat-and-release cases.",
        copyMobile: "65 in-patient + 12 T&R cases.",
      },
      {
        type: "image",
        src: "assets/pack-dogs.jpg",
        alt: "A Goodoo volunteer with a pack of rescued dogs",
      },
      {
        type: "milestone",
        month: "April",
        year: "2025",
        copy: "Moved existing 38 rescued dogs into Goodoo Halfway Home.",
        copyMobile: "38 dogs into Halfway Home.",
      },
      {
        type: "image",
        src: "assets/story-beach.jpg",
        alt: "A happy rescue dog outdoors after rehabilitation",
      },
      {
        type: "image",
        src: "assets/rescue-close.jpg",
        alt: "Close-up of a smiling rescue dog",
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
  const sitaraCopy = {
    meta: "Great Dane · Female · Puppy",
    title: "Sitara’s happy adoption",
    description: [
      "Sitara was Goodoo’s first official rescue. A Great Dane who was caged most of her life till she was abandoned in a desolate area, Sitara had multiple broken bones and hairline fractures, and a completely twisted spine. After months of rehabilitation, Sitara was adopted into a wonderful home with a pack of rescue dogs to call her own!",
    ],
    cta: {
      href: "#donate",
      label: "Help the next Sitara heal →",
    },
  };

  /* Placeholder slides — replace each object with unique rescue story content later */
  const rescueStories = [
    {
      id: 1,
      image1: "assets/story-sitara.jpg",
      image1Alt: "Sitara, a Great Dane puppy, looking through a green fence during rescue",
      image2: "assets/story-beach.jpg",
      image2Alt: "Sitara healthy and free on a sandy beach after rehabilitation",
      ...sitaraCopy,
    },
    {
      id: 2,
      image1: "assets/story-beach.jpg",
      image1Alt: "A rescued dog enjoying open space after rehabilitation",
      image2: "assets/care-field.jpg",
      image2Alt: "Rescuers providing medical care to an injured dog",
      ...sitaraCopy,
    },
    {
      id: 3,
      image1: "assets/care-field.jpg",
      image1Alt: "Rescuers providing medical care beside an animal ambulance",
      image2: "assets/pack-dogs.jpg",
      image2Alt: "A Goodoo volunteer with a pack of rescued dogs",
      ...sitaraCopy,
    },
    {
      id: 4,
      image1: "assets/pack-dogs.jpg",
      image1Alt: "Rescued dogs gathered outdoors with a volunteer",
      image2: "assets/rescue-close.jpg",
      image2Alt: "Close-up of a smiling rescue dog",
      ...sitaraCopy,
    },
    {
      id: 5,
      image1: "assets/halfway-home.jpg",
      image1Alt: "A joyful Labrador being gently scratched under the chin",
      image2: "assets/story-sitara.jpg",
      image2Alt: "A hopeful rescue dog looking through a green fence",
      ...sitaraCopy,
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

    article.innerHTML = `
      <figure class="story-card story-card--image">
        <picture>
          <source srcset="${toWebp(story.image1)}" type="image/webp" />
          <img src="${story.image1}" alt="${story.image1Alt}" width="900" height="1200" loading="lazy" decoding="async" />
        </picture>
      </figure>
      <figure class="story-card story-card--image story-card--image-secondary">
        <picture>
          <source srcset="${toWebp(story.image2)}" type="image/webp" />
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
  const heroVideo = document.querySelector(".hero-video");
  const syncHeroVideo = () => {
    if (!heroVideo) return;
    const src = heroVideo.getAttribute("data-src");
    if (prefersReducedMotion.matches || saveData) {
      heroVideo.pause?.();
      heroVideo.removeAttribute("autoplay");
      heroVideo.removeAttribute("src");
      heroVideo.load?.();
      return;
    }
    if (src && heroVideo.getAttribute("src") !== src) {
      heroVideo.setAttribute("src", src);
      heroVideo.load?.();
    }
    heroVideo.setAttribute("autoplay", "");
    heroVideo.play?.().catch(() => {});
  };
  syncHeroVideo();
  prefersReducedMotion.addEventListener?.("change", syncHeroVideo);

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
      const digitsOnly = customInput.value.replace(/\D/g, "");
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

  document.querySelectorAll("[data-donation-form]").forEach(initDonationForm);

  document.querySelectorAll("[data-copy-btn]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy-btn") || "";
      const label = btn.getAttribute("aria-label") || "Copy";
      try {
        await navigator.clipboard.writeText(value);
        btn.textContent = "Copied";
        btn.classList.add("is-copied");
        btn.setAttribute("aria-label", `${label.replace(/^Copy /, "Copied ")}`);
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("is-copied");
          btn.setAttribute("aria-label", label);
        }, 1600);
      } catch {
        btn.textContent = "Select & copy";
      }
    });
  });
})();
