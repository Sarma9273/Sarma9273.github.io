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

RA-XSOC is the current evolution of the CyberGPT research direction. It extends retrieval-augmented incident assistance into a broader security-operations workflow combining security-event input, preprocessing, a cybersecurity knowledge base, vector retrieval, contextual reasoning, MITRE ATT&CK mapping, novelty review and structured incident-response output.

## Core architecture

1. Security event or analyst query enters the system.
2. Security information is normalised and prepared for retrieval.
3. Relevant knowledge is retrieved from the security knowledge base.
4. Retrieval-augmented reasoning produces contextual threat analysis.
5. Behaviours and techniques are mapped to MITRE ATT&CK.
6. The analyst receives investigation findings and response guidance.
7. Structured incident information is retained for reporting and review.

## What changed from CyberGPT

The project broadened from a focused incident-response copilot into an extended SOC investigation architecture. The emphasis moved toward evidence, contextual correlation, uncertainty handling and a structured analyst workflow.

**CyberGPT** established the retrieval/playbook foundation.

**RA-XSOC** carries that foundation into a wider investigation and response system.

## Engineering decisions

- Human review remains part of the workflow when confidence is low.
- Retrieval provides traceable context rather than relying only on free-form generation.
- Security-specific knowledge and MITRE mapping keep the assistant grounded in SOC terminology.
- The architecture separates evidence/context retrieval from the analyst's final decision.

## Current limitations

This is a research prototype rather than a production SOC platform. Live SIEM ingestion, production identity controls and approval-based automated playbook execution remain future work.

## Roadmap

Live SIEM connectors, analyst feedback loops, richer evidence correlation, role-based access, evaluation datasets and approval-controlled SOAR actions.

architecture:
  - Security event / analyst input
  - Evidence and context preprocessing
  - Cybersecurity knowledge base
  - SentenceTransformer embeddings
  - FAISS retrieval
  - Hybrid relevance and contextual reasoning
  - MITRE ATT&CK mapping
  - Novelty / low-confidence review
  - Structured incident reporting
workflow:
  - Receive security event or investigation query
  - Normalize available context and evidence
  - Retrieve relevant security knowledge
  - Correlate context and retrieved guidance
  - Map supported behaviours to MITRE ATT&CK
  - Surface findings, uncertainty and response guidance
  - Retain structured information for analyst review
