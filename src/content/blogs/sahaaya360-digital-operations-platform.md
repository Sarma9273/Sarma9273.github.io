---
title: "Sahaaya360 — Developing a Digital Operations and Support Platform"
description: "Sahaaya360 is a low-cost institutional operations platform designed to manage complaints, assets, vendors, safety checks, cyber incidents, and compliance-readiness activities through Google Workspace tools and lightweight automation."
status: "MVP-oriented prototype and startup concept"
domain: "SaaS, Institutional Operations, Automation"
publishedAt: 2026-07-14
updatedAt: 2026-07-20
tags:
  - "SaaS"
  - "Google Apps Script"
  - "Automation"
  - "Startup"
  - "Institutional Management"
  - "Product Development"
featured: true
draft: false
coverIcon: "workflow"
relatedProject: "sahaaya360"
googleDocUrl: ""
---
## Introduction

Many schools, hostels, coaching centres, apartments, clinics, colleges, and small organisations manage their daily operations through notebooks, phone calls, WhatsApp messages, and disconnected spreadsheets.

Complaints may not receive tracking numbers. Maintenance requests may be forgotten. Asset details may be stored in different files. Safety checks may not be documented consistently. Cyber incidents may be handled without a clear record.

I started Sahaaya360 to explore whether these activities could be brought into one simple and affordable platform.

## Vision of the Project

The vision behind Sahaaya360 is to create an AI-assisted support and operations ecosystem for organisations that cannot immediately invest in expensive enterprise software.

The initial version, called SahaayaOS Lite, was designed using free or low-cost Google tools so that an early prototype could be developed without requiring a large infrastructure budget.

The platform is intended to support both operational and digital-safety requirements.

## Core Modules

The MVP structure included the following modules:

- Institutions

- Tickets

- Assets

- Vendors

- Safety checks

- Cyber incidents

- DPDP readiness

- Monthly reports

- Form links

Each module represents an important organisational function.

For example, the ticket module can store the complaint, institution, category, severity, assigned owner, status, SLA target, creation date, and resolution details.

## Ticket Management Workflow

One of the first major workflows developed was complaint and service-ticket management.

A Google Form allows a user to submit a request. The information is transferred to Google Sheets, where the system can:

- Generate the next ticket ID

- Classify the request

- Suggest an owner

- Assign a service-level target

- Track ticket status

- Record completion information

- Include the ticket in reports

Sample institutions were also added to test how the platform could support different organisations.

## Tools and Implementation

Sahaaya360 was developed using:

- Google Sheets as the operational database

- Google Forms for complaint submission

- Google Apps Script for automation

- Python for selected data-processing tasks

- Google Drive for structured document storage

This technology choice was intentional. The goal was to create a working MVP before investing in a larger custom application.

Timestamped CSV backups were also introduced to protect important sheet data and maintain historical records.

## Challenges Faced

While automating the Google Workspace environment, I encountered several practical issues.

One error occurred because the Google Forms API was not enabled. Another occurred when SpreadsheetApp.getUi() was called from a context that did not support user-interface operations.

Solving these problems improved my understanding of Google Apps Script execution contexts, service permissions, API activation, triggers, and the difference between manually executed functions and event-based functions.

Another challenge was deciding which features truly belonged in the MVP. A startup project can easily become too large, so the focus had to remain on building a small but demonstrable workflow.

## What I Learned

Sahaaya360 taught me that building a product involves more than writing code.

It requires:

- Understanding the user’s operational problem

- Selecting the right MVP features

- Designing data structures

- Creating repeatable workflows

- Planning service-level expectations

- Preparing demonstrations for potential users

- Thinking about privacy and compliance

- Creating pitch and proof documents

- Identifying realistic early adopters

It also helped me think like both a developer and a product founder.

## Future Scope

Future versions may include:

- Dedicated web and mobile interfaces

- Login and role-based permissions

- WhatsApp or email notifications

- AI-assisted ticket classification

- Vendor-performance tracking

- Asset-maintenance reminders

- Complaint escalation

- Institution-specific dashboards

- DPDP compliance support

- Subscription-based SaaS plans

- Advanced reports and analytics

## Technology Stack

Google Sheets, Google Forms, Google Apps Script, Python, Google Drive, workflow automation, data management and MVP product design.

## Key takeaway
Sahaaya360 helped me move beyond a classroom-style project and think about how technology could become a real service. It gave me experience in workflow automation, product planning, MVP development, troubleshooting, documentation, and startup-oriented problem solving.
