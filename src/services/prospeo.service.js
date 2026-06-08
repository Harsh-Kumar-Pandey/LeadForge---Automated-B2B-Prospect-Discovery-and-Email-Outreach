const axios = require("axios");
const { retryWithBackoff } = require("../utils/retry");

class ProspeoService {
  constructor() {
    this.client = axios.create({
      baseURL: "https://api.prospeo.io",
      headers: {
        "X-KEY": process.env.PROSPEO_API_KEY,
        "Content-Type": "application/json",
      },
      timeout: 30000, // 30 second timeout
    });
  }

  async searchDecisionMakers(domain) {
    try {
      console.log(
        `[prospeo.service] Searching decision makers for ${domain}`
      );

      const response = await retryWithBackoff(
        () =>
          this.client.post("/search-person", {
            page: 1,
            filters: {
              company: {
                websites: {
                  include: [domain],
                },
              },
              person_seniority: {
                include: [
                  "C-Suite",
                  "Vice President",
                  "Founder/Owner",
                ],
              },
            },
          }),
        3, // maxRetries
        2000 // initialDelay in ms
      );

      const results = response.data.results || [];

      console.log(
        `[prospeo.service] Found ${results.length} people for ${domain}`
      );

      return results.map((item) => {
        const jobHistory = item.person?.job_history || [];
        
        const seniority =
          (jobHistory[0] && jobHistory[0].seniority) ||
          item.person?.person_seniority ||
          null;

        return {
          personId: item.person?.person_id,
          name: item.person?.full_name,
          title: item.person?.current_job_title,
          linkedinUrl: item.person?.linkedin_url,
          companyName: item.company?.name,
          companyDomain: domain,
          email: item.person?.email || null,
          maskedEmail: item.person?.email?.email || null,
          job_history: jobHistory,
          seniority,
        };
      });
    } catch (error) {
      console.error(
        "[prospeo.service] Search Person Error:",
        error.response?.data || error.message
      );
    //  console.log(error);

      return [];
    }
  }

  async enrichPerson(personId) {
    try {
      console.log(
        `[prospeo.service] Enriching person ${personId}`
      );

      const response = await retryWithBackoff(
        () =>
          this.client.post("/enrich-person", {
            data: {
              person_id: personId,
            },
          }),
        3, // maxRetries
        2000 // initialDelay in ms
      );

      //console.log(`[prospeo.service] Enrichment response for ${personId}:`, response.data);

      return response.data;
    } catch (error) {
      console.error(
        `[prospeo.service] Enrich Error for ${personId}`,
        error.response?.data || error.message
      );

      return null;
    }
  }
}

module.exports = new ProspeoService();