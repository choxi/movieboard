module.exports = {
  "Search for movie" : function (browser) {
    browser
      .url("localhost:8080")
      .waitForElementVisible('body', 1000)
      .end()
  }
};
