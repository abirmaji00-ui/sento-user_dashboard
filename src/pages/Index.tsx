import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  MessageSquare,
  Lightbulb,
  Zap,
  Loader2,
  Download,
  Copy,
  Plus,
  Monitor,
  Tablet,
  Smartphone,
  ZoomIn,
  ZoomOut,
  Maximize2,
  PartyPopper,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ViewMode = "desktop" | "tablet" | "mobile";

const Index = () => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const { toast } = useToast();

  const statuses = [
    "Analyzing your requirements...",
    "Designing the layout...",
    "Adding interactive features...",
    "Applying modern styling...",
    "Almost ready...",
  ];

  const handleGenerate = async () => {
    if (input.length < 50) {
      toast({
        title: "Description too short",
        description: "Please describe your website with at least 50 characters",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setGeneratedCode(null);

    let statusIndex = 0;
    setStatus(statuses[0]);

    const statusInterval = setInterval(() => {
      statusIndex = (statusIndex + 1) % statuses.length;
      setStatus(statuses[statusIndex]);
    }, 6000);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 95));
    }, 600);

    setTimeout(() => {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
      setProgress(100);

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated Website</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.6s ease-out;
    }
  </style>
</head>
<body class="bg-gradient-to-br from-purple-50 via-white to-indigo-50 min-h-screen">
  <div class="container mx-auto px-6 py-20">
    <div class="text-center animate-fade-in">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mb-8 shadow-2xl">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
        </svg>
      </div>
      <h1 class="text-6xl font-bold text-gray-900 mb-6 tracking-tight">Your Website is Live! 🎉</h1>
      <p class="text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
        This is a demo preview. Real AI generation with Claude Sonnet 4 coming soon!
      </p>
      <div class="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto mt-12 border border-purple-100">
        <div class="flex items-start gap-4 mb-6">
          <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
            </svg>
          </div>
          <div class="text-left flex-1">
            <h2 class="text-2xl font-bold text-gray-900 mb-3">Generated from your description:</h2>
            <p class="text-gray-700 leading-relaxed text-lg">
              "${input.substring(0, 300)}${input.length > 300 ? "..." : ""}"
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
            <div class="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Fast Generation</h3>
            <p class="text-gray-600 text-sm">Built in seconds with AI</p>
          </div>
          <div class="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
            <div class="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Fully Responsive</h3>
            <p class="text-gray-600 text-sm">Works on all devices</p>
          </div>
          <div class="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200">
            <div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">Clean Code</h3>
            <p class="text-gray-600 text-sm">Production-ready HTML</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

      setGeneratedCode(html);
      setIsGenerating(false);
    }, 30000);
  };

  const handleDownload = () => {
    if (!generatedCode) return;

    const blob = new Blob([generatedCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sento-website-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Your website has been saved as an HTML file",
    });
  };

  const handleCopy = async () => {
    if (!generatedCode) return;

    await navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  const handleNewWebsite = () => {
    setGeneratedCode(null);
    setInput("");
    setProgress(0);
    setStatus("");
  };

  const getAspectRatio = () => {
    switch (viewMode) {
      case "tablet":
        return "aspect-[3/4]";
      case "mobile":
        return "aspect-[9/16]";
      default:
        return "aspect-video";
    }
  };

  const characterCount = input.length;
  const characterLimit = 1000;
  const characterCountColor =
    characterCount > characterLimit
      ? "text-red-500"
      : characterCount > 900
      ? "text-yellow-500"
      : "text-gray-500";

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            <span className="text-xl font-bold tracking-tight">Sento</span>
          </div>
          <div className="glass-card px-4 py-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-semibold">
              <User className="w-4 h-4" />
            </div>
            <div className="text-sm">
              <div className="font-medium">Free Plan</div>
              <div className="text-xs text-muted-foreground">
                Credits: 1/1{" "}
                <a href="#" className="text-purple-400 hover:underline">
                  Upgrade
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          {!generatedCode && !isGenerating && (
            <>
              {/* Hero Section */}
              <div className="text-center mb-12 space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                  Create Stunning Websites{" "}
                  <span className="gradient-text">with AI</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Describe your vision. Watch AI build it in seconds.
                </p>
                <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 text-sm">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-muted-foreground">
                    Powered by Claude Sonnet 4
                  </span>
                </div>
              </div>

              {/* Input Card */}
              <div className="glass-card rounded-2xl p-8 shadow-card animate-slide-up">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-muted-foreground" />
                  <label className="text-sm font-medium">
                    Describe Your Website
                  </label>
                </div>

                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Example: A modern photography portfolio with a hero section, gallery grid, about page, and contact form. Use elegant black and white design with gold accents..."
                  className="w-full h-48 bg-black/40 border-white/20 rounded-xl p-4 text-foreground placeholder:text-muted font-mono text-sm focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 resize-none"
                  maxLength={characterLimit + 100}
                />

                <div className="flex justify-between items-center mt-3">
                  <span className={`text-xs ${characterCountColor}`}>
                    {characterCount} / {characterLimit}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Lightbulb className="w-3 h-3" />
                    <span>Be specific for best results</span>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={input.length < 50}
                  className="w-full mt-6 h-14 text-base font-semibold gradient-button hover-scale shadow-glow rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {input.length < 50
                    ? "Describe your website first"
                    : "Generate Website ✨"}
                </Button>
              </div>
            </>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="glass-card rounded-2xl p-12 shadow-card text-center animate-slide-up">
              <Loader2 className="w-12 h-12 text-purple-500 mx-auto animate-spin" />
              <h2 className="text-2xl font-bold mt-6">Creating Your Website</h2>
              <p className="text-muted-foreground text-sm mt-2">{status}</p>

              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mt-8">
                <div
                  className="h-full gradient-button transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                ~{Math.max(0, 30 - Math.floor((progress / 100) * 30))} seconds
                remaining
              </p>
            </div>
          )}

          {/* Preview Section */}
          {generatedCode && (
            <div className="space-y-6 animate-slide-up">
              {/* Success Header */}
              <div className="flex items-center justify-center gap-3">
                <PartyPopper className="w-8 h-8 text-purple-500 animate-bounce" />
                <h2 className="text-3xl font-bold">Your Website is Ready!</h2>
              </div>

              {/* Preview Card */}
              <div className="glass-card rounded-2xl overflow-hidden shadow-card">
                {/* Toolbar */}
                <div className="bg-black/40 border-b border-white/10 px-4 py-3 flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode("desktop")}
                      className={`${
                        viewMode === "desktop"
                          ? "bg-white/10 text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode("tablet")}
                      className={`${
                        viewMode === "tablet"
                          ? "bg-white/10 text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Tablet className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setViewMode("mobile")}
                      className={`${
                        viewMode === "mobile"
                          ? "bg-white/10 text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" disabled className="text-muted-foreground">
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" disabled className="text-muted-foreground">
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" disabled className="text-muted-foreground">
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Iframe Container */}
                <div className="bg-white p-4 flex items-center justify-center">
                  <div className={`w-full ${getAspectRatio()} transition-all duration-300`}>
                    <iframe
                      srcDoc={generatedCode}
                      className="w-full h-full border-0 rounded-lg shadow-lg"
                      title="Generated Website Preview"
                      sandbox="allow-scripts"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleDownload}
                  className="flex-1 h-12 gradient-button hover-scale shadow-glow"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download HTML
                </Button>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="flex-1 h-12 border-white/20 bg-white/5 hover:bg-white/10"
                >
                  <Copy className="w-5 h-5 mr-2" />
                  Copy Code
                </Button>
                <Button
                  onClick={handleNewWebsite}
                  variant="ghost"
                  className="h-12 text-muted-foreground hover:text-foreground"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Generate Another
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
