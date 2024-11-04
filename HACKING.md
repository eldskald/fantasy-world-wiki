# Hacking

## Dependencies

Just `node`. It's useful to have `python` too if you want to serve the file on localhost, but technically you don't need it to write code.

## Tech specs

This is purely a frontend, built with no javascript framework. The [package.json](package.json) file shows only dev dependencies, which are only `eslint` and `prettier` for linting and formatting, `jest` for testing and `tailwindcss` as the closest thing to a framework or dependency. We're not using `webpack`, `vite` or any build tool either, but we technically have a build step not only for tailwind, but to run our custom scripts to detect articles, maps and settings.

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

All articles and maps are fetched directly from the GitHub Pages server, straight from the `assets/` directory. Articles are HTML files and maps are JSON files. As I stated before, this project uses `tailwindcss` for styling and it also scans the articles and credits pages at `assets/`, so if you can use `tailwindcss` on your HTML files and it will show up after deploying.

## Deploy

It is done automatically through Github Actions and Github Pages. As stated before, we have a few build scripts and the `tailwindcss` build step. Our custom scripts will basically scan articles and maps to create the index pages, as well as copy the credits page to the build directory so it can be fetched like other menus.
