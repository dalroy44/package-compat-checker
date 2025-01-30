import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://nodejs.org/dist/index.json");
    const data = await res.json();

    // Extract versions and format them
    const versions = data.map((v: { lts: string; version: string; }) => ({
      version: v.lts ? `${v.version.replace("v", "")} (LTS)` : v.version.replace("v", ""),
      codename: v.lts || "", // Get LTS codename or empty for non-LTS versions
    }));

    return NextResponse.json(versions);
  } catch {
    return NextResponse.json({ error: "Failed to fetch Node versions" }, { status: 500 });
  }
}
