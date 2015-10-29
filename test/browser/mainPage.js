module.exports = {
  "Main page loads" : function (browser) {
    browser
      .url("localhost:8080")
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('nav', 1000)
      .assert.elementPresent('nav')
  }
};
