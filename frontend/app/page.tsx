"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type NodeVersion = { version: string; codename?: string };
type NpmVersion = string;

export default function HomePage() {
  const [packageJson, setPackageJson] = useState("");
  const [nodeVersions, setNodeVersions] = useState<NodeVersion[]>([]);
  const [npmVersions, setNpmVersions] = useState<NpmVersion[]>([]);
  const [nodeVersion, setNodeVersion] = useState("");
  const [npmVersion, setNpmVersion] = useState("");
  const [progress, setProgress] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  // ✅ Fetch Node.js and npm versions correctly
  useEffect(() => {
    fetch("/api/node-versions")
      .then((res) => res.json())
      .then((data) => {
        console.log("Node Versions:", data);
        if (Array.isArray(data) && data.length > 0) {
          setNodeVersions(data.filter((v) => typeof v.version === "string")); // Ensure valid versions
        }
      })
      .catch((error) => {
        console.error("Error fetching Node versions:", error);
      });

    fetch("/api/npm-versions")
      .then((res) => res.json())
      .then((data) => {
        console.log("NPM Versions:", data);
        if (Array.isArray(data) && data.length > 0) {
          setNpmVersions(data.filter((v) => typeof v === "string")); // Ensure valid versions
        }
      })
      .catch((error) => {
        console.error("Error fetching NPM versions:", error);
      });
  }, []);

  // Simulate Dependency Checking Progress
  const startCheck = () => {
    setIsChecking(true);
    setProgress(0);
    let progressCount = 0;
    const interval = setInterval(() => {
      progressCount += 10;
      setProgress(progressCount);
      if (progressCount >= 100) {
        clearInterval(interval);
        setIsChecking(false);
      }
    }, 300);
  };

  // Reset Form Data
  const resetForm = () => {
    setPackageJson("");
    setNodeVersion("");
    setNpmVersion("");
    setProgress(0);
    setShowResetDialog(false);
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 h-screen overflow-auto">
      {/* Left Column - Inputs */}
      <Card>
        <CardHeader>
          <CardTitle>Upload or Paste package.json</CardTitle>
        </CardHeader>
        <CardContent>
          {/* File Upload */}
          <Input type="file" accept=".json" className="mb-4" />

          {/* Node.js & npm Version Select */}
          <div className="flex gap-4">
            <Select onValueChange={setNodeVersion} value={nodeVersion}>
              <SelectTrigger>
                <SelectValue placeholder="Select Node.js Version" />
              </SelectTrigger>
              <SelectContent>
                {nodeVersions.length > 0 ? (
                  nodeVersions.map(({ version, codename }) => (
                    <SelectItem key={version} value={version}>
                      {version} {codename ? `(${codename})` : ""}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="no-versions">No versions available</SelectItem>
                )}
              </SelectContent>
            </Select>

            <Select onValueChange={setNpmVersion} value={npmVersion}>
              <SelectTrigger>
                <SelectValue placeholder="Select npm Version" />
              </SelectTrigger>
              <SelectContent>
                {npmVersions.length > 0 ? (
                  npmVersions.map((version) => (
                    <SelectItem key={version} value={version}>
                      {version}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="no-versions">No versions available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Paste package.json */}
          <Textarea
            className="mt-4 h-80"
            placeholder="Paste your package.json here..."
            value={packageJson}
            onChange={(e) => setPackageJson(e.target.value)}
          />

          {/* Action Buttons */}
          <div className="mt-4 flex gap-2">
            <Button onClick={startCheck} disabled={isChecking}>Check Dependencies</Button>
            <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">Reset</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="destructive" onClick={resetForm}>Yes, Reset</Button>
                  <Button variant="outline" onClick={() => setShowResetDialog(false)}>Cancel</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Results */}
      <Card>
        <CardHeader>
          <CardTitle>Compatibility Check</CardTitle>
        </CardHeader>
        <CardContent>
          {isChecking ? (
            <div>
              <p>Checking dependencies...</p>
              <Progress value={progress} className="mt-2" />
            </div>
          ) : (
            <p>No results yet. Run a check to see compatibility.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
