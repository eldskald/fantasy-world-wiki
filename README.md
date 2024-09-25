# WIP

WIP

App available at https://eldskald.github.io/ttrpg-wip

## Dependencies

Just `node`. It's useful to have `python` too if you want to serve the file on localhost but the project is so simple that just opening [index.html] on a web browser should work.

## Developing

### Getting started

Run the following script to build:

```sh
npm run build
```

You can't run the app without building first. It will create a `/build` directory with some files `index.html` is sourcing directly. It is building for `tailwindcss` and the articles, so if you change any `.css` file, the `tailwindcss` classes used in `.html` or `.js` files, or have changed the articles in [assets/articles](assets/articles), you should rebuild to update and see the changes.

Having built, you now need to setup your `.env` file:

```sh
cp .env.template .env
```

This sets an environment variable for the port it will be served after you run:

```sh
npm run dev
```

As said previously, you need `python` to run this command and technically you don't need it, you can just open [index.html](index.html) directly after having built, don't even need the `.env` file but it's easier with that command.

By default, it runs on port 3000 but you're free to change it on your `.env` file.

Other than that, you have the following scripts for linting and formatting:

```sh
npm run lint
npm run format
```

### Changing the assets

#### Changing the theme

The [assets/theme/index.js](assets/theme/index.js) file sets the themes. Just replace the color hex codes for the ones you want. As the names implies, the colors that end in `light` are for the light theme, and the ones that end in `dark` are for the dark theme. It is setup to take your browser's settings, so if you're using a dark theme it loads the dark colors.

To change the fonts, you need to install them first, see next session. After installing them, just replace each field with the font names. The `fancy` and `display` fields are for headers on articles and map markers, fancy is usually for fancier stuff as the name suggest, display is supposed to more readable. The `serif` field is for most readable texts, such as the paragraphs in articles. Finally, `sans` is for everything else.

#### Installing new fonts

The [assets/fonts/fonts.css](assets/fonts/fonts.css) file loads fonts from services that host them, such as [Google Fonts](https://fonts.google.com). You can install from any other site that hosts free fonts, but [Google Fonts](https://fonts.google.com) is the easiest. To use it, choose a font from it and click the **Get Font** button on the font's page. It will add it to your "cart" even though you're not shopping. You can go back to browsing and pick all the fonts you want. When you're done, click you cart then click the **Get embedded code** button. You'll go to a page with some code for you to copy paste. Choose **@import** and just paste the code that's between the `<style>` and `</style>` lines in your [assets/fonts/fonts.css](assets/fonts/fonts.css) file. It's usually just a single line, although a very long one depending on the fonts you picked.

Having done that, you need to put the font names on your [assets/theme/index.js](assets/theme/index.js) file. See section above.

#### Articles

Every `.html` file in [assets/articles](assets/articles) is considered an article and will show up on the page if you go to `url?article=<article filename>`. After adding new articles, removing them or updating any file, it will automatically detect the changes during the build step and will catch the changes.

## Deploy

It is done automatically through Github Actions and Github Pages. If you're forking this repo to make your own TTRPG world wiki, you need to enable Github Pages and give actions read and write permissions. It will be available at https://your-username.github.io/your-repo and will be updated automatically every time you push to `main`.

## Credits

Everything by [Rafael Bordoni](https://github.com/eldskald). Also thanks to [tailwindcss](https://tailwindcss.com/) for their cool framework.
