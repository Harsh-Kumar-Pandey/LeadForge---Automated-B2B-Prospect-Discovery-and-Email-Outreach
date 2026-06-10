# LeadForge

**An automated B2B lead generation and outreach platform** that discovers potential customers and sends personalized outreach emails without manual research.

---

## 🎯 Overview

LeadForge streamlines the B2B sales process by automating:
- **Company Discovery** – Find similar companies using AI-powered similarity matching
- **Decision-Maker Identification** – Locate founders, CEOs, VPs, and C-suite executives
- **Contact Enrichment** – Verify and retrieve email addresses for decision-makers
- **Email Personalization** – Generate contextually relevant outreach emails
- **Campaign Automation** – Send emails at scale via email service provider

Perfect for sales teams, agencies, and businesses looking to scale outreach without manual research.

---

## 📊 How It Works

```
Seed Company
    │
    ▼
Ocean.io
(Find Similar Companies)
    │
    ▼
Top Similar Companies
    │
    ▼
Prospeo Search Person API
(Find Founders, CEOs, VPs)
    │
    ▼
Decision Makers
    │
    ▼
Prospeo Enrich Person API
(Get Verified Email Addresses)
    │
    ▼
Lead Filtering
(Remove duplicates, invalid contacts)
    │
    ▼
Email Template Generation
(Personalized outreach email)
    │
    ▼
Brevo API
(Send outreach emails)
    │
    ▼
Campaign Results
```

### Process Flow

1. **Company Similarity Search** – Input a seed company (e.g., `stripe.com`)
2. **Find Decision-Makers** – Locate founders, CEOs, and executives at similar companies
3. **Enrich Contacts** – Retrieve verified email addresses and company information
4. **Filter Leads** – Remove duplicates and invalid contacts
5. **Generate Emails** – Create personalized outreach emails using templates
6. **Send Campaign** – Distribute emails via Brevo (formerly Sendinblue)
7. **Track Results** – Monitor delivery and engagement metrics

---

## 📌 Example

**Input:** `stripe.com`

### Step 1: Ocean.io finds similar companies:
- Razorpay
- Cashfree
- PayU
- Airwallex
- Rapyd

### Step 2: Prospeo searches and finds decision-makers:
- Founders
- CEOs
- Vice Presidents
- C-Suite executives

### Step 3: Prospeo enriches contacts with verified emails

### Step 4: LeadForge generates personalized emails

### Step 5: Brevo sends the campaign automatically

**Result:** Hundreds of personalized cold emails sent to decision-makers at competing companies in minutes.

---

## 🏗️ Project Structure

```
LeadForge/
├── src/
│   ├── config/              # Configuration and environment setup
│   ├── pipeline/
│   │   └── outreachPipeline.js    # Main orchestration logic
│   ├── services/
│   │   ├── ocean.service.js       # Ocean.io API integration
│   │   ├── prospeo.service.js     # Prospeo API integration
│   │   ├── brevo.service.js       # Brevo email service
│   │   ├── leadGeneration.service.js  # Lead processing & filtering
│   │   └── easyreach.service.js   # Additional outreach service
│   └── utils/
│       ├── emailTemplate.js       # Email template generator
│       ├── logger.js              # Logging utility
│       ├── retry.js               # Retry logic for API calls
│       └── sleep.js               # Utility for delays
├── .env                     # Environment variables (not in version control)
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v14+ and npm
- **API Keys** for:
  - [Ocean.io](https://ocean.io) – Company similarity API
  - [Prospeo](https://prospeo.io) – Person search and enrichment API
  - [Brevo](https://brevo.com) – Email sending service

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd LeadForge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` with your API keys:**
   ```env
   OCEAN_API_KEY=your_ocean_api_key
   PROSPEO_API_KEY=your_prospeo_api_key
   BREVO_API_KEY=your_brevo_api_key
   BREVO_SENDER_EMAIL=your_sender_email@company.com
   ```

---

## 📖 Usage

### Running the Outreach Pipeline

```bash
npm start
```

