# How to make your own

The first thing you need to do is to fork this project. Don't worry if you're not a programmer, you don't need to touch the code, although having some knowledge of HTML would be useful, the examples given here are very self explanatory and should get you started.

To fork any project on GitHub, you need an account and to just push the fork button at the top of the page. 

## Editing files

You can skip this section if you're a programmer and is already familiar with git.

If you're not a programmer, don't worry, you don't need to download anything to edit and create files. Just click any file or folder on your fork's GitHub page and you should see an edit or create file button. After you're done with the editing, click __Commit changes__. You don't need to write a commit message, just commit your changes directly and that's it.

Every time you commit something, the project will automatically update your page, but it takes a couple seconds for the updates to show up.

## Initial setup

On your fork's GitHub page, go to Settings > Pages. You need to enable GitHub pages first before it can generate your webpage. You can also change the repository's name on Settings > General too. Changing this name changes your webpage's URL.

With that out of the way, take a look at the [project-settings.json](project-settings.json) file. This is where you will write the webpage's title, initial map (the map needs to exist, of course, more on the maps section) and all the labels that show up on the site. You don't need to change the labels, I left them there in case you're making it in another language and you would want your site to be 100% in it.

## Assets

The [assets](assets/) folder and the previously explained [project-settings.json](project-settings.json) are all the files you need to touch. None of them are very complicated.

### Articles

The [assets/articles](assets/articles/) folder is where you will make your articles. Just make new `.html` files here and you can place links to it using its filename. For example, if you make a file named `thieves-guild.html` and you wanna place links to it in other articles, just add links with `toarticle="thieves-guild"` in them, for example:

```html
...
<p>The great city of Elnoria is the largest city in the empire. Known for being a culture hub of all provinces, it attracts merchants from all over the world. It is also the home of the <a toarticle="thieves-guild">Thieves Guild</a>.</p>
...
```

Your article needs to have a `<h1>` tag containing its title too. This is the name that will show up on the articles index. Keep in mind: filename is for linking to it and the URL that shows up on the browser while the `<h1>` tag is the article's title.

I suggest you look at the example articles, they're reference on how to do anything you want in an article, including adding a table of contents at the top, adding images, tables and note blocks.

### Maps

The [assets/maps](assets/maps/) folder is where you will put your maps. By map I mean the page with a map image and a lot of links on top of it, not the image itself. 

A map is just a `.json` file with a name, an image and links. Similar to articles, the filename is what you will use to link to the map and is what will show up on the URL. Just put a `tomap="<your-map-name-here>"` on your `<a>` tags and they should link.

The `image` field is the name of the image file. They are located on [assets/images](assets/images/).

The `links` field on the map files are the links. You can put `tomap` and `toarticle` fields here in the same way you would put on an article `.html`. The sizes can be either `large`, `medium` or `small`. You can see the map examples to see how each one looks like. The `pos` field is the position. These percentages are in relation to the map size, `x` going left to right and `y` going top to bottom, so a link at `x: "0%", y: "100%"` would end up on bottom left corner of the map, while one at `x: "50%", y: "50%"` would end up in the exact center.

Again, look at the example maps for reference.

### Theme

The [assets/themes/index.js] file contains data for the colorscheme and fonts of your site. You can put any color hexcode on those color fields. `fg` stands for foreground, it's used for text. `bg` stands for background, it's the color of the background of the article popup and the topbar. `dark` and `light` refer to if it's dark theme or light theme. Finally, the `primary` colors are the colors that show up on article titles, link colors, map links, etc.

#### Installing new fonts

There is also font data on that file, but installing fonts is a little bit tricky.

The [assets/fonts/fonts.css](assets/fonts/fonts.css) file loads fonts from services that host them, such as [Google Fonts](https://fonts.google.com). You can install from any other site that hosts free fonts, but [Google Fonts](https://fonts.google.com) is the easiest. To use it, choose a font from it and click the __Get Font__ button on the font's page. It will add it to your "cart" even though you're not shopping. You can go back to browsing and pick all the fonts you want. When you're done, click you cart then click the __Get embedded code__ button. You'll go to a page with some code for you to copy paste. Choose __@import__ and just paste the code that's between the `<style>` and `</style>` lines in your [assets/fonts/fonts.css](assets/fonts/fonts.css) file. It's usually just a single line, although a very long one depending on the fonts you picked.

Having done that, you need to put the font names on your [assets/theme/index.js](assets/theme/index.js) file. There are four fonts being used, `fancy` is for the article titles and map large and medium links, `display` font should show up on `<h3>` and `<h4>` tags on articles, used for sectioning and sub-sectioning. `sans` and `serif` are for text. `sans` shows up on small links on maps, table titles, `<h5>` and `<h6>` tags while `serif` is the main body of text on the articles.

### For developers

See the [HACKING.md](HACKING.md) file for more technical data on how to customize your fork even further.

### Wrapping up

That's it, really. You can send me an email in case anything breaks and you don't know what to do.
