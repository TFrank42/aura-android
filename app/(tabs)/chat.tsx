import { ScrollView, Text, View, TextInput, Pressable, FlatList } from "react-native";
import { useState, useRef, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const AI_RESPONSES: Record<string, string> = {
  "send email": "I'll help you send an email. Please provide the recipient's email address, subject, and message body.",
  "open": "Which application would you like me to open? I can launch Excel, Word, PowerPoint, Outlook, Teams, or any installed app.",
  "create": "I can help you create documents, spreadsheets, presentations, or files. What would you like to create?",
  "schedule": "I can schedule tasks, meetings, and reminders. What would you like to schedule?",
  "help": "I'm AURA, your Adaptive Universal Runtime Agent. I can help with:\n• Office software (Excel, Word, PowerPoint, Outlook, Teams)\n• System tasks and automation\n• File management\n• Calendar and scheduling\n• Communication tasks\n\nWhat can I help you with?",
  "default": "I understand. I'm processing your request. How can I assist you further?",
};

export default function ChatScreen() {
  const colors = useColors();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "AURA initialized. Ready for commands. Type 'help' for available operations.",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const flatListRef = useRef<FlatList>(null);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(AI_RESPONSES)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    return AI_RESPONSES.default;
  };

  const handleSendMessage = () => {
    if (inputText.trim().length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getAIResponse(inputText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);

    setInputText("");
  };

  const renderMessage = (message: Message) => {
    const isUser = message.type === "user";
    return (
      <View
        key={message.id}
        className={`flex-row mb-3 ${isUser ? "justify-end" : "justify-start"}`}
      >
        <View
          className={`max-w-xs px-3 py-2 rounded ${
            isUser ? "bg-primary" : "bg-surface border"
          }`}
          style={{
            borderColor: isUser ? "transparent" : colors.border,
          }}
        >
          <Text
            className="text-sm font-mono"
            style={{
              color: isUser ? colors.background : colors.foreground,
            }}
          >
            {isUser ? "> " : "< "}
            {message.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenContainer className="p-0 flex-col">
      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => renderMessage(item)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12, paddingBottom: 8 }}
        className="flex-1 bg-background"
        scrollEnabled={true}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input Area */}
      <View
        className="border-t p-3 flex-row gap-2 items-center"
        style={{ borderTopColor: colors.border, backgroundColor: colors.surface }}
      >
        <Text
          className="text-sm font-bold font-mono"
          style={{ color: colors.primary }}
        >
          &gt;
        </Text>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter command..."
          placeholderTextColor={`${colors.primary}66`}
          onSubmitEditing={handleSendMessage}
          returnKeyType="send"
          className="flex-1 px-2 py-2 text-sm font-mono"
          style={{
            color: colors.foreground,
            borderColor: colors.border,
            borderWidth: 1,
          }}
        />
        <Pressable
          onPress={handleSendMessage}
          className="px-3 py-2 active:opacity-70"
          style={{ backgroundColor: colors.primary }}
        >
          <Text
            className="text-sm font-bold font-mono"
            style={{ color: colors.background }}
          >
            SEND
          </Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
