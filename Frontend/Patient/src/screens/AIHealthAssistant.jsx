import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import BottomNavBar from "../components/BottomNavBar";
import { askHealthAssistant } from "../services/aiService";

export default function AIHealthAssistant() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("Explain my blood report.");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Responses are generated using AI based on your available medical records and are for informational purposes only.",
    },
  ]);

  const quickPrompts = useMemo(
    () => [
      {
        label: "Medical History",
        prompt: "Summarize my medical history in simple terms.",
        icon: "history",
      },
      {
        label: "Reports",
        prompt: "Explain my latest report and highlight anything unusual.",
        icon: "description",
      },
    ],
    [],
  );

  const sendQuestion = async (promptText) => {
    const finalQuestion = (promptText || question).trim();

    if (!finalQuestion || loading) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: finalQuestion,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await askHealthAssistant(finalQuestion);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: response.data,
        },
      ]);
    } catch (error) {
      console.error("Error asking assistant:", error);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          text: "I could not reach the assistant service right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const activeAnswer = [...messages]
    .reverse()
    .find((message) => message.role === "assistant" && message.id !== "welcome");
  const assistantText =
    activeAnswer?.text ||
    "Your latest CBC report is mostly normal. Ask a question to get a detailed breakdown.";

  return (
    <div className="min-h-screen bg-surface clinical-gradient text-on-surface pb-32">
      <header className="sticky top-0 z-40 border-b border-outline-variant/40 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-md items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
              <span className="material-symbols-outlined">badge</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/70">
                HVault AI
              </p>
              <h1 className="font-headline text-xl font-extrabold tracking-tight text-primary">
                Assistant
              </h1>
            </div>
          </div>

        </div>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-5 pt-8">
        <section className="rounded-[1.7rem] border border-outline-variant/30 bg-surface-container-lowest/95 p-5 shadow-[0_14px_48px_rgba(0,106,100,0.06)]">
          <div className="flex items-start gap-3 text-on-surface-variant">
            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary">
              <span className="material-symbols-outlined text-[18px]">
                info
              </span>
            </div>
            <p className="text-[15px] leading-7">
              Responses are generated using AI based on your available medical
              records and are for informational purposes only.
            </p>
          </div>
        </section>

        <section className="space-y-1">
          <h2 className="font-headline text-3xl font-black tracking-tight text-on-surface">
            AI Health Assistant
          </h2>
          <p className="text-lg text-on-surface-variant">
            Ask questions about your health records.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-3">
          {quickPrompts.map((item) => (
            <button
              key={item.label}
              onClick={() => setQuestion(item.prompt)}
              className="flex items-center gap-3 rounded-full border border-outline-variant/20 bg-[#dfe6ed] px-4 py-3 text-left font-semibold text-on-surface shadow-[0_4px_14px_rgba(15,23,42,0.06)] transition-transform active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-[20px] text-on-surface/80">
                {item.icon}
              </span>
              <span className="text-[14px] leading-5">{item.label}</span>
            </button>
          ))}
        </section>

        <section className="space-y-4 pt-2">
          {/* User Input Bubble */}
          <div className="flex items-center justify-end">
            <div className="max-w-[82%] rounded-[2rem] bg-primary px-6 py-5 text-center text-lg font-medium text-on-primary shadow-[0_10px_24px_rgba(0,106,100,0.2)]">
              {question || "Explain my blood report."}
            </div>
            <div className="ml-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container shadow-sm">
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>

          {/* AI Response Card */}
          <div className="flex items-start gap-3">
            <div className="mt-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>

            <article className="flex-1 rounded-[1.8rem] border border-outline-variant/15 bg-white p-6 shadow-[0_16px_44px_rgba(15,23,42,0.05)]">
              <div className="prose prose-teal text-on-surface max-w-none text-base leading-7 space-y-3">
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p
                        className="mb-3 leading-relaxed text-on-surface/90"
                        {...props}
                      />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-primary" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="my-2 space-y-1.5 list-disc pl-5 text-on-surface-variant"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="leading-snug" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        className="text-lg font-bold text-primary mt-4 mb-2"
                        {...props}
                      />
                    ),
                  }}
                >
                  {assistantText}
                </ReactMarkdown>
              </div>
            </article>
          </div>

          <p className="px-2 text-center text-[13px] italic text-on-surface-variant/70">
            {loading
              ? "Generating response..."
              : "Ask follow-up questions for a clearer summary."}
          </p>
        </section>

        <section className="space-y-3 rounded-[1.8rem] border border-outline-variant/20 bg-white/90 p-4 shadow-[0_10px_36px_rgba(0,0,0,0.04)]">
          <label className="text-[12px] font-black uppercase tracking-[0.18em] text-on-surface-variant">
            Ask a follow-up
          </label>
          <textarea
            rows={3}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Type a question about your labs, prescriptions, or records..."
            className="w-full resize-none rounded-[1.5rem] border border-outline-variant/20 bg-surface-container-low px-4 py-4 text-[15px] leading-6 outline-none transition-shadow placeholder:text-on-surface-variant/50 focus:border-primary/30 focus:shadow-[0_0_0_4px_rgba(0,106,100,0.08)]"
          />
          <button
            onClick={() => sendQuestion()}
            disabled={loading}
            className="w-full rounded-full bg-primary px-5 py-4 text-lg font-semibold text-on-primary shadow-[0_12px_24px_rgba(0,106,100,0.18)] transition-transform active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>
        </section>
      </main>

      {/* Imported Bottom Navigation Component */}
      <BottomNavBar activeTab="assistant" />
    </div>
  );
}