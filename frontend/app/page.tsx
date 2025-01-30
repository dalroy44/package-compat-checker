"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function HomePage() {
  const [packageJson, setPackageJson] = useState("");
  const [nodeVersions, setNodeVersions] = useState<string[]>([]);
  const [npmVersions, setNpmVersions] = useState<string[]>([]);
  const [nodeVersion, setNodeVersion] = useState("");
  const [npmVersion, setNpmVersion] = useState("");
  const [progress, setProgress] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  // Fetch Node.js and npm versions
  useEffect(() => {
    fetch("/api/node-versions")
      .then((res) => res.json())
      .then((data) => setNodeVersions(data.map((v: any) => v.version)))
      .catch(() => setNodeVersions([]));

    fetch("/api/npm-versions")
      .then((res) => res.json())
      .then((data) => setNpmVersions(data)) // Show all available npm versions
      .catch(() => setNpmVersions([]));
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
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 h-screen">
      {/* Left Column - Inputs */}
      <Card>
        <CardHeader>
          <CardTitle>Upload or Paste package.json</CardTitle>
        </CardHeader>
        <CardContent>
          {/* File Upload */}
          <Input type="file" accept=".json" />

          {/* Node.js & npm Version Select */}
          <div className="mt-4 flex gap-4">
            <Select onValueChange={setNodeVersion} defaultValue={nodeVersion}>
              <SelectTrigger>
                <SelectValue placeholder="Select Node.js Version" />
              </SelectTrigger>
              <SelectContent>
                {nodeVersions.map((version) => (
                  <SelectItem key={version} value={version}>
                    {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setNpmVersion} defaultValue={npmVersion}>
              <SelectTrigger>
                <SelectValue placeholder="Select npm Version" />
              </SelectTrigger>
              <SelectContent>
                {npmVersions.map((version) => (
                  <SelectItem key={version} value={version}>
                    {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Paste package.json */}
          <Textarea
            className="mt-4 h-96"
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
