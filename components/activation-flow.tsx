"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  Check,
  ClipboardPaste,
  Copy,
  ExternalLink,
  RefreshCw,
  Send,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { StepChip } from "@/components/step-chip"

type ActivationState = "idle" | "submitting" | "activating" | "success" | "error"
const SESSION_URL = "https://chatgpt.com/api/auth/session"

export function ActivationFlow() {
  const [session, setSession] = useState("")
  const [state, setState] = useState<ActivationState>("idle")
  const [message, setMessage] = useState(
    "Payment confirmed. Paste session JSON below to activate.",
  )
  const [copied, setCopied] = useState(false)

  const validation = useMemo(() => validateSession(session), [session])

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText()
      setSession(text)
    } catch { }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(SESSION_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch { }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validation.ok) {
      const reason = session.trim().length === 0
        ? "Please paste your ChatGPT session JSON before submitting."
        : `Invalid session data: ${validation.reason ?? "Not valid JSON."}`

      const tg = (window as any)?.Telegram?.WebApp
      if (tg?.showAlert) {
        tg.showAlert(reason)
      } else {
        window.alert(reason)
      }

      setState("error")
      setMessage(validation.reason ?? "Invalid session JSON.")
      return
    }
    setState("submitting")
    setMessage("Sending session to activation API…")
    await wait(700)
    setState("activating")
    setMessage("Activating subscription. This usually takes under a minute.")
    await wait(1100)
    setState("success")
    setMessage("Subscription activated. Do not log out of ChatGPT.")
  }

  function handleReset() {
    setState("idle")
    setSession("")
    setMessage("Payment confirmed. Paste session JSON below to activate.")
  }

  const step1: "done" = "done"
  const step2: "done" | "active" = state === "success" || state === "activating" ? "done" : "active"
  const step3: "done" | "active" | "upcoming" =
    state === "success" ? "done" : session.length > 0 ? "active" : "upcoming"

  return (
    <div className="flex flex-col gap-3">
      {/* <StepTracker steps={[step1, step2, step3]} /> */}

      <GuideCard copied={copied} onCopyLink={handleCopyLink} />

      <SessionForm
        value={session}
        onChange={setSession}
        onPaste={handlePaste}
        onSubmit={handleSubmit}
        state={state}
        validation={validation}
      />

      <StatusCard state={state} message={message} onReset={handleReset} />
    </div>
  )
}

