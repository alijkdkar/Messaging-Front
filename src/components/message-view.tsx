"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Conversation, Message } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { SendHorizonal, Phone, Video, Info, Users } from "lucide-react";

interface MessageViewProps {
  conversation?: Conversation;
  onSendMessage: (text: string) => void;
}

const messageFormSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty." }),
});

export function MessageView({ conversation, onSendMessage }: MessageViewProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  const form = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);
  
  React.useEffect(() => {
    form.reset({ message: '' });
  }, [conversation?.id, form]);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  function onSubmit(data: z.infer<typeof messageFormSchema>) {
    onSendMessage(data.message);
    form.reset();
  }

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground bg-background">
        <div className="text-center">
            <Users className="mx-auto h-12 w-12 text-muted-foreground/50"/>
            <h2 className="mt-2 text-lg font-medium">Welcome to WhisperNet</h2>
            <p className="mt-1 text-sm text-muted-foreground">Select a conversation to start chatting.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex items-center p-3 border-b border-border shrink-0">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={conversation.avatarUrl} alt={conversation.name} data-ai-hint="person face" />
          <AvatarFallback className="bg-primary/20 text-primary font-bold">
            {conversation.name.includes(' ') ? getInitials(conversation.name) : <Users size={20} />}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold flex-1">{conversation.name}</h2>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><Phone className="w-5 h-5" /></Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><Video className="w-5 h-5" /></Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><Info className="w-5 h-5" /></Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {conversation.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
      </div>

      <footer className="p-3 border-t border-border shrink-0 bg-background">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-3">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Type a message..." {...field} className="bg-card/80 focus:bg-card" autoComplete="off" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" disabled={!form.formState.isDirty || !form.formState.isValid}>
              <SendHorizonal className="w-5 h-5" />
              <span className="sr-only">Send Message</span>
            </Button>
          </form>
        </Form>
      </footer>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
          return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const isGroupMessage = !message.isMe && message.sender.id !== message.id.split('-')[1];

  return (
    <div className={cn("flex items-end gap-3 w-full", message.isMe && "justify-end")}>
      {!message.isMe && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} data-ai-hint="person" />
          <AvatarFallback className="font-bold">{getInitials(message.sender.name)}</AvatarFallback>
        </Avatar>
      )}
      <div className={cn("flex flex-col gap-1 max-w-sm md:max-w-md", message.isMe ? "items-end" : "items-start")}>
        {isGroupMessage && <p className="text-xs text-muted-foreground px-2">{message.sender.name}</p>}
        <div
            className={cn(
            "rounded-2xl p-3 text-sm",
            message.isMe
                ? "bg-primary text-primary-foreground rounded-br-lg"
                : "bg-card rounded-bl-lg"
            )}
        >
            <p className="leading-snug">{message.text}</p>
        </div>
      </div>
    </div>
  );
}