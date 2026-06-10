const axios = require("axios");

class OceanService {
  async findSimilarCompanies(domain) {
    try {
      const response = await axios.post(
        "https://api.ocean.io/v3/search/companies",
        {
          size: process.env.OCEAN_SEARCH_SIZE || 5, // change to 500 later

          companiesFilters: {
            lookalikeDomains: [domain],
          },
        },
        {
          headers: {
            "X-Api-Token":
              process.env.OCEAN_API_KEY,
          },
        }
      );

      //console.log("response.data=",response.data);

    

      const companies =
        response.data.companies || [];
        //console.log("companies",companies);

      const formattedCompanies = companies.map((iteam) => ({
        name: iteam.company.name,
        domain: iteam.company.domain,
        size: iteam.company.companySize,
        country:
          iteam.company.primaryCountry,
      }));
      //console.log("formattedCompanies",formattedCompanies);
      return formattedCompanies;
    } catch (error) {
      console.error(
        "❌ Ocean Error:",
        error.response?.data ||
          error.message
      );

      return [];
    }
  }
}

module.exports = new OceanService();