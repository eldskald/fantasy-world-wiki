export const data = {
    article1: `
        <h1>article1</h1>
        <p>content <a toarticle="article2">article2</a> more content1</p>
    `,
    article2: `
        <h1>aritlce2</h1>
        <p>content <a toarticle="article1">article1</a> more content2</p>
    `,
};

export const moddedData = {
    article1: `
        <h1>article1</h1>
        <p>content <a toarticle="article2" href="http://localhost/?article=article2" onclick="toArticle('article2'); return false;">article2</a> more content1</p>
    `,
    article2: `
        <h1>aritlce2</h1>
        <p>content <a toarticle="article1" href="http://localhost/?article=article1" onclick="toArticle('article1'); return false;">article1</a> more content2</p>
    `,
};
