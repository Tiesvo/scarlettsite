import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ClickEvent } from "../track/route";

// Use /tmp on Vercel (writable) or local data dir
const DATA_DIR = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "data");
const CLICKS_FILE = path.join(DATA_DIR, "clicks.json");

export async function GET(request: NextRequest) {
  try {
    // Check if clicks file exists
    if (!fs.existsSync(CLICKS_FILE)) {
      return NextResponse.json({
        totalClicks: 0,
        clicksByButton: {},
        recentClicks: [],
      });
    }

    // Read clicks data
    const clicksData = fs.readFileSync(CLICKS_FILE, "utf-8");
    const clicks: ClickEvent[] = JSON.parse(clicksData);

    // Calculate statistics
    const clicksByButton: Record<string, number> = {};
    clicks.forEach((click) => {
      const key = click.buttonLabel;
      clicksByButton[key] = (clicksByButton[key] || 0) + 1;
    });

    // Get recent clicks (last 50)
    const recentClicks = clicks.slice(-50).reverse();

    // Optional: Filter by date range if provided
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    let filteredClicks = clicks;
    if (startDate || endDate) {
      filteredClicks = clicks.filter((click) => {
        const clickDate = new Date(click.timestamp);
        if (startDate && clickDate < new Date(startDate)) return false;
        if (endDate && clickDate > new Date(endDate)) return false;
        return true;
      });
    }

    // Calculate filtered statistics if date range provided
    const filteredClicksByButton: Record<string, number> = {};
    if (startDate || endDate) {
      filteredClicks.forEach((click) => {
        const key = click.buttonLabel;
        filteredClicksByButton[key] = (filteredClicksByButton[key] || 0) + 1;
      });
    }

    return NextResponse.json({
      totalClicks: clicks.length,
      clicksByButton,
      recentClicks,
      ...(startDate || endDate
        ? {
            filtered: {
              totalClicks: filteredClicks.length,
              clicksByButton: filteredClicksByButton,
            },
          }
        : {}),
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

