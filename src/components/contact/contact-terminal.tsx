"use client";

import { useState } from "react";
import { contactChannels } from "@/content";

const initialDraft = `Hello Jinming,\n\nI’m reaching out about a role where translating complex business workflows into usable technical systems matters. I’d like to discuss the work and experience presented in JINMING / SYSTEM.\n\nBest,`;

async function copyWithBrowser(text: string) {
  if (!navigator.clipboard) throw new Error("Clipboard unavailable");
  await navigator.clipboard.writeText(text);
}

export function ContactTerminal({
  copyText = copyWithBrowser,
}: {
  copyText?: (text: string) => Promise<void>;
}) {
  const [draft, setDraft] = useState(initialDraft);
  const [status, setStatus] = useState("Draft ready — nothing has been sent.");

  async function copyDraft() {
    try {
      await copyText(draft);
      setStatus("Draft copied. Paste it into a configured channel when available.");
    } catch {
      setStatus("Clipboard unavailable. Select and copy the draft manually.");
    }
  }

  return (
    <div className="contact-terminal">
      <header><span>SIGNAL INTERFACE / LOCAL ONLY</span><i>NO BACKEND</i></header>
      <div className="terminal-grid">
        <div className="channel-status">
          <span>DIRECT CHANNELS</span>
          <strong>NOT CONFIGURED</strong>
          <p>Direct channels are not configured in the supplied profile data.</p>
          <dl>
            <div><dt>EMAIL</dt><dd>{contactChannels.email ?? "NULL"}</dd></div>
            <div><dt>LINKEDIN</dt><dd>{contactChannels.linkedIn ?? "NULL"}</dd></div>
          </dl>
        </div>
        <label className="draft-field">
          <span>OUTREACH DRAFT / EDITABLE</span>
          <textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows={9} />
        </label>
      </div>
      <footer>
        <p role="status" aria-live="polite">{status}</p>
        <button type="button" onClick={copyDraft}>Copy outreach draft <span aria-hidden="true">⌘C</span></button>
      </footer>
    </div>
  );
}
