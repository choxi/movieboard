import React, {Component, PropTypes} from 'react';

export default class Template extends Component {
  static propTypes = {
    appCssHash: PropTypes.string.isRequired,
    bodyHtml: PropTypes.string.isRequired,
    isProduction: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  }

  render() {
    const {
      appCssHash, bodyHtml, isProduction, title
    } = this.props;

    // Only for production. For dev, it's handled by webpack with livereload.
    const linkStyles = isProduction &&
      <link
        href={'/_assets/bundle.css?' + appCssHash}
        rel="stylesheet"
      />;

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <title>{title}</title>
          {linkStyles}
        </head>
        <body dangerouslySetInnerHTML={{__html: bodyHtml}} />
      </html>
    );
  }
}
