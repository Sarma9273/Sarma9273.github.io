---
order: 2
title: "RA-XSOC: Retrieval-Augmented Extended Security Operations Center"
shortTitle: "RA-XSOC"
description: "An AI-powered Retrieval-Augmented Extended Security Operations Center designed to assist analysts with threat investigation, incident response, MITRE ATT&CK mapping and intelligent security workflows."
status: "Functional research prototype; active development"
period: "2026 — Present"
domain: "AI-Driven Cybersecurity"
role: "Independent researcher and developer"
technologies:
  - "Python"
  - "FAISS"
  - "SentenceTransformers"
  - "MITRE ATT&CK"
  - "RAG"
  - "NLP"
featured: true
legacy: false
coverIcon: "shield"
blogSlug: "cybergpt-incident-response-copilot"
repositoryUrl: ""
demoUrl: ""
reportUrl: ""
outcomes:
  - "Retrieval-augmented SOC investigation workflow"
  - "MITRE ATT&CK technique mapping"
  - "Structured analyst response and incident reporting"
  - "Human review retained for uncertain or novel cases"
---
## Problem

Security analysts need to move from raw alerts and incident narratives to contextual investigation, evidence and response decisions without losing traceability.

## What I built

RA-XSOC extends the CyberGPT research direction into a broader security-operations workflow. It combines security-event input, preprocessing, a cybersecurity knowledge base, vector retrieval, contextual reasoning, MITRE ATT&CK mapping and structured incident-response output.

## Core architecture

1. Security event or analyst query enters the system.
2. Security information is normalised and prepared for retrieval.
3. Relevant knowledge is retrieved from the security knowledge base.
4. Retrieval-augmented reasoning produces contextual threat analysis.
5. Behaviours and techniques are mapped to MITRE ATT&CK.
6. The analyst receives investigation findings and response guidance.
7. Structured incident information is retained for reporting and review.

## Engineering decisions

- Human review remains part of the workflow when confidence is low.
- Retrieval provides traceable context rather than relying only on free-form generation.
- Security-specific knowledge and MITRE mapping keep the assistant grounded in SOC terminology.

## Current limitations

This is a research prototype rather than a production SOC platform. Live SIEM ingestion, production identity controls and approval-based automated playbook execution remain future work.

## Roadmap

Live SIEM connectors, analyst feedback loops, richer evidence correlation, role-based access, evaluation datasets and approval-controlled SOAR actions.
