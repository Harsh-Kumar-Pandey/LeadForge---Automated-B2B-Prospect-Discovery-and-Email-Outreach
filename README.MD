# LeadForge

LeadForge is a lead generation and outreach automation platform designed to streamline B2B prospecting workflows.

## System Overview

The system automatically:

1. Discovers companies similar to a target customer using Ocean.io.
2. Identifies decision-makers such as Founders, CEOs, and Vice Presidents using Prospeo.
3. Enriches contact information to obtain verified email addresses.
4. Generates personalized outreach emails.
5. Sends automated email campaigns through Brevo.

## Workflow

```
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
```

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

```
src/
├── config/
├── pipeline/
│   └── outreachPipeline.js
├── services/
│   ├── ocean.service.js
│   ├── prospeo.service.js
│   ├── brevo.service.js
│   └── leadGeneration.service.js
├── templates/
│   └── emailTemplate.js
├── utils/
│   ├── logger.js
│   ├── retry.js
│   ├── sleep.js
│   ├── index.js
│   └── test.js
├── outreachPipeline.js
└── index.js
```

## Throttling for API Calls

All API calls implement intelligent throttling to prevent hitting rate limits and ensure stable operations:

- **Ocean.io Requests** – Minimum 1 second interval between requests, max 2 concurrent requests
- **Prospeo Search Requests** – Minimum 500ms interval between requests, max 3 concurrent requests
- **Prospeo Enrichment Requests** – Minimum 500ms interval between requests, max 3 concurrent requests
- **Brevo Email Sends** – Minimum 2 seconds interval between sends, max 5 concurrent sends

## Use Cases

This project can be used by:

- Sales teams
- Growth teams
- Startup founders
- Business development representatives
- Recruitment outreach teams

to automate prospect discovery and outbound communication at scale.

## Future Improvements

- Web dashboard for campaign management and analytics
- CRM integration (Salesforce, HubSpot, Pipedrive)
- Advanced lead scoring and filtering
- A/B testing for email templates
- Multi-channel outreach (LinkedIn, SMS)
- Campaign performance analytics and ROI tracking
- Team collaboration and approval workflows
- Scheduled campaign execution
- Lead database and contact management
- Integration with more data providers and enrichment APIs
- Configurable throttling via environment variables

## Use Case

This project can be used by:
- Sales teams
- Growth teams
- Startup founders
- Business development representatives
- Recruitment outreach teams

to automate prospect discovery and outbound communication at scale.
