---
order: 1
title: "CyberGPT: Retrieval-Augmented Security Incident Response Copilot"
shortTitle: "CyberGPT"
description: "A Python-based SOC copilot that classifies incident narratives, retrieves response playbooks, maps MITRE ATT&CK techniques, detects novelty and generates structured analyst guidance."
status: "Functional research prototype; evolved into the RA-XSOC direction"
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

CyberGPT was the original security-copilot direction. It combines a structured cybersecurity knowledge base with semantic retrieval, security-specific keyword signals and confidence thresholds. It returns ranked attack hypotheses, MITRE ATT&CK mappings, severity, indicators and a practical response playbook.

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

## Evolution into RA-XSOC

CyberGPT should not be treated as an unrelated predecessor to RA-XSOC. It is the earlier research direction that informed the broader RA-XSOC architecture.

The progression was:

**CyberGPT → retrieval + playbooks + MITRE context → RA-XSOC → evidence-driven investigation + correlation + extended SOC workflow**

The important change is architectural scope, not a replacement of one unrelated project by another.

## Current limitations

The prototype uses a curated knowledge base and evaluation examples. It is not yet connected to a production SIEM or live threat-intelligence feed.

## Roadmap

The original CyberGPT roadmap included live SIEM ingestion, indicator extraction, labelled-dataset evaluation, analyst feedback, role-based access and approval-based automated playbook execution. The active development direction is now RA-XSOC.

architecture:
  - Incident narrative input
  - Incident classification
  - Security knowledge base
  - SentenceTransformer embeddings
  - FAISS vector retrieval
  - Hybrid retrieval and context ranking
  - MITRE ATT&CK mapping
  - Structured incident response
workflow:
  - Receive security alert
  - Identify attack context
  - Embed and retrieve relevant playbooks
  - Apply keyword and confidence logic
  - Map techniques to MITRE ATT&CK
  - Produce analyst guidance and report
