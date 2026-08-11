# n8n-nodes-gandr

[Gandr TTS](https://gandr.ai) community node for n8n. Render text to speech inside any
workflow, no code.

- First audio byte in **146 ms over the open internet, 116 ms p50 first audio, server side warm**
- Reads numbers, dates, order IDs and addresses correctly
- One engine speaks **23 languages** with six voices
- **Every render watermarked** (imperceptible, detectable)
- **$10 a month for one million tokens**, or unlimited, unmetered stream plans from **$150/mo** (annual)

Free key starts at **100,000 tokens, no card**: [gandr.ai](https://gandr.ai)

## Install

In n8n: Settings, Community nodes, Install, then enter `n8n-nodes-gandr`.

## Use

1. Add a Gandr credential: your API key (`gnd_...`).
2. Drop the **Gandr** node into a workflow.
3. Set the text to speak, pick a voice (`gandr-ava`, `gandr-dane`, `gandr-jenny`,
   `gandr-leo`, `gandr-lewis`, `gandr-mia`), pick any of the 23 languages, set speed.
4. The node outputs the spoken line as a WAV file in the item's binary data, ready to
   hand to a phone call, a message, or storage.

Docs: [gandr.ai/docs](https://gandr.ai/docs)