This will:
1. Load configuration from `.env`
2. Initialize all API services
3. Execute the outreach pipeline
4. Log results and any errors

### Input Configuration

Modify the pipeline input in `src/pipeline/outreachPipeline.js`:

```javascript
const seedCompany = "stripe.com";
const targetRoles = ["Founder", "CEO", "VP of Sales"];
const emailTemplate = "default"; // Template name
```

### Output

Results are logged to the console and saved to:
- `./logs/outreach_TIMESTAMP.log` – Detailed campaign log
- `./results/leads_TIMESTAMP.json` – Generated leads with emails

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OCEAN_API_KEY` | Ocean.io API key for company similarity | ✅ |
| `PROSPEO_API_KEY` | Prospeo API key for person search | ✅ |
| `BREVO_API_KEY` | Brevo API key for email delivery | ✅ |
| `BREVO_SENDER_EMAIL` | Email address to send from | ✅ |
| `LOG_LEVEL` | Logging level (info, debug, error) | ⚠️ |
| `RETRY_ATTEMPTS` | Number of API retry attempts | ⚠️ |
| `RETRY_DELAY` | Delay between retries in ms | ⚠️ |

---

## 📚 API Integration Details

### Ocean.io Service
Finds companies similar to the seed company based on:
- Industry
- Company size
- Geographic location
- Business model

**Endpoint:** `GET /api/v2/companies/similar`

### Prospeo Service
Two main operations:

1. **Search People** – Find decision-makers at a company
   - Endpoint: `POST /api/v1/search/person`
   - Returns: Names, titles, departments

2. **Enrich Person** – Get verified contact information
   - Endpoint: `POST /api/v1/enrich/person`
   - Returns: Verified emails, phone numbers, LinkedIn URLs

### Brevo Service
Sends personalized emails through a campaign:
- Endpoint: `POST /api/v3/smtp/email`
- Features: Templates, personalization, scheduling

---

## 🛡️ Lead Filtering

The pipeline automatically filters leads to ensure quality:

- ✓ **Remove Duplicates** – One email per person
- ✓ **Validate Emails** – Regex and verification checks
- ✓ **Filter Roles** – Include only relevant decision-makers
- ✓ **Exclude Domains** – Skip personal emails and free domains
- ✓ **Deduplication** – Check against previous campaigns

---

## 📧 Email Personalization

The `emailTemplate.js` utility generates personalized emails using:

- **Recipient Name** – "Hi {firstName}"
- **Company Name** – "I noticed {companyName}"
- **Similarities** – "Like your focus on {feature}"
- **Call-to-Action** – Customized based on template type

### Adding Custom Templates

Create new templates in `src/utils/emailTemplate.js`:

```javascript
const templates = {
  custom: {
    subject: "Subject with {companyName}",
    body: "Email body with {firstName} and {companyName}"
  }
};
```

---

## 📊 Monitoring & Logging

LeadForge includes comprehensive logging via `src/utils/logger.js`:

```javascript
logger.info("Campaign started for Stripe");
logger.debug("Found 45 similar companies");
logger.warn("3 API rate limit warnings");
logger.error("Failed to enrich 2 contacts");
```

Logs are saved to:
- Console output (real-time)
- `./logs/outreach_TIMESTAMP.log` (persistent)

---

## ⚙️ Retry Logic

API calls automatically retry on failure using exponential backoff:

- **Retry Attempts:** 3 (configurable)
- **Initial Delay:** 1 second
- **Max Delay:** 30 seconds
- **Backoff:** Exponential

This ensures reliability when dealing with rate limits or temporary API outages.

---

## 🚦 Throttling & Rate Limit Management

LeadForge implements **intelligent throttling** across all API calls to prevent hitting rate limits and ensure stable, sustainable operations.

### Why Throttling Matters

- **API Rate Limits** – Each service has request limits per minute/hour
- **IP Reputation** – Too many requests too fast can trigger blocking
- **Email Deliverability** – Sending emails too fast may trigger spam filters
- **Stability** – Throttling prevents connection timeouts and 429 errors

### Throttling Implementation

All API services include built-in request throttling:

```javascript
// Example: Ocean.io service throttling
const throttledOceanSearch = throttle(oceanSearch, {
  minInterval: 1000,  // Minimum 1 second between requests
  maxConcurrent: 2    // Max 2 concurrent requests
});

