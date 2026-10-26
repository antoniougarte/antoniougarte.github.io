const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  
  eleventyConfig.addFilter("year", function() {
    return new Date().getFullYear();
  });

  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: false
  }).use(markdownItAnchor, {
    permalink: false,
    slugify: s => s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  });
  
  eleventyConfig.setLibrary("md", md);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
