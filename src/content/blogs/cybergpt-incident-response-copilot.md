---
title: "CyberGPT — Building an Intelligent Incident Response Copilot for Security Operations"
description: "CyberGPT is an AI-powered security incident response copilot that analyses incident descriptions, identifies possible cyberattacks, maps them to MITRE ATT&CK techniques, detects potentially novel threats, and generates structured investigation and response guidance for security analysts."
status: "Functional research prototype with ongoing improvements"
domain: "Artificial Intelligence, Cybersecurity, SOC Automation"
publishedAt: 2026-07-11
updatedAt: 2026-07-20
tags:
  - "Artificial Intelligence"
  - "Cybersecurity"
  - "SOC"
  - "FAISS"
  - "NLP"
  - "MITRE ATT&CK"
  - "Incident Response"
  - "Threat Detection"
featured: true
draft: false
coverIcon: "shield"
relatedProject: "cybergpt"
googleDocUrl: ""
---
## Introduction

Security Operations Centre analysts regularly handle large volumes of security alerts. Each alert must be investigated, classified, prioritised, and connected to an appropriate response procedure. For an experienced analyst, this process may be manageable. However, for entry-level analysts and small security teams, identifying the correct attack type and deciding the next action can be difficult.

I developed CyberGPT to explore how artificial intelligence and information retrieval could support this process. Instead of functioning as a general chatbot, CyberGPT was designed as a specialised security incident response assistant.

The project combines natural language processing, semantic search, cybersecurity knowledge, and rule-based analysis to convert an unstructured incident description into a structured security response.

## The Problem I Wanted to Solve

Security alerts are often written in plain language, such as:

> “A user clicked a Microsoft login page and entered their credentials.”

A SOC analyst must understand that this could be a phishing incident, identify the likely MITRE ATT&CK technique, determine the severity, investigate the affected account, and recommend containment measures.

The main objective of CyberGPT was to automate the initial part of this reasoning process while keeping a human analyst involved in the final decision.

## Building the Cybersecurity Knowledge Base

One of the most important parts of the project was the creation of a cybersecurity knowledge base.

I developed structured knowledge entries for approximately 30 attack categories, including:

- Phishing

- Business email compromise

- Credential stuffing

- Password spraying

- Malware

- Ransomware

- SQL injection

- Cross-site scripting

- Data exfiltration

- DNS tunnelling

- Account takeover

- Session hijacking

- Token theft

- Lateral movement

- Active Directory compromise

- Cloud misconfiguration

- API abuse

- Supply-chain attacks

- AI prompt injection

Each knowledge-base entry contains information such as the incident description, MITRE ATT&CK identifier, indicators, severity, containment steps, investigation steps, recovery actions, detection rules, affected assets, commonly used tools, and prevention recommendations.

This transformed the project from a simple classification model into a retrieval-based incident response system.

## Semantic Search and Hybrid Classification

CyberGPT uses SentenceTransformers to convert incident descriptions and knowledge-base entries into numerical embeddings.

FAISS is used to compare these embeddings and retrieve the attack categories that are semantically closest to the submitted incident. Vector normalisation is applied before similarity comparison to improve consistency.

However, semantic similarity alone may occasionally produce an incorrect result. For example, an AI prompt-injection incident might initially resemble an SQL-injection incident because both contain the word “injection.”

To reduce this problem, I added a hybrid keyword-boosting mechanism. When important attack-specific indicators are found, the relevant category receives an additional score. This allows the system to combine semantic understanding with cybersecurity-specific rules.

## Novel-Threat Detection

Another major feature of CyberGPT is novelty detection.

When the system receives an incident that does not strongly match any known knowledge-base category, it marks the incident as potentially unknown or novel instead of forcing it into an incorrect category.

Such incidents can be placed in a review queue for manual investigation. This is particularly important in cybersecurity because a low-confidence result may indicate a new attack pattern rather than a simple classification failure.

## Incident Reporting and Response Guidance

CyberGPT generates a structured SOC report containing:

- Incident timestamp

- Incident summary

- Predicted attack category

- Confidence score

- MITRE ATT&CK mapping

- Severity level

- Novelty status

- Containment guidance

- Investigation procedure

- Recovery recommendations

- Prevention guidance

The system also maintains an incident log and a review queue. These features make the project closer to a practical SOC-support platform rather than only a machine-learning demonstration.

## Challenges and Lessons

The most significant challenge was improving the reliability of predictions. Cybersecurity incidents frequently share words and behaviours, which can confuse a purely semantic model.

This taught me that practical AI systems often require a combination of techniques. Embeddings provided contextual understanding, while keyword rules, confidence thresholds, and analyst review provided additional control.

I also learned that a well-designed knowledge base is as important as the AI model. Poor or incomplete knowledge would lead to weak recommendations regardless of the retrieval algorithm.

## Future Scope

The next improvements planned for CyberGPT include:

- Integration with live SIEM alerts

- Automatic extraction of indicators of compromise

- Improved evaluation using labelled incident datasets

- Analyst feedback for continuous knowledge-base improvement

- Integration with threat-intelligence feeds

- Role-based access for analysts and administrators

- Better visual dashboards and investigation timelines

- Automated playbook execution with human approval

## Technology Stack

Python, Google Colab, SentenceTransformers, FAISS, Pandas, natural language processing, MITRE ATT&CK, hybrid keyword analysis, novelty detection, incident logging and report generation.

## Key takeaway
CyberGPT helped me understand how artificial intelligence can assist cybersecurity professionals without attempting to replace human judgement. It also gave me practical experience in retrieval-augmented systems, vector search, incident-response procedures, cybersecurity knowledge engineering, and AI-assisted decision support.
