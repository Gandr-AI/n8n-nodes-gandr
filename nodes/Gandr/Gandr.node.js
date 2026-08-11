/** Gandr node: render text to speech inside n8n workflows. Returns the WAV as binary data. */

const VOICES = ["gandr-ava", "gandr-dane", "gandr-jenny", "gandr-leo", "gandr-lewis", "gandr-mia"];
const LANGUAGES = ["ar", "cs", "da", "de", "el", "en", "es", "fi", "fr", "hi", "it", "ja", "ko", "nl", "no", "pl", "pt", "ro", "ru", "sv", "tr", "uk", "zh"];
const ENDPOINTS = ["https://tts.gandr.ai", "https://tts-nyc.gandr.ai", "https://tts-eu.gandr.ai"];

class Gandr {
  description = {
    displayName: "Gandr",
    name: "gandr",
    group: ["transform"],
    version: 1,
    description: "Render text to speech with the Gandr TTS API. Reads numbers, dates and order IDs correctly. 23 languages.",
    defaults: { name: "Gandr" },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [{ name: "gandrApi", required: true }],
    properties: [
      {
        displayName: "Text",
        name: "text",
        type: "string",
        default: "",
        required: true,
        typeOptions: { rows: 4 },
        description: "The text to speak, up to 2,000 characters.",
      },
      {
        displayName: "Voice",
        name: "voice",
        type: "options",
        options: VOICES.map((v) => ({ name: v, value: v })),
        default: "gandr-jenny",
      },
      {
        displayName: "Language",
        name: "language",
        type: "options",
        options: LANGUAGES.map((l) => ({ name: l, value: l })),
        default: "en",
        description: "Any of the 23 languages, independent of the voice.",
      },
      {
        displayName: "Speed",
        name: "speed",
        type: "number",
        default: 1,
        typeOptions: { minValue: 0.6, maxValue: 1.5, numberStepSize: 0.05 },
      },
    ],
  };

  async execute() {
    const items = this.getInputData();
    const credentials = await this.getCredentials("gandrApi");
    const out = [];
    for (let i = 0; i < items.length; i++) {
      const text = this.getNodeParameter("text", i);
      const voice = this.getNodeParameter("voice", i);
      const language = this.getNodeParameter("language", i);
      const speed = this.getNodeParameter("speed", i);
      const body = {
        transcript: text,
        language,
        voice: { mode: "id", id: voice },
        output_format: { sample_rate: 24000 },
        speed,
      };
      let audio;
      let lastError;
      for (const endpoint of ENDPOINTS) {
        try {
          const res = await fetch(endpoint + "/v1/tts/bytes", {
            method: "POST",
            headers: { "x-api-key": credentials.apiKey, "content-type": "application/json" },
            body: JSON.stringify(body),
          });
          if (!res.ok) {
            const payload = await res.json().catch(() => ({}));
            throw new Error(`[${res.status}] ${payload.error || "request failed"}${payload.hint ? ": " + payload.hint : ""}`);
          }
          audio = Buffer.from(await res.arrayBuffer());
          break;
        } catch (e) {
          lastError = e;
          if (e.message && e.message.startsWith("[4")) throw e; // a real answer is never retried elsewhere
        }
      }
      if (!audio) throw lastError;
      const binary = await this.helpers.prepareBinaryData(audio, "speech.wav", "audio/wav");
      out.push({ json: { voice, language, characters: text.length }, binary: { data: binary }, pairedItem: { item: i } });
    }
    return [out];
  }
}

module.exports = { Gandr };
