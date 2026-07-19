<h1 align="center">
  shivamsaraswat.com
</h1>
<p align="center">
  The personal website of <a href="https://shivamsaraswat.com" target="_blank">Shivam Saraswat</a>, built with <a href="https://www.gatsbyjs.com/" target="_blank">Gatsby</a> and hosted on <a href="https://www.netlify.com/" target="_blank">Netlify</a>.
</p>

## 🙏 Credit

This site is based on <a href="https://github.com/bchiang7/v4" target="_blank">v4</a> of <a href="https://brittanychiang.com" target="_blank">Brittany Chiang</a>'s website, used under the MIT license with her design credited in the site footer.

## 🛠 Installation & Set Up

1. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm) (see `.nvmrc`)

   ```sh
   nvm install
   ```

2. Install dependencies

   ```sh
   yarn
   ```

3. Start the development server

   ```sh
   yarn develop
   ```

   The site runs at `http://localhost:8000`.

## 🚀 Building and Running for Production

1. Generate a full static production build

   ```sh
   yarn build
   ```

2. Preview the site as it will appear once deployed

   ```sh
   yarn serve
   ```

Deployment is handled automatically by Netlify on push to `main`.

## 📝 Content

- Site metadata, social links, and nav items live in `src/config.js` and `gatsby-config.js`
- Experience entries live in `content/jobs/`
- Featured projects live in `content/featured/`
- Other projects live in `content/projects/`
- Blog posts (Pensieve) live in `content/posts/`
