import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledRecognitionSection = styled.section`
  max-width: 900px;

  .recognition-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-gap: 15px;
    margin-top: 50px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledRecognitionCard = styled.li`
  ${({ theme }) => theme.mixins.boxShadow};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  height: 100%;
  padding: 2rem 1.75rem;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      transform: translateY(-7px);
    }
  }

  .card-kind {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .card-title {
    margin: 0 0 8px;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    font-weight: 700;

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .card-desc {
    color: var(--light-slate);
    font-size: var(--fz-md);
    font-weight: 500;
    line-height: 1.5;
  }
`;

const recognitionItems = [
  {
    kind: 'Certification',
    title: 'Certified Ethical Hacker (Practical)',
    desc: 'EC-Council',
    url: 'https://drive.google.com/file/d/1BNm0BA837_kds7ITUTGTjpvIyeq5j93R/view',
  },
  {
    kind: 'Award',
    title: 'Best Security Product of the Year',
    desc: 'For “Heimdall,” the automated web & API security monitoring platform built at IKEA',
    url: 'https://www.linkedin.com/posts/shivamsaraswat_cybersecurity-quanticawards-ikea-ugcPost-7124484497433100288-wdEV/',
  },
  {
    kind: 'Talk',
    title: 'Speaker at BSides Vizag 2025',
    desc: '“Breaking Bad: Container Security is Broken” — layer-aware vulnerability analysis with CISA KEV & EPSS threat intelligence',
    url: 'https://speakerdeck.com/shivamsaraswat/breaking-bad-container-security-is-broken-light',
  },
  {
    kind: 'Publication',
    title: 'Refinements in Zeek Intrusion Detection System',
    desc: 'IEEE ICACCS 2022 — conference proceedings',
    url: 'https://doi.org/10.1109/ICACCS54159.2022.9785047',
  },
];

const Recognition = () => {
  const revealTitle = useRef(null);
  const revealCards = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealCards.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledRecognitionSection id="recognition">
      <h2 className="numbered-heading" ref={revealTitle}>
        Recognition
      </h2>

      <ul className="recognition-grid">
        {recognitionItems.map(({ kind, title, desc, url }, i) => (
          <StyledRecognitionCard key={i} ref={el => (revealCards.current[i] = el)}>
            <span className="card-kind">{kind}</span>
            <h3 className="card-title">
              {url ? (
                <a href={url} target="_blank" rel="noreferrer">
                  {title}
                </a>
              ) : (
                title
              )}
            </h3>
            <p className="card-desc">{desc}</p>
          </StyledRecognitionCard>
        ))}
      </ul>
    </StyledRecognitionSection>
  );
};

export default Recognition;
