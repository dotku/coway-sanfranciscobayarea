import { NextRequest } from "next/server";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

const CUSTOMER_SYSTEM_PROMPT = `You are the Coway Bay Area customer support assistant. You help customers with questions about Coway products and services in the San Francisco Bay Area.

Key information:
- Coway is a premium home wellness brand from South Korea, known for air purifiers, water purifiers, and bidet seats.
- We serve the San Francisco Bay Area with free delivery and installation.
- Both rental and purchase options are available.
- Popular products include:
  - Airmega air purifiers (various models for different room sizes)
  - Aquamega water purifiers (countertop and under-sink models)
  - Bidetmega smart bidet seats
- Rental plans include filter replacement and maintenance.
- We offer a referral program where existing customers can refer friends.

Guidelines:
- Be friendly, helpful, and concise.
- Answer in the same language the customer uses (English or Chinese).
- If you don't know specific pricing or availability, suggest contacting us directly.
- Do not make up specific prices or model numbers you're not sure about.
- Keep responses brief and to the point.`;

const ADMIN_SYSTEM_PROMPT = `You are an AI assistant for Coway Bay Area administrators. You help with team management, referral tracking, and business operations.

Key context:
- The admin dashboard manages team members who are Coway distributors/sales partners.
- Each team member has a unique referral code (JY-prefix + 6 digits).
- The referral system tracks visits and signups through referral links.
- Team members can have multiple addresses on file.
- The tree view shows the referral hierarchy (who referred whom).
- The map view shows team member locations.

You can help with:
- Understanding referral metrics and team performance
- Explaining how the referral system works
- Suggesting strategies for team growth
- Answering questions about the admin features
- General business advice for the Coway Bay Area distribution team

Guidelines:
- Be professional and data-oriented.
- Answer in the same language the admin uses (English or Chinese).
- Keep responses concise and actionable.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "AI_GATEWAY_API_KEY not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages, mode } = await request.json();

  if (!messages || !Array.isArray(messages)) {
    return new Response(
      JSON.stringify({ error: "Messages array is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const systemPrompt =
    mode === "admin" ? ADMIN_SYSTEM_PROMPT : CUSTOMER_SYSTEM_PROMPT;

  const anthropic = createAnthropic({
    apiKey,
    baseURL: "https://ai-gateway.vercel.sh",
  });

  // UIMessages from TextStreamChatTransport have `parts` array, not `content` string
  const convertedMessages = messages.map(
    (m: {
      role: string;
      content?: string;
      parts?: { type: string; text?: string }[];
    }) => {
      const text =
        m.content ||
        m.parts
          ?.filter((p) => p.type === "text")
          .map((p) => p.text)
          .join("") ||
        "";
      return {
        role: m.role as "user" | "assistant",
        content: text,
      };
    }
  );

  const result = streamText({
    model: anthropic("anthropic/claude-sonnet-4-20250514"),
    system: systemPrompt,
    messages: convertedMessages,
    maxOutputTokens: 1024,
  });

  return result.toTextStreamResponse();
}
