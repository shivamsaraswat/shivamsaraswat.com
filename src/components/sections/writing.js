import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { IconExternal } from '@components/icons';

const StyledWritingSection = styled.section`
  max-width: 900px;

  .post-list {
    ${({ theme }) => theme.mixins.resetList};
    margin-top: 50px;
  }

  .archive-link {
    ${({ theme }) => theme.mixins.inlineLink};
    display: block;
    margin-top: 40px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }
`;

const StyledPost = styled.li`
  transition: var(--transition);

  a.post-link {
    display: grid;
    grid-template-columns: 90px 1fr auto;
    align-items: baseline;
    grid-gap: 20px;
    padding: 20px 20px 20px 15px;
    border-radius: var(--border-radius);
    border-bottom: 1px solid var(--lightest-navy);
    color: var(--lightest-slate);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      background-color: var(--light-navy);
      color: var(--green);
      outline: 0;

      .post-arrow {
        transform: translate(3px, -3px);
      }
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr auto;
      grid-gap: 10px 15px;
      padding: 16px 12px;
    }
  }

  .post-year {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 600;

    @media (max-width: 600px) {
      grid-column: 1 / -1;
      font-size: var(--fz-xs);
    }
  }

  .post-title {
    font-size: var(--fz-lg);
    font-weight: 600;
    line-height: 1.4;
  }

  .post-arrow {
    color: var(--green);
    transition: var(--transition);

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const Writing = () => {
  const data = useStaticQuery(graphql`
    {
      posts: allExternalPost(sort: { fields: [date], order: DESC }, limit: 5) {
        edges {
          node {
            title
            url
            date
          }
        }
      }
    }
  `);

  const posts = data.posts.edges;

  const revealTitle = useRef(null);
  const revealPosts = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealPosts.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  if (posts.length === 0) {
    return null;
  }

  return (
    <StyledWritingSection id="writing">
      <h2 className="numbered-heading" ref={revealTitle}>
        Writing
      </h2>

      <ul className="post-list">
        {posts.map(({ node }, i) => {
          const { title, url, date } = node;
          return (
            <StyledPost key={i} ref={el => (revealPosts.current[i] = el)}>
              <a className="post-link" href={url} target="_blank" rel="noreferrer">
                <span className="post-year">{new Date(date).getFullYear()}</span>
                <span className="post-title">{title}</span>
                <span className="post-arrow" aria-hidden="true">
                  <IconExternal />
                </span>
              </a>
            </StyledPost>
          );
        })}
      </ul>

      <a
        className="archive-link"
        href="https://blog.shivamsaraswat.com/"
        target="_blank"
        rel="noreferrer">
        Read all posts on my blog &rarr;
      </a>
    </StyledWritingSection>
  );
};

export default Writing;
