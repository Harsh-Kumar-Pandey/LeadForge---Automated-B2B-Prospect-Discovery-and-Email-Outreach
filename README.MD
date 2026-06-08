# LeadForge

LeadForge is an lead generation and outreach automation platform designed to streamline B2B prospecting workflows.

The system automatically:

1. Discovers companies similar to a target customer using Ocean.io.
2. Identifies decision-makers such as Founders, CEOs, and Vice Presidents using Prospeo.
3. Enriches contact information to obtain verified email addresses.
4. Generates personalized outreach emails.
5. Sends automated email campaigns through Brevo.

## Workflow

Seed Company Domain
        ↓
Ocean.io Lookalike Search
        ↓
Similar Companies
        ↓
Prospeo Person Search
        ↓
Decision Makers (C-Suite, VP, Founders)
        ↓
Prospeo Person Enrichment
        ↓
Verified Email Addresses
        ↓
Email Personalization
        ↓
Brevo Email Delivery

## Features

- Lookalike company discovery
- Decision-maker identification
- Contact enrichment
- Verified email retrieval
- Personalized email generation
- Automated email outreach
- Rate limiting and throttling support
- Modular service-oriented architecture

## Tech Stack

- Node.js
- Axios
- Ocean.io API
- Prospeo API
- Brevo API
- Dotenv

## Project Structure

src/
├── services/
│   ├── ocean.service.js
│   ├── prospeo.service.js
│   ├── brevo.service.js
│   └── leadGeneration.service.js
│
├── templates/
│   └── emailTemplate.js
│
├── utils/
│   └── sleep.js
│
├── outreachPipeline.js
└── index.js

## Use Case

This project can be used by:
- Sales teams
- Growth teams
- Startup founders
- Business development representatives
- Recruitment outreach teams

to automate prospect discovery and outbound communication at scale.
