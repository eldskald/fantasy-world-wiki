export const articles = {
    article1: {
        title: "article1",
        data: `
        <h1>article1</h1>
        <p>content <a toarticle="article2">article2</a> more content1</p>
        `,
    },
    article2: {
        title: "article2",
        data: `
        <h1>article2</h1>
        <p>content <a toarticle="article1">article1</a> more content2</p>
        `,
    },
};

export const moddedArticles = {
    article1: `
        <h1>article1</h1>
        <p>content <a toarticle="article2" href="http://localhost/?article=article2">article2</a> more content1</p>
        `,
    article2: `
        <h1>article2</h1>
        <p>content <a toarticle="article1" href="http://localhost/?article=article1">article1</a> more content2</p>
        `,
};
