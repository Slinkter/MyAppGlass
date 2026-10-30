"use client";

import React from "react";
import { Box, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Bot, Send } from "lucide-react";

export interface ChatMessage {
  sender: "ai" | "user";
  text: string;
}

interface ChatAssistantProps {
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (value: string) => void;
  handleSendChat: (e: React.FormEvent) => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ chatMessages, chatInput, setChatInput, handleSendChat }) => {
  return (
    <Box
      bg="surface.card"
      p="6"
      borderRadius="2xl"
      border="1px solid"
      borderColor="border.glass"
      backdropFilter="blur(16px)"
      h="full"
      display="flex"
      flexDirection="column"
    >
      <HStack gap="3" mb="4" pb="4" borderBottom="1px solid" borderColor="whiteAlpha.100">
        <Box p="2.5" bg="purple.500/20" color="purple.300" borderRadius="xl">
          <Bot size={24} />
        </Box>
        <Box>
          <Heading size="sm">Asistente de Diseño & Vidriería IA</Heading>
          <Text fontSize="xs" color="green.400">● En línea para responder dudas técnicas</Text>
        </Box>
      </HStack>

      {/* MENSAJES */}
      <VStack flex="1" gap="3" align="stretch" overflowY="auto" maxH="440px" pr="1" mb="4">
        {chatMessages.map((msg, idx) => (
          <Box
            key={idx}
            alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
            bg={msg.sender === "user" ? "blue.600" : "whiteAlpha.100"}
            color="white"
            p="3.5"
            borderRadius="2xl"
            borderTopRightRadius={msg.sender === "user" ? "none" : "2xl"}
            borderTopLeftRadius={msg.sender === "ai" ? "none" : "2xl"}
            maxW="85%"
            fontSize="sm"
            lineHeight="relaxed"
          >
            {msg.text}
          </Box>
        ))}
      </VStack>

      {/* INPUT DE CHAT */}
      <form onSubmit={handleSendChat}>
        <HStack gap="2">
          <input
            type="text"
            placeholder="Pregúntale a la IA sobre cristales, colores o precios..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            style={{
              flex: 1,
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "12px",
              padding: "10px 14px",
              color: "white",
              fontSize: "13px",
              outline: "none",
            }}
          />
          <Button type="submit" colorPalette="purple" size="md">
            <Send size={16} />
          </Button>
        </HStack>
      </form>
    </Box>
  );
};
