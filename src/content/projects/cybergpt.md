---
order: 1
title: "CyberGPT: Retrieval-Augmented Security Incident Response Copilot"
shortTitle: "CyberGPT"
description: "A Python-based SOC copilot that classifies incident narratives, retrieves response playbooks, maps MITRE ATT&CK techniques, detects novelty and generates structured analyst guidance."
status: "Functional research prototype; ongoing improvements"
period: "2026 — Present"
domain: "AI-Driven Cybersecurity"
role: "Independent researcher and developer"
technologies:
  - "Python"
  - "Google Colab"
  - "SentenceTransformers"
  - "FAISS"
  - "Pandas"
  - "NLP"
  - "MITRE ATT&CK"
featured: true
legacy: false
coverIcon: "shield"
blogSlug: "cybergpt-incident-response-copilot"
repositoryUrl: ""
demoUrl: ""
reportUrl: ""
outcomes:
  - "Knowledge base covering approximately 30 attack categories"
  - "Hybrid semantic retrieval and keyword boosting"
  - "Novel-threat review queue and structured SOC reporting"
---
## Problem

Entry-level analysts and small SOC teams need to turn unstructured alert descriptions into consistent investigation and response decisions. General-purpose chatbots can be unpredictable, while rigid classifiers provide limited context.

## What I built

CyberGPT combines a structured cybersecurity knowledge base with semantic retrieval, security-specific keyword signals and confidence thresholds. It returns ranked attack hypotheses, MITRE ATT&CK mappings, severity, indicators and a practical response playbook.

## Core workflow

1. Accept an incident narrative from an analyst.
2. Normalise and embed the text with SentenceTransformers.
3. Search FAISS for semantically similar knowledge entries.
4. Apply security-specific keyword boosts and confidence logic.
5. Flag low-confidence or unmatched incidents for human review.
6. Generate a structured SOC report and preserve it in the incident log.

## Engineering decisions

- Human review is retained for uncertain or potentially novel incidents.
- The knowledge base stores investigation, containment, recovery and prevention guidance instead of only labels.
- Hybrid scoring reduces confusion between attacks that share vocabulary, such as prompt injection and SQL injection.

## Current limitations

The prototype uses a curated knowledge base and evaluation examples. It is not yet connected to a production SIEM or live threat-intelligence feed.

## Roadmap

Live SIEM ingestion, indicator extraction, labelled-dataset evaluation, analyst feedback, role-based access and approval-based automated playbook execution.
