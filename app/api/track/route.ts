import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Path to store click data - use /tmp on Vercel (writable)
const DATA_DIR = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "data");
const CLICKS_FILE = path.join(DATA_DIR, "clicks.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize clicks file if it doesn't exist
if (!fs.existsSync(CLICKS_FILE)) {
  fs.writeFileSync(CLICKS_FILE, JSON.stringify([], null, 2));
}

export interface ClickEvent {
  id: string;
  buttonLabel: string;
  buttonHref: string;
  timestamp: string;
  userAgent?: string;
  referer?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { buttonLabel, buttonHref } = body;

    if (!buttonLabel || !buttonHref) {
      return NextResponse.json(
        { error: "Missing required fields: buttonLabel, buttonHref" },
        { status: 400 }
      );
    }

    // Read existing clicks
    const clicksData = fs.readFileSync(CLICKS_FILE, "utf-8");
    const clicks: ClickEvent[] = JSON.parse(clicksData);

    // Create new click event
    const clickEvent: ClickEvent = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      buttonLabel,
      buttonHref,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || undefined,
      referer: request.headers.get("referer") || undefined,
    };

    // Add to clicks array
    clicks.push(clickEvent);

    // Write back to file
    fs.writeFileSync(CLICKS_FILE, JSON.stringify(clicks, null, 2));

    return NextResponse.json(
      { success: true, clickId: clickEvent.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error tracking click:", error);
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 }
    );
  }
}

