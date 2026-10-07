import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { email, srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { usePrefersReducedMotion } from '@hooks';
import SEO from '@components/head';

const topics = [
  'AI/agent supply chain security',
  'Container security and vulnerability prioritisation',
  'Software supply chain attacks',
  'DevSecOps at scale',
];

const talks = [
  {
    title: 'Beyond the Model: Securing What Your Agent Actually Depends On',
    event: 'AAIF Bengaluru',
    date: 'September 2026',
    format: 'Talk + live demo',
    links: [
      {
        name: 'Slides',
        url: 'https://speakerdeck.com/shivamsaraswat/beyond-the-model-securing-what-your-agent-actually-depends-on',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/shivamsaraswat/openssf-model-signing-demo',
      },
    ],
    description: [
      `An agent isn't one model. It's a model plus every MCP server, tool, and framework it calls, and none of those are things you built or can fully inspect. This talk maps that dependency chain, walks through what goes wrong (malicious model serialization, backdoored models, typosquatted model IDs, poisoned training data), and closes with a live demo of OpenSSF Model Signing: sign, verify, tamper with one byte, verify again.`,
    ],
    takeaways: [
      `An agent's attack surface is wider than the model itself`,
      'Why models need signing and provenance the way packages do',
      'A secure inbound/transform/outbound model pipeline, plus three things to do the following Monday',
    ],
  },
  {
    title: 'Breaking Bad: Container Security is Broken',
    event: 'BSides Vizag',
    date: 'December 2025',
    format: 'Talk + live demo',
    links: [
      {
        name: 'Slides',
        url: 'https://speakerdeck.com/shivamsaraswat/breaking-bad-container-security-is-broken-light',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/shivamsaraswat/VulnSort',
      },
    ],
    description: [
      'A hacker’s guide to finding real threats in containers. Layer-aware vulnerability analysis combined with threat intelligence (CISA KEV, EPSS) to cut through scanner noise and focus on the vulnerabilities that matter. Includes a demo of running it in GitHub Actions, with the workflow available in the repo.',
    ],
    takeaways: [
      'How to prioritize vulnerabilities in containers',
      'How to use threat intelligence to focus on the vulnerabilities that matter',
      'How to build a container security program that actually works',
    ],
  },
];

const StyledMainContainer = styled.main`
  max-width: 900px;

  & > header {
    margin-bottom: 60px;

    .intro {
      max-width: 640px;
      margin-top: 20px;
      color: var(--light-slate);
      font-size: var(--fz-xl);
      line-height: 1.5;
    }
  }
`;

const StyledDetails = styled.section`
  margin-bottom: 80px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--lightest-navy);

  h2 {
    margin-bottom: 15px;
    font-size: var(--fz-lg);
  }

  .topics {
    ${({ theme }) => theme.mixins.fancyList};
    margin-bottom: 40px;
    font-size: var(--fz-lg);
    color: var(--light-slate);
  }

  .contact p {
    margin: 0;
    color: var(--light-slate);
    font-size: var(--fz-lg);
  }

  .contact a {
    ${({ theme }) => theme.mixins.inlineLink};
  }
`;

const StyledTalk = styled.article`
  margin-bottom: 100px;

  .talk-title {
    margin: 10px 0 15px;
    font-size: clamp(var(--fz-xxl), 4vw, 32px);
    line-height: 1.2;
  }

  .talk-meta {
    margin: 0 0 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    line-height: 1.75;

    .event {
      color: var(--lightest-slate);
      font-weight: 600;
    }

    .separator {
      margin: 0 8px;
    }
  }

  .talk-links {
    ${({ theme }) => theme.mixins.resetList};
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 25px;

    a {
      ${({ theme }) => theme.mixins.smallButton};
      display: inline-block;
    }
  }

  .talk-description p {
    margin: 0 0 1em;
    max-width: 700px;
    color: var(--light-slate);
    font-size: var(--fz-lg);
    line-height: 1.6;
  }

  .takeaways {
    margin-top: 30px;

    h3 {
      margin-bottom: 15px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      font-weight: 400;
    }

    ul {
      ${({ theme }) => theme.mixins.fancyList};
      color: var(--light-slate);
      font-size: var(--fz-md);
    }
  }
`;

const SpeakingPage = ({ location }) => {
  const revealTitle = useRef(null);
  const revealDetails = useRef(null);
  const revealTalks = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealDetails.current, srConfig(100));
    revealTalks.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <Layout location={location}>
      <StyledMainContainer>
        <header ref={revealTitle}>
          <h1 className="big-heading">Speaking</h1>
          <p className="intro">
            I talk about the unglamorous parts of security that decide whether organisations
            actually get safer: supply chain, containers, and the dependencies nobody reviews. I
            build this stuff at PayPal, so the talks come from production problems, not theory.
          </p>
        </header>

        <StyledDetails ref={revealDetails}>
          <h2 className="overline">Topics</h2>
          <ul className="topics">
            {topics.map((topic, i) => (
              <li key={i}>{topic}</li>
            ))}
          </ul>

          <div className="contact">
            <h2 className="overline">Want me at your event?</h2>
            <p>
              <a href={`mailto:${email}`}>{email}</a> /{' '}
              <a
                href="https://www.linkedin.com/in/shivamsaraswat/"
                target="_blank"
                rel="noopener noreferrer">
                LinkedIn
              </a>{' '}
              /{' '}
              <a
                href="https://sessionize.com/shivamsaraswat/"
                target="_blank"
                rel="noopener noreferrer">
                Sessionize
              </a>
            </p>
          </div>
        </StyledDetails>

        {talks.map(({ title, event, date, format, links, description, takeaways }, i) => (
          <StyledTalk key={i} ref={el => (revealTalks.current[i] = el)}>
            <h2 className="talk-title">{title}</h2>
            <p className="talk-meta">
              <span className="event">{event}</span>
              <span className="separator">&middot;</span>
              <span>{date}</span>
              <span className="separator">&middot;</span>
              <span>{format}</span>
            </p>

            <ul className="talk-links">
              {links.map(({ name, url }, j) => (
                <li key={j}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="talk-description">
              {description.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
            </div>

            <div className="takeaways">
              <h3>Takeaways</h3>
              <ul>
                {takeaways.map((takeaway, j) => (
                  <li key={j}>{takeaway}</li>
                ))}
              </ul>
            </div>
          </StyledTalk>
        ))}
      </StyledMainContainer>
    </Layout>
  );
};

SpeakingPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SpeakingPage;

export const Head = ({ location }) => (
  <SEO
    title="Speaking"
    description="Talks on AI/agent supply chain security, container security, software supply chain attacks, and DevSecOps at scale."
    pathname={location.pathname}
  />
);
