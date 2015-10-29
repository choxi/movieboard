module.exports = {
  "Search for movie" : function (browser) {
    browser
      .url("localhost:8080")
      .waitForElementVisible('body', 1000)
      .setValue('input[type=search]', 'Good Burger')

    browser
      .expect.element('.MovieGrid').text.to.contain('Good Burger').before(1000)

    browser.end()
  }
};
