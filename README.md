# Tatua - Enterprise Ticketing Solutions

Tatua is a modern, accessible web application designed for enterprise customer support operations, featuring issue tracking, workflow automation, performance analytics, and dynamic UI theme customization.

## Live Demo

- **Production URL:** https://tatua-website-starter-seven.vercel.app/index.html

---

## Features

- **Semantic & Accessible Markup:** Built strictly according to W3C and WCAG accessibility standards (`aria-labelledby`, accessible tables, description lists, and roving keyboard navigation).
- **In-Page Table of Contents:** Sticky navigation with hash-anchor linking for seamless navigation across case studies and benchmark data.
- **Customizable Appearance & Settings:** Real-time controls for color themes (Warm Night, Warm Light, Deep Blue), font scales, and layout densities.
- **Responsive Layout:** Mobile-first architecture using CSS Grid, Flexbox, and CSS custom properties (variables).

---

## Project Structure

\`\`\`text
tatua/
├── index.html                  # Landing page
├── pages/
│   ├── about.html              # Team, mission & company milestones
│   ├── contact.html            # Contact inquiry form & office directory
│   ├── case-studies.html       # Customer stories, benchmark tables & ROI
│   └── settings.html           # Appearance, typography & theme controls
├── partials/
│   ├── header.html             # Global shared navigation header
│   └── _variables.css          # Design tokens & CSS custom properties
├── assets/                     # Logos, icons, and graphics
├── global.css                  # Core design system and layout styling
└── theme.js                    # Theme persistence and UI toggles
\`\`\`

---

## Tech Stack

- **Markup:** Pure HTML5 (Semantic & Accessible)
- **Styling:** Vanilla CSS3 (Custom Properties, CSS Grid, Flexbox)
- **Scripting:** Vanilla JavaScript (ES6+)
- **Hosting & Deployment:** [Vercel](https://vercel.com)

---

## Local Development

To run or preview this project locally:

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   \`\`\`

2. **Run a local server:**
   Because the header is loaded dynamically via `fetch()`, run a lightweight local HTTP server instead of double-clicking files:
   
   Using Python:
   \`\`\`bash
   python3 -m http.server 8000
   \`\`\`

   Using VS Code:
   Install the **Live Server** extension and click **Go Live**.

3. Open `http://localhost:8000` in your browser.

---

To test run the email templates: Generate App Password, have a sender and receiver email that you will put in the .env

cd email-sender
mvn compile exec:java "-Dexec.mainClass=com.email.TrialExpiration"
