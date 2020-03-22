const { DataSource } = require("apollo-datasource");
const axios = require("axios").default;
const NodeCache = require("node-cache");

const cache = new NodeCache(60 * 60);

class CasesAPI extends DataSource {
  constructor() {
    super();
    this.apiUrl = process.env.API_URL;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getAllCases() {
    const cachedCases = cache.get("allCases");
    if (cachedCases === undefined) {
      const confirmedCases = await axios
        .get(this.apiUrl)
        .then(response => {
          const cases = [];
          if (response.data.features && response.data.features.length > 0) {
            response.data.features.map(feature =>
              cases.push(this.reducer(feature))
            );
          }
          cache.set("allCases", cases);
          return cases;
        })
        .catch(err => {
          console.log(err);
          return [];
        });

      return confirmedCases;
    }
    return cachedCases;
  }

  async getCase(caseNum) {
    const cases = await this.getAllCases();
    const results = cases.filter(item => item.id === caseNum);
    if (results.length > 0) {
      return results[0];
    } else {
      return null;
    }
  }

  reducer(covidCase) {
    const { attributes } = covidCase;
    return {
      id: attributes.FID,
      caseNum: attributes.PH_masterl,
      age: attributes.edad,
      gender: attributes.kasarian,
      nationality: attributes.nationalit,
      residence: attributes.residence,
      travelHistory: attributes.travel_hx === null ? "" : attributes.travel_hx,
      symptoms: attributes.symptoms === null ? "" : attributes.symptoms,
      confirmed: attributes.confirmed,
      hospital: attributes.facility,
      status: attributes.status === null ? "" : attributes.status,
      link: attributes.epi_link === null ? "" : attributes.epi_link
    };
  }
}

module.exports = CasesAPI;
