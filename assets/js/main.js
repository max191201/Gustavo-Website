(function () {
  let currentLang = localStorage.getItem('gustavo-lang') || 'en';
  const available = window.GUSTAVO_TRANSLATIONS || {};
  const toast = document.querySelector('[data-toast]');

  function lookup(lang, key) {
    const parts = key.split('.');
    let value = available[lang];
    for (const part of parts) {
      if (!value || typeof value !== 'object') return undefined;
      value = value[part];
    }
    return value;
  }

  function t(lang, key) {
    return lookup(lang, key) ?? lookup('en', key) ?? '';
  }

  function applyTranslations(lang) {
    document.documentElement.lang = lang === 'de' || lang === 'fr' ? lang : 'en';
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      node.innerHTML = t(lang, key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
      const key = node.getAttribute('data-i18n-placeholder');
      node.setAttribute('placeholder', t(lang, key));
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((node) => {
      const key = node.getAttribute('data-i18n-aria-label');
      node.setAttribute('aria-label', t(lang, key));
    });

    document.querySelectorAll('[data-i18n-title]').forEach((node) => {
      const key = node.getAttribute('data-i18n-title');
      node.setAttribute('title', t(lang, key));
    });

    document.querySelectorAll('[data-lang-button]').forEach((button) => {
      const buttonLang = button.dataset.langButton;
      button.setAttribute('aria-pressed', String(buttonLang === lang));
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2200);
  }

  document.querySelectorAll('[data-lang-button]').forEach((button) => {
    button.addEventListener('click', () => {
      const lang = button.dataset.langButton;
      currentLang = lang;
      localStorage.setItem('gustavo-lang', lang);
      applyTranslations(lang);
      if (lang !== 'en' && (!available[lang] || Object.keys(available[lang]).length === 0)) {
        showToast('Layout is ready. ' + lang.toUpperCase() + ' copy can be added later.');
      }
    });
  });

  const navToggle = document.querySelector('[data-nav-toggle]');
  const navRow = document.querySelector('[data-nav-row]');
  if (navToggle && navRow) {
    navToggle.addEventListener('click', () => {
      const isOpen = navRow.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navRow.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navRow.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('[data-placeholder-link="true"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showToast('Placeholder link. Add the final URL later.');
    });
  });

  const yearSlot = document.querySelector('[data-year]');
  if (yearSlot) {
    yearSlot.textContent = new Date().getFullYear();
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }

  function initCustomAudioPlayers() {
    document.querySelectorAll('.custom-audio-player').forEach((player) => {
      const audio = player.querySelector('[data-audio-element]');
      const playButton = player.querySelector('[data-audio-play]');
      const playIcon = player.querySelector('.custom-audio-play-icon');
      const progress = player.querySelector('[data-audio-progress]');
      const volume = player.querySelector('[data-audio-volume]');
      const currentTime = player.querySelector('[data-audio-current-time]');
      const duration = player.querySelector('[data-audio-duration]');
      const currentTitle = player.querySelector('[data-audio-current-title]');
      const currentCaption = player.querySelector('[data-audio-current-caption]');
      const currentIndex = player.querySelector('[data-audio-current-index]');
      const tracks = Array.from(player.querySelectorAll('[data-audio-track]'));
      const playLabelKey = playButton?.dataset.audioPlayLabel || 'contact.playSelectedTrack';
      const pauseLabelKey = 'contact.pauseSelectedTrack';

      if (!audio || !playButton || !progress || !volume || !tracks.length) return;

      let activeTrack = tracks.find((track) => track.classList.contains('is-active')) || tracks[0];

      function updateButtonState() {
        if (playIcon) {
          playIcon.textContent = audio.paused ? '▶' : '❚❚';
        }
        const ariaKey = audio.paused ? playLabelKey : pauseLabelKey;
        playButton.setAttribute('aria-label', t(currentLang, ariaKey));
      }

      function updateProgress() {
        if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
          progress.value = '0';
          if (duration) duration.textContent = '0:00';
          return;
        }
        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.value = String(Math.min(100, Math.max(0, percentage)));
        if (duration) duration.textContent = formatTime(audio.duration);
      }

      function updateCurrentTime() {
        if (currentTime) currentTime.textContent = formatTime(audio.currentTime);
      }

      function setActiveTrack(track, autoplay = false) {
        activeTrack = track;
        tracks.forEach((item) => item.classList.toggle('is-active', item === track));

        const src = track.dataset.src || '';
        const title = track.querySelector('.custom-track-title')?.textContent?.trim() || track.dataset.title || '';
        const caption = track.querySelector('.custom-track-caption')?.textContent?.trim() || track.dataset.caption || '';
        const index = track.dataset.index || '';

        audio.src = src;
        audio.load();

        if (currentTitle) currentTitle.textContent = title;
        if (currentCaption) currentCaption.textContent = caption;
        if (currentIndex) currentIndex.textContent = index;
        if (currentTime) currentTime.textContent = '0:00';
        if (duration) duration.textContent = '0:00';
        progress.value = '0';
        updateButtonState();

        if (autoplay) {
          audio.play().catch(() => {
            updateButtonState();
          });
        }
      }

      tracks.forEach((track) => {
        track.addEventListener('click', () => {
          const wasPlaying = !audio.paused;
          setActiveTrack(track, false);
          if (wasPlaying) {
            audio.pause();
          }
          updateButtonState();
        });
      });

      playButton.addEventListener('click', () => {
        if (!audio.src) {
          setActiveTrack(activeTrack, false);
        }

        if (audio.paused) {
          audio.play().catch(() => {
            updateButtonState();
          });
        } else {
          audio.pause();
        }
      });

      progress.addEventListener('input', () => {
        if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
        const percentage = Number(progress.value) / 100;
        audio.currentTime = percentage * audio.duration;
      });

      volume.addEventListener('input', () => {
        audio.volume = Number(volume.value);
      });

      audio.addEventListener('play', updateButtonState);
      audio.addEventListener('pause', updateButtonState);
      audio.addEventListener('loadedmetadata', () => {
        updateProgress();
        updateCurrentTime();
      });
      audio.addEventListener('timeupdate', () => {
        updateProgress();
        updateCurrentTime();
      });
      audio.addEventListener('ended', () => {
        updateButtonState();
        progress.value = '0';
        if (currentTime) currentTime.textContent = '0:00';
      });

      audio.volume = Number(volume.value);
      setActiveTrack(activeTrack, false);
      updateButtonState();
    });
  }

  applyTranslations(currentLang);
  initCustomAudioPlayers();
})();
