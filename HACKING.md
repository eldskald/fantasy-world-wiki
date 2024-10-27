# Hacking

## Dependencies

Just `node`. It's useful to have `python` too if you want to serve the file on localhost, but technically you don't need it to write code.

## Tech specs

This is purely a frontend, built with no javascript framework. The [package.json](package.json) file shows only dev dependencies, which are only `eslint` and `prettier` for linting and formatting, `jest` for testing and `tailwindcss` as the closest thing to a framework or dependency. We're not using `webpack` either, but we technically have a build step not only for tailwind, but to run our custom scripts to detect articles, maps and settings.

## Getting started

After cloning, run the following to build:

```sh
npm run build
```

This will build tailwind classes, articles, maps and the project settings. In order to have the conveniency of just adding new files to [assets/articles](assets/articles/) and [assets/maps](assets/maps/) to be enough to make them show up on the project, we needed to run these custom scripts. See them at [scripts](scripts/).

I'd suggest reading the [HOW_TO_MAKE_YOUR_OWN.md](HOW_TO_MAKE_YOUR_OWN.md) file for more context.

Having built, you now need to setup your `.env` file:

```sh
cp .env.template .env
```

This sets an environment variable for the port it will be served after you run:

```sh
npm run dev
```

As said previously, you need `python` to run this command.

By default, it runs on port 3000 but you're free to change it on your `.env` file.

Other than that, you have the following scripts for linting and formatting:

```sh
npm run lint
npm run format
```

## Architecture

It's meant to be an SPA, with state entirely kept as query strings. If an article is opened, it should show up as `article=<article name here>` on the URL query strings, and for maps it's `map=<map name here>`. Clicking links shouldn't trigger a reload, instead we're just pushing to history with `histoy.pushState()` so the back and forward browser features still work but we remain on the SPA experience.

This is so your players can share links and you will see exactly what they are seeing when they give you a link, as state is entirely on the URL without compromising the SPA experience for smoother navigation.

All articles and maps are loaded in memory as huge hashtables. This makes it faster to load them when you navigate, but it occupies more space in memory. I don't think it's a problem because it's all text, which shouldn't occupy a lot of memory unless you have tons of super long articles. If it ever becomes a problem I can make it so we call a request to `assets/articles` and `assets/maps` instead of loading everything, but right now I think loading everything makes for a smoother experience.

## Deploy

It is done automatically through Github Actions and Github Pages.
