import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://registry.npmjs.org/npm");
    const data = await res.json();

    // Extract unique versions and sort them in descending order
    const versions = Object.keys(data.versions)
      .filter((v) => /^\d+\.\d+\.\d+$/.test(v)) // Ensure it's a valid version format (e.g., "10.2.0")
      .sort((a, b) => b.localeCompare(a, undefined, { numeric: true })); // Sort descending

    return NextResponse.json(versions);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch npm versions" }, { status: 500 });
  }
}
