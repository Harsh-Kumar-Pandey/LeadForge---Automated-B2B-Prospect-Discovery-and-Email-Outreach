const oceanService = require("./ocean.service");
const prospeoService = require("./prospeo.service");

const sleep = require("../utils/sleep");

class LeadGenerationService {
  async generateLeads(seedDomain) {
    console.log(
      `[leadGeneration.service] Starting lead generation for ${seedDomain}`
    );

    // ---------------------------------------
    // STEP 1
    // ---------------------------------------

    const companies =
      await oceanService.findSimilarCompanies(
        seedDomain
      );

    console.log(
      `[leadGeneration.service] Ocean returned ${companies.length} companies`
    );

    const topCompanies =
      companies.slice(0, 5);

    console.log(
      `[leadGeneration.service] Using first ${topCompanies.length} companies`
    );

    // ---------------------------------------
    // STEP 2
    // ---------------------------------------

    let people = [];

    for (const company of topCompanies) {
      console.log(
        `[leadGeneration.service] Searching people in ${company.domain}`
      );

      const companyPeople =
        await prospeoService.searchDecisionMakers(
          company.domain
        );

      people.push(...companyPeople);
      await sleep(5000); // Increased from 3000ms to 5000ms
    }

    console.log(
      `[leadGeneration.service] Total people found = ${people.length}`
    );

   // ---------------------------------------
// STEP 3
// Select 1 best person per company
// ---------------------------------------

const selectedPeople = [];

const groupedByCompany = new Map();

for (const person of people) {
  if (!person.personId) continue;

  const companyKey = person.companyName;

  if (!groupedByCompany.has(companyKey)) {
    groupedByCompany.set(companyKey, []);
  }

  groupedByCompany.get(companyKey).push(person);
}

console.log(
  `[leadGeneration.service] Unique companies found = ${groupedByCompany.size}`
);

for (const [companyName, companyPeople] of groupedByCompany.entries()) {

  let selectedPerson =
    companyPeople.find(
      (p) => p.seniority === "Founder/Owner" && p.email?.email != null
    ) ||
    companyPeople.find(
      (p) => p.seniority === "C-Suite" && p.email?.email != null
    ) ||
    companyPeople.find(
      (p) => p.seniority === "Vice President" && p.email?.email != null
    ) ||
    companyPeople[0];

  selectedPeople.push(selectedPerson);

  console.log(
    `[leadGeneration.service] Selected ${selectedPerson.name} (${selectedPerson.seniority || (selectedPerson.job_history && selectedPerson.job_history[0]?.seniority) || 'unknown'}) from ${companyName}`
  );
}

console.log(
  `[leadGeneration.service] Selected ${selectedPeople.length} people for enrichment`
);

console.log(
  `[leadGeneration.service] Total search results with personId = ${people.length}`
);

   // ---------------------------------------
// STEP 4
// Enrich selected people
// ---------------------------------------

const enrichedLeads = [];

for (const person of selectedPeople) {

  console.log(
    `[leadGeneration.service] Enriching ${person.name} from ${person.companyName}`
  );

  const enriched =
    await prospeoService.enrichPerson(
      person.personId
    );
 
  if (
    enriched &&
    enriched.person &&
    enriched.person.email &&
    enriched.person.email.status === "VERIFIED"
  ) {
    enrichedLeads.push({
      name: enriched.person.full_name,

      title:
        enriched.person.current_job_title,
      

      email:
        enriched.person.email.email,

      linkedinUrl:
        enriched.person.linkedin_url,

      company:
        person.companyName,
    });

    console.log(
      `[leadGeneration.service] VERIFIED EMAIL FOUND => ${enriched.person.email.email}`
    );
  } else {
    console.log(
      `[leadGeneration.service] Skipping lead ${person.name} from ${person.companyName} because email is not VERIFIED or missing`
    );
  }

  console.log(
    `[leadGeneration.service] Waiting 2 seconds before next enrichment`
  );

  await sleep(3500); // Increased from 2000ms to 3500ms for better rate limiting
}
 return enrichedLeads;
}
}



module.exports =
  new LeadGenerationService();