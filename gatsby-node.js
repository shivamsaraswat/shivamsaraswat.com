/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const _ = require('lodash');

const BLOG_FEED_URL = 'https://blog.shivamsaraswat.com/feed.xml';

const decodeEntities = str =>
  str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_m, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, `'`)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();

// The feed is a small Atom document we publish ourselves, so a targeted parse
// beats pulling in an XML dependency. Only title/link/date/summary are read.
const parseAtomFeed = xml => {
  const tagText = (entry, tag) => {
    const match = entry.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
    return match ? decodeEntities(match[1]) : '';
  };

  return (xml.match(/<entry[\s\S]*?<\/entry>/g) || []).map(entry => {
    const linkMatch = entry.match(/<link[^>]*href="([^"]+)"/);
    return {
      title: tagText(entry, 'title'),
      // The feed emits a double slash after the host; normalize it.
      url: linkMatch ? linkMatch[1].replace(/([^:])\/\//g, '$1/') : '',
      date: tagText(entry, 'published') || tagText(entry, 'updated'),
      description: tagText(entry, 'summary'),
    };
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type MarkdownRemarkFrontmatter {
      cta: String
      title: String
      description: String
      slug: String
      date: Date @dateformat
      draft: Boolean
      tags: [String]
    }

    type ExternalPost implements Node {
      title: String!
      url: String!
      date: Date! @dateformat
      description: String
    }
  `);
};

// Pulls recent posts from the external blog at build time. Failures are logged
// and skipped rather than fatal, so the blog being down can't break a deploy.
exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, reporter }) => {
  const { createNode } = actions;

  let posts = [];
  try {
    const response = await fetch(BLOG_FEED_URL, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    posts = parseAtomFeed(await response.text()).filter(post => post.title && post.url);
  } catch (error) {
    reporter.warn(
      `Could not fetch blog feed (${error.message}). The Writing section will be omitted.`,
    );
    return;
  }

  reporter.info(`Fetched ${posts.length} posts from the blog feed.`);

  posts.forEach(post => {
    createNode({
      ...post,
      id: createNodeId(`external-post-${post.url}`),
      internal: {
        type: 'ExternalPost',
        contentDigest: createContentDigest(post),
      },
    });
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/templates/post.js`);
  const tagTemplate = path.resolve('src/templates/tag.js');

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create post detail pages
  const posts = result.data.postsRemark.edges;

  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: postTemplate,
      context: {},
    });
  });

  // Extract tag data from query
  const tags = result.data.tagsGroup.group;
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/pensieve/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
          {
            test: /miniraf/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};
