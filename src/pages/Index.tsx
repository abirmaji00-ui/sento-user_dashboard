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
    "🤖 Analyzing your requirements...",
    "🎨 Generating HTML structure...",
    "✨ Adding styles and animations...",
    "🚀 Finalizing your website...",
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
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 95));
    }, 600);

    try {
      const prompt = `You are an expert web developer. Generate a complete, production-ready, single-file HTML website based on this description:

${input}

REQUIREMENTS:
- Complete HTML5 document starting with <!DOCTYPE html>
- Use Tailwind CSS CDN: <script src="https://cdn.tailwindcss.com"></script>
- Inline all CSS in <style> tags if needed beyond Tailwind
- Inline all JavaScript in <script> tags
- Mobile-first responsive design
- Modern, professional design with smooth animations
- Use placeholder images from https://source.unsplash.com/random/800x600?{relevant-keyword}
- Include realistic placeholder text and content
- Professional color scheme matching the description
- Proper semantic HTML5 tags
- Accessibility features (alt tags, ARIA labels)

Return ONLY the complete HTML code. No explanations, no markdown, no code blocks - just the raw HTML starting with <!DOCTYPE html>`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 4000,
            }
          })
        }
      );

      clearInterval(statusInterval);
      clearInterval(progressInterval);

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment.');
        }
        throw new Error('Generation failed. Please try again.');
      }

      const data = await response.json();
      let htmlCode = data.candidates[0].content.parts[0].text;

      // Remove markdown code blocks if present
      htmlCode = htmlCode.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();

      // Validate it's HTML
      if (!htmlCode.includes('<!DOCTYPE html>') && !htmlCode.includes('<html')) {
        throw new Error('Invalid HTML generated');
      }

      setProgress(100);
      setGeneratedCode(htmlCode);
      setIsGenerating(false);

      toast({
        title: "Success! 🎉",
        description: "Your website has been generated successfully",
      });
    } catch (error) {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
      setIsGenerating(false);
      setProgress(0);

      console.error('Generation error:', error);

      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
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
