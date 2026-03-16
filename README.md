# The Gustavo Swingtet — Website

Official website for **The Gustavo Swingtet**, an acoustic swing / gypsy-jazz band based in Bern, Switzerland.

The site presents the band, their music, media and booking information in a lightweight static setup built with plain HTML, CSS and JavaScript.

This project replaces the band's previous Wix site with a faster and more flexible version while keeping the warm, intimate visual style of the original design.

---

## Overview

The site currently consists of four main pages:

- **Home** – introduction, featured video and track preview
- **Media** – recordings, video and collage-style photo gallery
- **About Us** – band background, sound description and line-up
- **Contact** – booking information and contact form

The site is fully static and designed to be easy to host, maintain and extend.

---

## Features

### Multilingual support

The site supports three languages:

- English
- German
- French

All user-facing text is stored in a central translation file and injected dynamically through JavaScript.

### Custom audio player

Recordings are hosted directly on the site and played through a custom-built audio player.

Features include:

- track selection
- play / pause
- progress bar
- volume control
- track display

The player appears on both the **Home** and **Media** pages.

### Video integration

The site embeds a featured YouTube performance using the privacy-enhanced **YouTube nocookie embed**.

### Gallery

The media page uses a custom **collage-style gallery layout** built with CSS grid.

The gallery combines:

- band portraits
- live performance photos
- rehearsal images
- individual musician portraits

The intention was to keep some of the loose editorial feel of the previous Wix version while giving the section a cleaner structure and more consistent spacing.

### Contact and booking

The contact page includes:

- booking contact details
- phone number
- email address
- a simple contact form

The form allows visitors to optionally include event details such as location, date or type of event.

---

## Design

The design aims for a warm, intimate atmosphere inspired by small jazz venues and acoustic live sessions.

Key elements include:

- dark textured background
- gold and beige accent colours
- rounded cards and panels
- soft gradients and shadows
- bold display typography for titles
- a collage-style image language on the media page

The visual direction stays close to the earlier Wix site, but with cleaner spacing, a more consistent system and more control over layout and content.

---

## Tech stack

The site is built entirely with:

- HTML
- CSS
- Vanilla JavaScript

No framework or build process is required.

---

## Project structure

```text
assets/
  audio/          recordings used in the custom audio player
  css/            site styling
  images/         photos and hero images
  js/             scripts (translations, player, navigation)

index.html        home page
media.html        media page
about.html        about page
contact.html      contact page
```

---

## Current state

The site is functional and ready to deploy as a static website.

Implemented so far:

- multi-page structure
- three-language setup
- custom self-hosted audio player
- YouTube embed
- collage-style media gallery
- booking/contact form
- updated visual system based on the band's existing look

Still open for future updates:

- final long-form band text on the About page
- final long-form sound text on the About page
- more recordings
- additional live video material
- possible press or concerts section

---

## Screenshots

You can add screenshots later, for example:

```md
![Home page](docs/home.png)
![Media page](docs/media.png)
![Gallery](docs/gallery.png)
```

---

## Deployment

Because the site is fully static, it can be hosted anywhere, for example:

- GitHub Pages
- Netlify
- Vercel
- any standard web server

No build step is needed.

---

## About the band

The Gustavo Swingtet plays acoustic swing inspired by Django Reinhardt and the European gypsy-jazz tradition.

Based in Bern, the band performs in cafés, bars, festivals and private events.
