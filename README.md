# Google Workspace CLI Explorer

### TRY [Kael.im](https://kael.im/home) to turn your Google Docs and PDFs into presentation slides instantly, 100 pages free daily!

[![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)](package.json)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Pure Vanilla JS](https://img.shields.io/badge/vanilla-JS-yellow.svg)](script.js)

Interactive command explorer and quickstart guide for Google's **Workspace CLI**. Browse commands by service, see examples, and copy snippets instantly.

🔗 **Live Site**: [https://serenakeyitan.github.io/google-workspace-cli-explorer/](https://serenakeyitan.github.io/google-workspace-cli-explorer/)

---

## What is the Google Workspace CLI?

The **Google Workspace CLI** is a blazing-fast command-line interface for interacting with Google Workspace services (Gmail, Drive, Calendar, Sheets, Docs, Slides, Admin, Meet). Announced in **March 2026**, it's:

- **Built with Rust** for maximum performance
- **Distributed via npm** for easy installation
- **Secure** with OAuth2 authentication
- **Comprehensive** covering all major Workspace services

Install it globally:
```bash
npm i -g @googleworkspace/cli
```

Authenticate:
```bash
gws auth login
```

---

## Features

### 🔍 Smart Search
- **Instant filtering** across all commands and descriptions
- **Keyboard shortcut**: Press `/` to focus search
- **Highlighting** of matched terms

### 📦 Service Coverage
Comprehensive command reference for:
- **Drive** - File management, uploads, downloads, sharing
- **Gmail** - Email sending, searching, label management
- **Calendar** - Event creation, scheduling, calendar management
- **Sheets** - Spreadsheet manipulation, data export
- **Docs** - Document creation, export to PDF/Markdown
- **Slides** - Presentation management
- **Admin** - User/group management (requires admin privileges)
- **Meet** - Meeting scheduling, recording management

### ✨ Interactive UI
- **Dark mode** with persistent theme preference
- **Expandable service cards** to explore commands
- **Copy-to-clipboard** with visual feedback
- **Syntax highlighting** for code blocks
- **Responsive design** for mobile and desktop

### 🔗 Integration Patterns
Examples for:
- Piping with other CLI tools (jq, grep, etc.)
- OpenClaw/Claude Code skill integration
- Automation scripts
- CI/CD workflows

---

## Tech Stack

**Pure Vanilla HTML/CSS/JS** - Zero dependencies, zero frameworks

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, grid layout, animations
- **JavaScript (ES6+)** - Modern vanilla JS with:
  - `localStorage` for theme persistence
  - `IntersectionObserver` for scroll animations
  - `Clipboard API` for copy functionality
  - Keyboard shortcuts

---

## Local Development

### Clone the Repository
```bash
git clone https://github.com/serenakeyitan/google-workspace-cli-explorer.git
cd google-workspace-cli-explorer
```

### Run Locally
Simply open `index.html` in your browser:
```bash
open index.html
```

Or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server
```

### Project Structure
```
google-workspace-cli-explorer/
├── index.html          # Main HTML structure
├── style.css           # Styling with CSS custom properties
├── script.js           # Vanilla JavaScript logic
├── README.md           # This file
├── LICENSE             # MIT License
└── .github/
    └── workflows/
        └── pages.yml   # GitHub Pages deployment
```

---

## Deployment

This site is automatically deployed to **GitHub Pages** via GitHub Actions on every push to `main`.

The workflow (`.github/workflows/pages.yml`) handles:
1. Checking out the repository
2. Uploading the static site
3. Deploying to GitHub Pages

---

## Testing

Run the test suite:
```bash
pip install -r requirements-test.txt
pytest tests/
```

Tests verify:
- HTML structure and valid markup
- CSS syntax and theme variables
- JavaScript functionality

---

## Credits

- **Google Workspace CLI** - The amazing tool this explorer documents
- **[@rauchg](https://twitter.com/rauchg)** - For highlighting the CLI and inspiring this project
- **Anthropic** - For Claude Code and the OpenClaw Growth Pipeline

---

## License

MIT License - see [LICENSE](LICENSE) file for details

---

## Contributing

Contributions welcome! Please feel free to:
- Report bugs or suggest features via [Issues](https://github.com/serenakeyitan/google-workspace-cli-explorer/issues)
- Submit pull requests with improvements
- Share your own CLI automation patterns

---

Built with ❤️ using pure vanilla HTML/CSS/JS
