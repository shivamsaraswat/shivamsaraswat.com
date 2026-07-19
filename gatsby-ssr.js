/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require('react');

// Sets the theme attribute before first paint to avoid a flash of the wrong theme.
// Defaults to dark; a stored preference from the nav toggle wins.
const themeInitScript = `(function () {
  var theme = 'dark';
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      theme = stored;
    }
  } catch (e) {}
  document.documentElement.setAttribute('data-theme', theme);
})();`;

exports.onRenderBody = ({ setHtmlAttributes, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: 'en', 'data-theme': 'dark' });
  setPreBodyComponents([
    React.createElement('script', {
      key: 'theme-init',
      dangerouslySetInnerHTML: { __html: themeInitScript },
    }),
  ]);
};
