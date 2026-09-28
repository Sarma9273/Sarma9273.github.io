---
order: 3
title: "SentinelOps-AI Command Center"
shortTitle: "SentinelOps-AI"
description: "A GitHub-only SOC L1 command center for alert triage, explainable risk scoring, incident investigation, MITRE ATT&CK context and playbook-driven response."
status: "Defined release scope complete; public demo"
period: "2026 — Present"
domain: "Security Operations & AI"
role: "Developer and SOC workflow designer"
technologies:
  - "HTML"
  - "CSS"
  - "JavaScript"
  - "Python"
  - "JSON"
  - "MITRE ATT&CK"
  - "GitHub Actions"
  - "GitHub Pages"
featured: true
legacy: false
coverIcon: "shield"
repositoryUrl: "https://github.com/Sarma9273/sentinelops-ai-command-center"
demoUrl: "https://sarma9273.github.io/sentinelops-ai-command-center/"
reportUrl: ""
outcomes:
  - "Alert triage and investigation workflow"
  - "Deterministic explainable 0–100 risk scoring"
  - "MITRE ATT&CK context and SOC L1 playbooks"
  - "Incident generation and analyst decision workflow"
---
## Problem

SOC analysts need a repeatable way to triage alerts, inspect evidence, understand risk, map behaviour to MITRE ATT&CK and document the investigation.

## What I built

SentinelOps-AI is a zero-cost, GitHub-only SOC L1 command center. The browser application uses repository-managed demonstration data and an explainable deterministic risk engine rather than claiming live autonomous ML inference.

## Core workflow

Security Alert → Risk Scoring → Alert Triage → Investigation → MITRE ATT&CK Context → Incident Case → SOC Playbook → Analyst Decision.

## Engineering decisions

- Risk scoring is deterministic and exposes the reasons behind the score.
- Demonstration data is repository-managed and reproducible.
- Analyst state is local to the browser; there is no shared production backend.
- The application explicitly separates learning/demo scope from production SOC capabilities.

## Current scope

The public release includes dashboard metrics, alert triage, investigation views, risk classification, MITRE context, incident cases, playbooks, analyst notes, validation tests and GitHub Pages deployment.

## Boundaries

It does not provide production authentication/RBAC, live SIEM ingestion, multi-user persistence, production SOAR execution or autonomous containment.

architecture:
  - Repository-managed alert and incident data
  - Browser application
  - Explainable risk engine
  - Alert triage and investigation
  - MITRE ATT&CK context
  - Incident generation
  - SOC L1 playbooks
  - Local analyst state
workflow:
  - Load demonstration alert data
  - Evaluate risk and reasons
  - Triage and investigate
  - Review MITRE context
  - Generate or open an incident
  - Follow the playbook
  - Record analyst decision