// Example: Prospeo service throttling
const throttledProspeoSearch = throttle(prospeoSearch, {
  minInterval: 500,   // Minimum 0.5 second between requests
  maxConcurrent: 3    // Max 3 concurrent requests
});

// Example: Brevo email sending throttling
const throttledBrevoSend = throttle(brevoSend, {
  minInterval: 2000,  // Minimum 2 seconds between emails
  maxConcurrent: 5    // Max 5 concurrent sends
});
```

### Configuration

Update throttling settings in `.env`:

```env
# Ocean.io Throttling
OCEAN_MIN_INTERVAL_MS=1000
OCEAN_MAX_CONCURRENT=2

# Prospeo Throttling
PROSPEO_MIN_INTERVAL_MS=500
PROSPEO_MAX_CONCURRENT=3

# Brevo Throttling
BREVO_MIN_INTERVAL_MS=2000
BREVO_MAX_CONCURRENT=5
BREVO_BATCH_SIZE=50

# Global throttling
GLOBAL_MIN_INTERVAL_MS=100
GLOBAL_MAX_CONCURRENT_REQUESTS=10
```

### Rate Limits by API

#### Ocean.io
| Plan | Requests/Minute | Requests/Hour | Throttle Setting |
|------|-----------------|---------------|-----------------|
| Starter | 60 | 1,000 | 1000ms min interval |
| Growth | 300 | 5,000 | 500ms min interval |
| Pro | 1,000 | 20,000 | 200ms min interval |

#### Prospeo
| Plan | Requests/Day | Concurrent | Throttle Setting |
|------|--------------|-----------|-----------------|
| Free | 100 | 1 | 1000ms min interval |
| Pro | 5,000 | 2 | 500ms min interval |
| Enterprise | Unlimited | 5 | 200ms min interval |

#### Brevo
| Plan | Emails/Day | Concurrent | Throttle Setting |
|------|------------|-----------|-----------------|
| Free | 300 | 1 | 2000ms min interval |
| Starter | 20,000 | 2 | 1000ms min interval |
| Pro | 300,000+ | 5 | 500ms min interval |

### Recommended Throttling Strategy

**For Safe, Reliable Operations:**

```env
# Conservative (avoid all rate limits)
OCEAN_MIN_INTERVAL_MS=2000
PROSPEO_MIN_INTERVAL_MS=1000
BREVO_MIN_INTERVAL_MS=3000
GLOBAL_MAX_CONCURRENT_REQUESTS=5

# Balanced (good speed + safety)
OCEAN_MIN_INTERVAL_MS=1000
PROSPEO_MIN_INTERVAL_MS=500
BREVO_MIN_INTERVAL_MS=2000
GLOBAL_MAX_CONCURRENT_REQUESTS=10

# Aggressive (maximum speed, requires higher tier APIs)
OCEAN_MIN_INTERVAL_MS=500
PROSPEO_MIN_INTERVAL_MS=300
BREVO_MIN_INTERVAL_MS=1000
GLOBAL_MAX_CONCURRENT_REQUESTS=20
```

### Automatic Queue Management

The pipeline automatically:

1. **Queues Requests** – Requests are queued if limit would be exceeded
2. **Processes Sequentially** – Respects minimum intervals between calls
3. **Limits Concurrency** – Never exceeds max concurrent settings
4. **Monitors Headers** – Checks rate limit headers in responses
5. **Backs Off** – Automatically increases delays if rate limits approached

### Monitoring Rate Limit Status

```javascript
// Check current throttling status
const status = throttleManager.getStatus();

