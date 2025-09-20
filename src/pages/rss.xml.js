import rss, { pagesGlobToRssItems } from '@astrojs/rss';

// create a RSS feed for blog posts that can be found at /rss.xml
export async function GET(context) {
  return rss({
    title: "Colton Loftus's Blog",
    description: 'The personal website of Colton Loftus',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./writings/*.mdx')),
    customData: `<language>en-us</language>`,
  });
}