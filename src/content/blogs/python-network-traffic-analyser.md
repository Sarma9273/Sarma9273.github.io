---
title: "Building a Python-Based Network Traffic Analyser and SOC Dashboard"
description: "A Python-based network-security project that analyses traffic-related security information and presents important indicators through a simplified SOC-style dashboard."
status: "Core analysis and dashboard phases completed; further automation planned"
domain: "Network Security, Python, SOC Monitoring"
publishedAt: 2026-07-13
updatedAt: 2026-07-20
tags:
  - "Python"
  - "Network Security"
  - "SOC Dashboard"
  - "Traffic Analysis"
  - "Cybersecurity"
  - "Data Analysis"
featured: true
draft: false
coverIcon: "activity"
relatedProject: "network-traffic-analyser"
googleDocUrl: ""
---
## Introduction

Network traffic is one of the most valuable sources of information during a cybersecurity investigation. Scanning, unauthorised access attempts, suspicious connections, and data-transfer behaviour often leave detectable patterns in network records.

I started this project to understand how raw network information could be converted into meaningful security observations. The project gradually developed from a basic analyser into a structured SOC-style dashboard that could be viewed through a browser.

## Project Objective

The main objective was to build an understandable security-monitoring workflow for beginners.

Instead of displaying large amounts of raw technical data, the system was designed to present information such as:

- Source and destination addresses

- Protocol information

- Connection behaviour

- Suspicious activity

- Alert severity

- Traffic statistics

- Incident summaries

This approach made the project useful not only for analysis but also for learning how security dashboards organise information.

## Development Approach

The project was developed phase by phase using Python and Google Colab.

The early phases focused on setting up the project structure, organising input data, preparing the analysis logic, and creating reusable functions.

Later phases concentrated on presenting the output through a web-style SOC dashboard. This allowed the results to be accessed through a browser, including from a mobile phone when the notebook environment was running.

The dashboard was designed to reduce technical complexity and present the most important security information in a clear manner.

## Dashboard Components

The dashboard concept included sections such as:

- Total traffic records

- Number of alerts

- Normal and suspicious activity

- Protocol distribution

- Source-address activity

- Severity categories

- Recent incidents

- Analyst notes

- Recommended response actions

A security dashboard should not merely look attractive. It should help the analyst answer practical questions:

- What happened?

- When did it happen?

- Which system was involved?

- How serious is it?

- What should be investigated next?

These questions guided the dashboard layout.

## Challenges Faced

Because the project was developed inside a notebook environment, managing large blocks of HTML and Python code created syntax-related difficulties.

For example, incomplete multiline strings produced errors when dashboard content was not closed correctly. Solving these issues improved my understanding of code organisation, string handling, notebook execution order, and the importance of dividing long code into reusable sections.

Another challenge was making the dashboard usable on both desktop and mobile screens. This encouraged me to consider responsive presentation instead of designing only for a laptop display.

## Learning Outcomes

This project helped me learn:

- Basic network-security analysis

- Python-based data processing

- Organising security events

- Building dashboards from analysis results

- Presenting technical information visually

- Debugging notebook-based applications

- Designing for mobile and desktop access

- Converting raw information into analyst-friendly summaries

It also helped connect my Python learning with my interest in SOC operations.

## Future Scope

Planned improvements include:

- Live packet-capture integration

- PCAP file analysis

- Protocol-level anomaly detection

- Automatic IP reputation checking

- Exportable incident reports

- Detection of port scans and brute-force activity

- Integration with Zeek, Wireshark or Suricata

- Machine-learning-based anomaly identification

- Connection with the CyberGPT incident-response engine

## Technology Stack

Python, Google Colab, Pandas, notebook-based web output, HTML, CSS, network-security concepts and SOC dashboard design.

## Key takeaway
This project taught me that cybersecurity data becomes valuable only when it is organised into information that an analyst can understand and act upon. It also strengthened my ability to combine Python, network concepts, and user-interface design in one practical project.
