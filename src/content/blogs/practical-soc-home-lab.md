---
title: "Designing a Practical SOC Home Lab for Threat Detection and Incident Response"
description: "A virtual Security Operations Centre lab built with Kali Linux, Windows 10, Ubuntu Server, Splunk, Sysmon, and Windows auditing to simulate attacks, collect logs, create detections, and practise incident investigation."
status: "Implemented in multiple phases with continued expansion"
domain: "Cybersecurity, SOC Operations, Security Monitoring"
publishedAt: 2026-07-12
updatedAt: 2026-07-20
tags:
  - "SOC"
  - "Cybersecurity Lab"
  - "Splunk"
  - "Sysmon"
  - "Kali Linux"
  - "Incident Response"
  - "SIEM"
  - "Threat Detection"
featured: true
draft: false
coverIcon: "network"
relatedProject: "soc-home-lab"
googleDocUrl: ""
---
## Introduction

Understanding cybersecurity theory is important, but working in a Security Operations Centre requires practical experience with systems, networks, logs, alerts, and investigation tools.

To develop these skills, I started building a practical SOC home lab using Oracle VirtualBox. The objective was to create a controlled environment in which attacks could be safely simulated, monitored, detected, and investigated.

The project allowed me to experience both sides of cybersecurity: how an attack is performed and how a security analyst identifies it from system and network evidence.

## Lab Architecture

The SOC lab was designed using multiple virtual machines with separate responsibilities:

- Kali Linux: Attacker and security-testing machine

- Windows 10: Victim or monitored endpoint

- Ubuntu Server: Supporting server and log-forwarding system

- Splunk Server: Central security monitoring and analysis platform

The machines communicate through an isolated VirtualBox internal network named SOC-LAB. A separate NAT adapter can be enabled when updates or package installations are required.

This design helps reduce the risk of accidentally exposing the testing environment to the public network.

## Endpoint Logging

The Windows virtual machine was configured to produce useful security logs.

Important logging sources included:

- Windows Security Event Logs

- Failed and successful login events

- PowerShell logs

- Process creation events

- Sysmon events

- Network connection information

Sysmon provides more detailed endpoint visibility than standard Windows logging. It can record process creation, file activity, network connections, registry changes, and other behaviours that may indicate malicious activity.

Winlogbeat or a log-forwarding agent can then send the events to the central monitoring platform.

## Attack Simulation

The Kali Linux machine was used to perform controlled security tests against the lab environment.

The planned and practised scenarios included:

- Nmap network scanning

- Repeated failed login attempts

- Password brute-force simulation

- Suspicious PowerShell activity

- Reverse-shell behaviour

- Basic exploitation exercises

- Web-application testing

- Enumeration of services and ports

These actions were conducted only inside the isolated lab for learning and defensive-security purposes.

## Detection and Investigation

The most valuable part of the project was not simply generating attacks. It was learning how those activities appeared in security logs.

For example, repeated failed Windows logins can be detected using Event ID 4625. A sudden increase in these events from the same source may indicate a brute-force or password-spraying attempt.

Similarly, suspicious PowerShell commands, unusual child processes, new network connections, and unexpected service activity can be identified through Windows and Sysmon events.

The dashboard design included panels for:

- Failed login trends

- Top source IP addresses

- Suspicious processes

- PowerShell activity

- Malware indicators

- Security alert timelines

- Frequently targeted systems

- Incident severity distribution

## Challenges Faced

Building the lab involved several practical challenges.

One issue was the VirtualBox host-only adapter error:

VERR_INTNET_FLT_IF_NOT_FOUND

This required reviewing the network adapters, recreating the host-only network where necessary, and separating internet access from the internal SOC network.

Other challenges included configuring log forwarding, selecting relevant Windows audit policies, reducing noisy events, and understanding which logs were actually useful during an investigation.

These difficulties were valuable because troubleshooting infrastructure is an important part of real SOC and security-engineering work.

## Skills Developed

Through this project, I developed a better understanding of:

- SOC architecture

- Virtual network design

- Windows event logging

- Sysmon configuration

- SIEM searches

- Alert investigation

- Attack simulation

- Incident documentation

- Detection-rule creation

- Log correlation

- Basic threat hunting

The project also improved my ability to connect attacker behaviour with the evidence that defenders observe.

## Future Scope

Future improvements include:

- Adding Wazuh or Elastic Security

- Integrating Zeek network logs

- Creating Sigma-based detection rules

- Simulating additional MITRE ATT&CK techniques

- Adding malware-analysis exercises

- Building automated alert notifications

- Developing incident-response playbooks

- Adding Active Directory to the environment

- Integrating CyberGPT with the lab alerts

## Technology Stack

Oracle VirtualBox, Kali Linux, Windows 10, Ubuntu Server, Splunk, Sysmon, Winlogbeat, Windows Event Viewer, PowerShell, Nmap and MITRE ATT&CK.

## Key takeaway
This project transformed cybersecurity concepts into practical experience. Instead of only reading about attacks and alerts, I could generate activity, observe the corresponding evidence, investigate it, and document the response like a SOC analyst.
