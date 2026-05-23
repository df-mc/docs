# Dragonfly Documentation

The official documentation site for [Dragonfly](https://github.com/df-mc/dragonfly) — a fast, lightweight Minecraft Bedrock Edition server written in Go.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with React 19
- **Documentation**: [Fumadocs](https://fumadocs.vercel.app/) for MDX-based documentation
- **Styling**: Tailwind CSS 4 with Framer Motion animations
- **Package Manager**: [Bun](https://bun.sh/)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/df-mc/docs.git
cd docs

# Install dependencies
bun install
```

### Development

```bash
# Start the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production
bun run build

# Start the production server
bun run start
```

### GitHub Pages

GitHub Pages is deployed by `.github/workflows/pages.yml`. The workflow builds the Next.js app with `GITHUB_PAGES=true`, which enables static export, writes the site to `out/`, and deploys that artifact with GitHub Pages Actions.

## Project Structure

```
dragonfly-docs/
├── app/                  # Next.js app router pages
├── components/           # React components
├── content/
│   └── docs/            # Documentation content (MDX)
│       ├── changelogs/  # Version changelogs
│       ├── community/   # Community resources
│       ├── core-concepts/ # Core concepts & architecture
│       ├── getting-started/ # Quick start guides
│       ├── migration/   # Migration guides
│       ├── reference/   # API reference
│       ├── source/      # Source code documentation
│       └── tutorials/   # Step-by-step tutorials
├── lib/                 # Utility functions
├── public/              # Static assets
└── static/              # Additional static files
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/my-feature`)
6. Open a Pull Request

### Writing Documentation

Documentation is written in MDX format. Create or edit files in the `content/docs/` directory. Each page should include frontmatter:

```mdx
---
title: Page Title
description: A brief description of the page
---

Your content here...
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run type-check` | Run TypeScript type checking |

## License

This project is part of the Dragonfly ecosystem. See the main [Dragonfly repository](https://github.com/df-mc/dragonfly) for license information.
