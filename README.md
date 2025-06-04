# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

### Automatic Deployment with GitHub Actions

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch. The deployment is handled by a GitHub Actions workflow.

### Manual Deployment

To manually deploy the website to GitHub Pages, you can use the following command:

```bash
yarn deploy-gh
```

This command will build the website and push the changes to the `gh-pages` branch.

Alternatively, you can use:

```bash
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

or if not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

The deployed site will be available at: https://blockify-bluefish.github.io/bluefish/
