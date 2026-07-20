---
order: 2
title: "SOC Home Lab and Security Monitoring Dashboard"
shortTitle: "SOC Home Lab"
description: "A four-system virtual security operations environment for controlled attack simulation, endpoint telemetry, SIEM investigation and analyst workflow practice."
status: "Implemented in phases; continuing expansion"
period: "2026 — Present"
domain: "Security Operations & Monitoring"
role: "Lab architect, analyst and developer"
technologies:
  - "Oracle VirtualBox"
  - "Kali Linux"
  - "Windows 10"
  - "Ubuntu Server"
  - "Splunk"
  - "Sysmon"
  - "Winlogbeat"
  - "PowerShell"
featured: true
legacy: false
coverIcon: "network"
blogSlug: "practical-soc-home-lab"
repositoryUrl: ""
demoUrl: ""
reportUrl: ""
outcomes:
  - "Four-system isolated SOC architecture"
  - "Windows auditing, Sysmon and log forwarding"
  - "Detection practice for failed logons, scanning and suspicious execution"
---
## Objective

Build a safe, repeatable environment in which attacker activity can be generated, observed, investigated and documented from a defender's perspective.

## Architecture

- **Kali Linux:** controlled attack simulation and reconnaissance.
- **Windows 10:** monitored endpoint and investigation target.
- **Ubuntu Server:** supporting services and log-forwarding experiments.
- **Splunk Server:** central search, alerting and dashboard platform.

The machines use an isolated `SOC-LAB` network. NAT is enabled separately only when updates are needed.

## Detection practice

The lab covers failed logons, reconnaissance, suspicious PowerShell activity, process creation, endpoint network connections and analyst documentation. Windows Security logs, Sysmon and Winlogbeat provide the telemetry required for investigation.

## Troubleshooting evidence

The build included practical infrastructure issues such as the VirtualBox `VERR_INTNET_FLT_IF_NOT_FOUND` adapter error, audit-policy configuration and noisy-event reduction. These failures became part of the documented learning process.

## Roadmap

Add Wazuh or Elastic Security, Zeek, Sigma rules, Active Directory, malware-analysis exercises and a connection between SIEM alerts and CyberGPT.