function StepTracker({ steps }: { steps: Array<"done" | "active" | "upcoming"> }) {
  const labels = ["Payment", "Open ChatGPT session", "Submit session JSON"]
  return (
    <ol className="card-soft flex flex-col gap-2 rounded-2xl p-3">
      {labels.map((label, i) => {
        const s = steps[i]
        return (
          <li key={label} className="flex items-center gap-3">
            <StepChip n={i + 1} state={s} />
            <p
              className={cn(
                "text-[13.5px]",
                s === "done" && "text-muted-foreground",
                s === "active" && "font-semibold text-foreground",
                s === "upcoming" && "text-muted-foreground",
              )}
            >
              {label}
            </p>
            {s === "active" ? (
              <span className="ml-auto text-[11px] text-[var(--brand)] tabular">In progress</span>
            ) : s === "done" ? (
              <Check className="ml-auto h-4 w-4 text-[var(--brand)]" aria-hidden />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}

function GuideCard({ copied, onCopyLink }: { copied: boolean; onCopyLink: () => void }) {
  return (
    <section aria-label="Activation guide" className="card-soft overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between px-4 pt-3">
        <p className="text-[13px] font-semibold">Activation guide</p>
      </div>

      <ol className="px-4 pb-2 pt-2">
        <GuideStep n={1} title="Log in to your ChatGPT account" />
        <GuideStep n={2} title="Open the session URL">
          <div className="mt-1.5 flex items-center gap-1 rounded-xl bg-muted px-2 py-1.5">
            <code className="flex-1 truncate font-mono text-[11.5px]">{SESSION_URL}</code>
            <button
              type="button"
              onClick={onCopyLink}
              aria-label="Copy URL"
              className="press flex h-6 w-6 items-center justify-center rounded-md hover:bg-background"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-[var(--brand)]" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </button>
            <a
              href={SESSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open URL"
              className="press flex h-6 w-6 items-center justify-center rounded-md hover:bg-background"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </GuideStep>
        <GuideStep n={3} title="Copy the entire JSON response" />
        <GuideStep n={4} title="Paste below and submit" />
      </ol>

      <div className="flex items-center gap-2 bg-[var(--negative-soft)] px-4 py-2.5 text-[11.5px] text-[var(--negative)]">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Don&apos;t log out of ChatGPT until activation completes — the token expires on logout.
      </div>
    </section>
  )
}

function GuideStep({ n, title, children }: { n: number; title: string; children?: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 py-2">
      <StepChip n={n} state="upcoming" />
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold">{title}</p>
        {children ? <div className="text-[12px] text-muted-foreground">{children}</div> : null}
      </div>
    </li>
  )
}

type Validation = { ok: boolean; reason?: string; keys?: string[] }
function validateSession(raw: string): Validation {
  const trimmed = raw.trim()
  if (!trimmed) return { ok: false }
  try {
    const parsed = JSON.parse(trimmed)
    if (typeof parsed !== "object" || parsed === null) return { ok: false, reason: "Expected a JSON object." }
    const keys = Object.keys(parsed)
    const missing = ["user", "accessToken"].filter((k) => !(k in parsed))
    if (missing.length) return { ok: false, reason: `Missing key: ${missing.join(", ")}`, keys }
    return { ok: true, keys }
  } catch {
    return { ok: false, reason: "Not valid JSON." }
  }
}

function SessionForm({
  value,
  onChange,
  onPaste,
  onSubmit,
  state,
  validation,
}: {
  value: string
  onChange: (v: string) => void
  onPaste: () => void
  onSubmit: (e: React.FormEvent) => void
  state: ActivationState
  validation: Validation
}) {
  const disabled = state === "submitting" || state === "activating" || state === "success"
  const show = value.trim().length > 0

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <label htmlFor="session" className="text-[12.5px] font-semibold">
          Session data (JSON)
        </label>
        <button
          type="button"
          onClick={onPaste}
          className="press inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground/90 hover:bg-muted/80"
        >
          <ClipboardPaste className="h-3 w-3" aria-hidden /> Paste
        </button>
      </div>

      <div
        className={cn(
          "card-soft overflow-hidden rounded-2xl transition-shadow",
          show && validation.ok && "ring-2 ring-[var(--brand)]",
          show && !validation.ok && "ring-2 ring-[var(--negative)]",
        )}
      >
        <textarea
          id="session"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`{\n  "user": { "id": "…" },\n  "accessToken": "…",\n  "expires": "…"\n}`}
          rows={7}
          spellCheck={false}
          disabled={disabled}
          className="w-full resize-y bg-transparent px-3 py-3 font-mono text-[12.5px] leading-relaxed placeholder:text-muted-foreground/70 focus:outline-none disabled:opacity-60"
        />
        <div className="flex items-center justify-between gap-2 border-t border-border/60 px-3 py-1.5 text-[11px] text-muted-foreground">
          <p className="tabular">{value.length.toLocaleString()} chars</p>
          {show ? (
            validation.ok ? (
              <span className="inline-flex items-center gap-1 text-[var(--brand)]">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                Valid · {validation.keys?.length} keys
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[var(--negative)]">
                <AlertTriangle className="h-3 w-3" aria-hidden />
                {validation.reason}
              </span>
            )
          ) : (
            <span>Awaiting paste</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={disabled || !validation.ok}
        className={cn(
          "press mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-full text-[14px] font-semibold transition",
          "bg-[var(--brand)] text-[var(--brand-foreground)] shadow-[0_10px_28px_-10px_color-mix(in_oklch,var(--brand)_55%,transparent)]",
          "disabled:opacity-60 disabled:shadow-none",
        )}
      >
        {state === "submitting" || state === "activating" ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin" aria-hidden />
            {state === "submitting" ? "Submitting…" : "Activating…"}
          </>
        ) : state === "success" ? (
          <>
            <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
            Activated
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden />
            Submit verification
          </>
        )}
      </button>
    </form>
  )
}

function StatusCard({
  state,
  message,
  onReset,
}: {
  state: ActivationState
  message: string
  onReset: () => void
}) {
  const tone =
    state === "success"
      ? "success"
      : state === "error"
        ? "error"
        : state === "idle"
          ? "info"
          : "progress"

  const label =
    state === "success"
      ? "Activated"
      : state === "activating"
        ? "Activating"
        : state === "submitting"
          ? "Submitting"
          : state === "error"
            ? "Error"
            : "Paid"

  return (
    <section
      aria-label="Status"
      className={cn(
        "card-soft rounded-2xl p-4 transition-colors",
        tone === "success" && "bg-[var(--positive-soft)]",
        tone === "error" && "bg-[var(--negative-soft)]",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-block h-2 w-2 rounded-full",
              tone === "success" && "bg-[var(--positive)]",
              tone === "error" && "bg-[var(--negative)]",
              tone === "info" && "bg-muted-foreground",
              tone === "progress" && "animate-pulse bg-[var(--brand)]",
            )}
          />
          <p
            className={cn(
              "text-[12px] font-semibold",
              tone === "success" && "text-[var(--positive)]",
              tone === "error" && "text-[var(--negative)]",
              tone === "info" && "text-muted-foreground",
              tone === "progress" && "text-[var(--brand)]",
            )}
          >
            Status · {label}
          </p>
        </div>
        {(state === "error" || state === "success") && (
          <button
            type="button"
            onClick={onReset}
            className="press rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-foreground/80 hover:bg-muted/80"
          >
            Reset
          </button>
        )}
      </div>
      <p className="mt-1.5 text-[13px]">{message}</p>

      {state === "success" && (
        <div className="card-soft mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-[12px]">
          <ShieldCheck className="h-4 w-4 text-[var(--brand)]" aria-hidden />
          Covered by VetVerify Guarantee until May 17, 2026.
        </div>
      )}
    </section>
  )
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
