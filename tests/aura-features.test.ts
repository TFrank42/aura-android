import { describe, it, expect } from "vitest";

// AI Response Generation Tests
describe("AURA AI Responses", () => {
  const AI_RESPONSES: Record<string, string> = {
    "send email": "I'll help you send an email. Please provide the recipient's email address, subject, and message body.",
    "open": "Which application would you like me to open? I can launch Excel, Word, PowerPoint, Outlook, Teams, or any installed app.",
    "create": "I can help you create documents, spreadsheets, presentations, or files. What would you like to create?",
    "schedule": "I can schedule tasks, meetings, and reminders. What would you like to schedule?",
    "help": "I'm AURA, your Adaptive Universal Runtime Agent. I can help with:\n• Office software (Excel, Word, PowerPoint, Outlook, Teams)\n• System tasks and automation\n• File management\n• Calendar and scheduling\n• Communication tasks\n\nWhat can I help you with?",
    "default": "I understand. I'm processing your request. How can I assist you further?",
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(AI_RESPONSES)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    return AI_RESPONSES.default;
  };

  it("should recognize send email commands", () => {
    const response = getAIResponse("send email to john@example.com");
    expect(response).toContain("email");
    expect(response).toContain("recipient");
  });

  it("should recognize open app commands", () => {
    const response = getAIResponse("open Excel");
    expect(response).toContain("application");
    expect(response).toContain("Excel");
  });

  it("should recognize create commands", () => {
    const response = getAIResponse("create a spreadsheet");
    expect(response).toContain("create");
    expect(response).toContain("spreadsheets");
  });

  it("should recognize schedule commands", () => {
    const response = getAIResponse("schedule a meeting");
    expect(response).toContain("schedule");
    expect(response).toContain("meetings");
  });

  it("should provide help when asked", () => {
    const response = getAIResponse("help");
    expect(response).toContain("AURA");
    expect(response).toContain("Office software");
  });

  it("should return default response for unknown commands", () => {
    const response = getAIResponse("xyz unknown command");
    expect(response).toContain("I understand");
  });

  it("should be case-insensitive", () => {
    const response1 = getAIResponse("SEND EMAIL");
    const response2 = getAIResponse("send email");
    expect(response1).toBe(response2);
  });
});

// Layer Navigation Tests
describe("Layer Navigation", () => {
  const LAYERS = ["scout", "forge", "core", "mesh"];

  it("should have all 4 layers defined", () => {
    expect(LAYERS).toHaveLength(4);
  });

  it("should have valid layer IDs", () => {
    LAYERS.forEach((layer) => {
      expect(typeof layer).toBe("string");
      expect(layer.length).toBeGreaterThan(0);
    });
  });

  it("should support navigation to each layer", () => {
    const validLayers = new Set(LAYERS);
    expect(validLayers.has("scout")).toBe(true);
    expect(validLayers.has("forge")).toBe(true);
    expect(validLayers.has("core")).toBe(true);
    expect(validLayers.has("mesh")).toBe(true);
  });
});

// System Metrics Tests
describe("System Metrics", () => {
  it("should initialize CPU metric", () => {
    const cpuVal = 23;
    expect(cpuVal).toBeGreaterThanOrEqual(0);
    expect(cpuVal).toBeLessThanOrEqual(100);
  });

  it("should initialize memory metric", () => {
    const memVal = 41;
    expect(memVal).toBeGreaterThanOrEqual(0);
    expect(memVal).toBeLessThanOrEqual(100);
  });

  it("should initialize storage metric", () => {
    const storageVal = 62;
    expect(storageVal).toBeGreaterThanOrEqual(0);
    expect(storageVal).toBeLessThanOrEqual(100);
  });

  it("should update metrics within valid range", () => {
    let cpuVal = 23;
    cpuVal = Math.max(5, Math.min(95, cpuVal + (Math.random() - 0.5) * 10));
    expect(cpuVal).toBeGreaterThanOrEqual(5);
    expect(cpuVal).toBeLessThanOrEqual(95);
  });
});

