---
title: 'Server-Side Request Forgery (SSRF)'
description: 'Tricking a server into making requests for you. Allowlist when you can, validate resolved IPs when you cannot, and block metadata endpoints.'
slug: '/pensieve/ssrf'
date: '2026-10-06'
tags: ['web', 'ssrf']
sources:
  - title: 'OWASP: Server-Side Request Forgery Prevention Cheat Sheet'
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html'
---

## What it is

The attacker gets the **server** to send a request to a destination they choose, usually through a URL the app accepts and fetches: an image URL, a webhook, an import-from-URL feature. The request comes from inside the trust boundary, so it can reach internal services, localhost and cloud metadata endpoints that the attacker cannot reach directly.

## Pick the case first

The defenses depend on which of two situations you are in:

1. **The app only needs to talk to known services.** Use an **allowlist**.
2. **Users can supply arbitrary external URLs** (webhooks, for example). An allowlist is not possible, so you have to **block internal targets** and accept that a deny-list is bypass-prone.

## Case 1: known services

- Don't accept full URLs. Take only the IP or domain, validate it, and build the request yourself.
- Validate IPs with a vetted library, not a hand-written regex, then check against the allowlist.
- Validate domain format without doing a DNS lookup, then check against the allowlist.
- Turn off redirect following in the HTTP client.

## Case 2: arbitrary external URLs

1. Validate the IP or domain format with a library.
2. Require the address to be **public**. Reject private ranges (`10/8`, `172.16/12`, `192.168/16`), localhost, link-local, IPv6 unique-local and multicast, and metadata IPs.
3. If given a domain, **resolve it and check every resulting IP**.
4. Allow only `http` and `https`.
5. Build the request from the validated parts only and **disable redirects**.
6. Optionally, have the target prove it is legitimate with a random token that the caller must echo back.

## Pitfalls that cause bypasses

- **Parser disagreement:** two parsers can read different hosts from the same string (`http://example.com\@evil.com`). If parsers disagree, reject the input.
- **DNS rebinding:** the name resolves to a public IP during validation and an internal IP when the request is made. Bind the connection to the IP you validated.
- **IP encodings:** hex, octal, dword and URL-encoded forms get past naive checks. Use a library built to handle them and use its output.
- **Complex regexes:** easy to get wrong. Prefer libraries.
- **Redirects:** a validated URL can redirect to an internal one, so don't follow them.

## Cloud metadata

Block metadata endpoints (`169.254.169.254`, `metadata.google.internal`, `metadata.amazonaws.com`). On AWS, **require IMDSv2 and disable IMDSv1**. This limits the damage even if SSRF exists.

## Defense in depth

Enforce at **both layers**: validation in the application, and firewall rules or network segmentation so the app host can only reach what it needs. Semgrep has rules for finding SSRF sinks in code.
