/** Gandr API credential: one key, from gandr.ai (free key starts at 50,000 tokens). */
class GandrApi {
  name = "gandrApi";
  displayName = "Gandr API";
  documentationUrl = "https://gandr.ai/docs";
  properties = [
    {
      displayName: "API Key",
      name: "apiKey",
      type: "string",
      typeOptions: { password: true },
      default: "",
      required: true,
      description: "Your Gandr key (gnd_...). Free key starts at 50,000 tokens.",
    },
  ];
}

module.exports = { GandrApi };
