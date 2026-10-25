module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  
  eleventyConfig.addFilter("year", function() {
    return new Date().getFullYear();
  });

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
