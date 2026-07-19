import { css } from 'styled-components';

const variables = css`
  :root {
    /* Ink & Electric Blue palette (variable names kept from the original theme:
       "navy" = ink surfaces, "slate" = blue-gray text ramp, "green" = blue accent) */
    --dark-navy: #070b14;
    --navy: #0a0e1a;
    --light-navy: #111827;
    --lightest-navy: #1f2a44;
    --navy-shadow: rgba(2, 6, 16, 0.7);
    --dark-slate: #545f79;
    --slate: #8a94ab;
    --light-slate: #9fabc0;
    --lightest-slate: #c6cfdd;
    --white: #eef2f8;
    --green: #58a6ff;
    --green-tint: rgba(88, 166, 255, 0.1);
    --pink: #ff7b72;
    --blue: #79c0ff;
    --nav-bg: rgba(10, 14, 26, 0.85);

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }

  /* Light theme: same variable names, inverted ramp; blue accent darkened for contrast */
  html[data-theme='light'] {
    --dark-navy: #eaedf1;
    --navy: #f6f8fa;
    --light-navy: #ffffff;
    --lightest-navy: #d8dee4;
    --navy-shadow: rgba(140, 149, 159, 0.25);
    --dark-slate: #8c959f;
    --slate: #57606a;
    --light-slate: #424a53;
    --lightest-slate: #24292f;
    --white: #1b1f24;
    --green: #0969da;
    --green-tint: rgba(9, 105, 218, 0.1);
    --pink: #cf222e;
    --blue: #218bff;
    --nav-bg: rgba(246, 248, 250, 0.85);
  }
`;

export default variables;
