/** Gandr API credential: one key, from gandr.ai (free key, 100,000 tokens, no card). */
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
      description: "Your Gandr key (gnd_...). Free key: 100,000 tokens, no card.",
    },
  ];
}

module.exports = { GandrApi };