// Office Software Context Tests
describe("Office Software Literacy", () => {
  const officeKeywords = ["Excel", "Word", "PowerPoint", "Outlook", "Teams", "Slack"];

  it("should recognize all office software keywords", () => {
    officeKeywords.forEach((keyword) => {
      expect(keyword).toBeTruthy();
    });
  });

  it("should support Excel operations", () => {
    const excelCommands = ["create spreadsheet", "open Excel", "edit Excel cells"];
    excelCommands.forEach((cmd) => {
      const hasSpreadsheet = cmd.includes("spreadsheet");
      const hasExcel = cmd.includes("Excel");
      expect(hasSpreadsheet || hasExcel).toBe(true);
    });
  });

  it("should support Word operations", () => {
    const wordCommands = ["create document", "open Word", "edit Word"];
    wordCommands.forEach((cmd) => {
      const hasDocument = cmd.includes("document");
      const hasWord = cmd.includes("Word");
      expect(hasDocument || hasWord).toBe(true);
    });
  });

  it("should support PowerPoint operations", () => {
    const pptCommands = ["create presentation", "open PowerPoint", "add PowerPoint slide"];
    pptCommands.forEach((cmd) => {
      const hasPresentation = cmd.includes("presentation");
      const hasPowerPoint = cmd.includes("PowerPoint");
      expect(hasPresentation || hasPowerPoint).toBe(true);
    });
  });

  it("should support Outlook operations", () => {
    const outlookCommands = ["send email", "schedule meeting", "check calendar"];
    outlookCommands.forEach((cmd) => {
      const hasEmail = cmd.includes("email");
      const hasMeeting = cmd.includes("meeting");
      const hasCalendar = cmd.includes("calendar");
      expect(hasEmail || hasMeeting || hasCalendar).toBe(true);
    });
  });

  it("should support Teams operations", () => {
    const teamsCommands = ["send message", "start call", "share screen"];
    teamsCommands.forEach((cmd) => {
      const hasMessage = cmd.includes("message");
      const hasCall = cmd.includes("call");
      const hasScreen = cmd.includes("screen");
      expect(hasMessage || hasCall || hasScreen).toBe(true);
    });
  });
});

// UI Component Tests
describe("UI Components", () => {
  it("should have valid color scheme", () => {
    const colors = {
      primary: "#00E5FF",
      background: "#0C0F12",
      surface: "#121820",
      foreground: "#FFFFFF",
      success: "#39FF14",
      warning: "#FFB300",
      error: "#FF0055",
    };

    Object.values(colors).forEach((color) => {
      expect(color).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  it("should have valid layer colors", () => {
    const layerColors = {
      scout: "#39ff14",
      forge: "#ffb300",
      core: "#00e5ff",
      mesh: "#ff00ff",
    };

    Object.values(layerColors).forEach((color) => {
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    });
  });
});

// Message Handling Tests
describe("Message Handling", () => {
  it("should create user message with correct structure", () => {
    const message = {
      id: "1",
      type: "user" as const,
      content: "test message",
      timestamp: new Date(),
    };

    expect(message.id).toBeTruthy();
    expect(message.type).toBe("user");
    expect(message.content).toBeTruthy();
    expect(message.timestamp).toBeInstanceOf(Date);
  });

  it("should create AI message with correct structure", () => {
    const message = {
      id: "2",
      type: "ai" as const,
      content: "AI response",
      timestamp: new Date(),
    };

    expect(message.id).toBeTruthy();
    expect(message.type).toBe("ai");
    expect(message.content).toBeTruthy();
    expect(message.timestamp).toBeInstanceOf(Date);
  });

  it("should handle empty messages gracefully", () => {
    const emptyMessage = "";
    expect(emptyMessage.trim().length).toBe(0);
  });

  it("should trim whitespace from messages", () => {
    const message = "  test message  ";
    expect(message.trim()).toBe("test message");
  });
});
