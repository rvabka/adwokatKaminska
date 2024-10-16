const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Kopiowanie plików CSS i obrazów do folderu output
  eleventyConfig.addPassthroughCopy("./dist/css");
  eleventyConfig.addPassthroughCopy("./dist/images");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/publikacje/wpis/*.md")
      .reverse();
  });

  eleventyConfig.addCollection("sell", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/komunikaty/ogloszenia/*.md")
      .reverse();
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