console.log({
  requestsQueued: status.queued,      // Waiting in queue
  requestsInFlight: status.inFlight,  // Currently executing
  nextAvailable: status.nextAvailable, // Timestamp when next request allowed
  remainingToday: status.remainingToday // API calls remaining today
});
```

### Handling Rate Limit Errors

If rate limits are hit despite throttling:

1. **Automatic Backoff** – Delays increase exponentially
2. **Retry Queue** – Failed requests are automatically retried
3. **Alert Logging** – Warnings logged when approaching limits
4. **Graceful Degradation** – Campaign continues with remaining requests

Example error handling:

```
[WARN] 2024-01-15 10:30:45 - Ocean.io rate limit at 85% (42/50 requests used)
[INFO] 2024-01-15 10:30:45 - Throttle interval increased from 1000ms to 2000ms
[WARN] 2024-01-15 10:31:20 - Prospeo rate limit exceeded, retrying in 30 seconds
[INFO] 2024-01-15 10:31:50 - Prospeo request succeeded on retry
```

### Best Practices

✅ **Start Conservative** – Use recommended "balanced" throttle settings  
✅ **Monitor Logs** – Check logs for rate limit warnings  
✅ **Scale Gradually** – Increase concurrency only after testing  
✅ **Use Batch Processing** – Process leads in smaller batches (10-50)  
✅ **Spread Over Time** – Schedule campaigns across multiple hours/days  
✅ **API Tier Matching** – Upgrade API plans if throttling too restrictive  
✅ **Cache Results** – Reuse company/person data to reduce API calls  

### Reducing API Calls

Ways to minimize throttling impact:

1. **Deduplicate Inputs** – Remove duplicate companies before processing
2. **Cache Similar Companies** – Store results locally for 7 days
3. **Batch Enrichment** – Enrich multiple contacts in single API calls
4. **Skip Invalid Emails** – Filter before sending to Brevo
5. **Reuse Templates** – Generate emails once, send to multiple people

---

---

## 🔐 Security Best Practices

- **Never commit `.env`** – It's in `.gitignore`
- **Rotate API Keys** – Periodically update credentials
- **Limit Permissions** – Use API keys with minimal required scopes
- **Monitor Usage** – Track API calls and spending
- **Validate Emails** – Never send to unverified addresses

---

## 📈 Performance Tips

1. **Batch Processing** – Process companies in batches of 10-20
2. **Rate Limiting** – Add delays between API calls to avoid throttling
3. **Caching** – Cache similar companies and decision-makers locally
4. **Parallel Requests** – Use Promise.all() for independent API calls
5. **Email Scheduling** – Spread sends over 24-48 hours for deliverability

---

## 🐛 Troubleshooting

### Common Issues

**"Invalid API Key" Error**
- Verify API keys in `.env` are correct
- Check that keys haven't expired
- Ensure keys have appropriate permissions

**"Rate Limit Exceeded"**
- Increase `RETRY_DELAY` in `.env`
- Reduce batch size
- Implement queue-based processing

**"Low Email Deliverability"**
- Use authenticated sender domain
- Warm up sending reputation with small batches
- Personalize subject lines and content
- Include unsubscribe links

**"No Decision-Makers Found"**
- Check if company exists in Prospeo database
- Try similar company names
- Expand role filter to include broader titles

---

## 📝 Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

### Code Quality

```bash
npm run lint
npm run format
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License – see LICENSE.md for details.

---

## 🙋 Support

For questions, issues, or feature requests:
- **GitHub Issues:** [Open an issue](https://github.com/yourusername/leadforge/issues)
- **Email:** support@leadforge.io
- **Documentation:** [Full docs](https://docs.leadforge.io)

---

## 🗺️ Roadmap

- [ ] Web dashboard for campaign management
- [ ] Advanced lead scoring and filtering
- [ ] Integration with CRM systems (Salesforce, HubSpot)
- [ ] A/B testing for email templates
- [ ] Multi-channel outreach (LinkedIn, SMS)
- [ ] Analytics and ROI tracking
- [ ] Team collaboration features

---

## 📞 Contact

**LeadForge Team**
- Website: [www.leadforge.io](https://www.leadforge.io)
- Email: hello@leadforge.io
- Twitter: [@LeadForgeHQ](https://twitter.com/LeadForgeHQ)

---

**Made with ❤️ by the Harsh**