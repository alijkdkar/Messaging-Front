"use client";

import * as React from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Conversation, Message } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { SendHorizonal, Phone, Video, Info, Users, Reply, Paperclip, Mic, MapPin, File as FileIcon, Play, Pause, Download } from "lucide-react";
import { mockUser } from "@/lib/mock-data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

  const otherUser = !conversation?.isGroup ? conversation?.members.find(m => m.id !== mockUser.id) : null;

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
        {conversation.isGroup ? (
          <div className="flex items-center gap-3 flex-1">
            <div className="flex -space-x-3 overflow-hidden">
              <TooltipProvider delayDuration={0}>
                {conversation.members.slice(0, 10).map((member) => (
                  <Tooltip key={member.id}>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Avatar className="h-10 w-10 border-2 border-background">
                          <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="person" />
                          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                        </Avatar>
                        <span className={cn(
                            "absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-background",
                            member.status === 'online' && 'bg-green-500',
                            member.status === 'offline' && 'bg-gray-500',
                            member.status === 'in-call' && 'bg-red-500'
                        )} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{member.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
            <h2 className="text-lg font-semibold">{conversation.name}</h2>
          </div>
        ) : (
          <>
            <div className="relative mr-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={conversation.avatarUrl} alt={conversation.name} data-ai-hint="person face" />
                <AvatarFallback className="bg-primary/20 text-primary font-bold">
                  {getInitials(conversation.name)}
                </AvatarFallback>
              </Avatar>
              {otherUser && (
                  <span className={cn(
                      "absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-card",
                      otherUser.status === 'online' && 'bg-green-500',
                      otherUser.status === 'offline' && 'bg-gray-500',
                      otherUser.status === 'in-call' && 'bg-red-500'
                  )} />
              )}
            </div>
            <h2 className="text-lg font-semibold flex-1">{conversation.name}</h2>
          </>
        )}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><Phone className="w-5 h-5" /></Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><Video className="w-5 h-5" /></Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><Info className="w-5 h-5" /></Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversation.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
      </div>

      <footer className="p-3 border-t border-border shrink-0 bg-background">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
                  <Paperclip className="w-5 h-5" />
                  <span className="sr-only">Attach</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-2">
                <div className="grid gap-1">
                  <Button variant="ghost" className="justify-start gap-2">
                    <FileIcon className="w-4 h-4" /> Document
                  </Button>
                  <Button variant="ghost" className="justify-start gap-2">
                    <Mic className="w-4 h-4" /> Voice Message
                  </Button>
                   <Button variant="ghost" className="justify-start gap-2">
                    <MapPin className="w-4 h-4" /> Location
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
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
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
          return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const isGroupMessage = !message.isMe && message.sender.id !== message.id.split('-')[1];

    const renderWithMentions = (text: string) => {
        const mentionRegex = /@(\w+)/g;
        return text.split(mentionRegex).map((part, index) => {
            if (index % 2 === 1) { // It's a mention
                return (
                    <span key={index} className="bg-accent/20 text-accent-foreground font-semibold rounded px-1 py-0.5">
                        @{part}
                    </span>
                );
            }
            return part;
        });
    };
    
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    React.useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => setIsPlaying(false);
        if (audio) {
            audio.addEventListener('ended', handleEnded);
        }
        return () => {
            if (audio) {
                audio.removeEventListener('ended', handleEnded);
            }
        };
    }, []);


  return (
    <div className={cn("flex items-start gap-3 w-full", message.isMe && "justify-end")}>
      {!message.isMe && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} data-ai-hint="person" />
          <AvatarFallback className="font-bold">{getInitials(message.sender.name)}</AvatarFallback>
        </Avatar>
      )}
      <div className={cn("flex flex-col gap-1 max-w-sm md:max-w-md", message.isMe ? "items-end" : "items-start")}>
        {isGroupMessage && <p className="text-xs text-muted-foreground px-2">{message.sender.name}</p>}
        
        {message.replyTo && (
            <div className="bg-card/70 border-l-2 border-primary pl-2 pr-3 py-1.5 rounded-md text-sm w-full opacity-80 mb-1 max-w-full">
                <div className="flex items-center gap-1.5">
                    <Reply className="w-3.5 h-3.5 text-primary" />
                    <p className="font-semibold text-xs text-primary">{message.replyTo.sender.name}</p>
                </div>
                <p className="text-muted-foreground text-sm truncate pl-2">{message.replyTo.text}</p>
            </div>
        )}

        <div
            className={cn(
            "rounded-2xl text-sm",
            message.isMe
                ? "bg-primary text-primary-foreground rounded-br-lg"
                : "bg-card rounded-bl-lg",
            (!message.type || message.type === 'text') ? "p-3" : "p-1.5"
            )}
        >
            {message.type === 'image' && message.mediaUrl && (
                <Dialog>
                    <DialogTrigger>
                        <div className="relative">
                            <Image src={message.mediaUrl} alt={message.text || 'Image'} width={400} height={300} className="rounded-xl max-w-xs cursor-pointer object-cover" data-ai-hint="photo" />
                            {message.text && <p className={cn("text-xs p-2", message.isMe ? "text-primary-foreground/80" : "text-foreground/80")}>{renderWithMentions(message.text)}</p>}
                        </div>
                    </DialogTrigger>
                    <DialogContent className="p-0 border-0 max-w-4xl bg-transparent">
                         <Image src={message.mediaUrl} alt={message.text || 'Image'} width={1200} height={800} className="rounded-lg object-contain w-full h-full" data-ai-hint="photo" />
                    </DialogContent>
                </Dialog>
            )}
            {message.type === 'video' && message.mediaUrl && (
                <div>
                    <video src={message.mediaUrl} controls className="rounded-xl max-w-xs" />
                    {message.text && <p className={cn("text-xs p-2", message.isMe ? "text-primary-foreground/80" : "text-foreground/80")}>{renderWithMentions(message.text)}</p>}
                </div>
            )}
            {message.type === 'voice' && message.mediaUrl && (
                <div className="flex items-center gap-2 w-60 p-1">
                    <audio ref={audioRef} src={message.mediaUrl} preload="metadata" />
                    <Button onClick={togglePlay} variant="ghost" size="icon" className={cn("h-9 w-9 shrink-0 rounded-full", message.isMe ? "bg-white/25 hover:bg-white/30" : "bg-primary/10 hover:bg-primary/20")}>
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <div className={cn("flex items-end h-6 flex-1 gap-px", message.isMe ? "text-primary-foreground" : "text-primary")}>
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="w-0.5 bg-current/50 rounded-full" style={{ height: `${Math.random() * 80 + 20}%`}}></div>
                        ))}
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{message.duration}</span>
                </div>
            )}
            {message.type === 'file' && (
                 <a href={message.mediaUrl} download={message.fileName} className="flex items-center gap-3 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <div className={cn("p-2 rounded-lg", message.isMe ? "bg-white/20" : "bg-primary/10")}>
                        <FileIcon className="w-5 h-5"/>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="font-medium truncate">{message.fileName}</p>
                        <p className="text-xs opacity-80">{message.fileSize}</p>
                    </div>
                    <Download className="w-5 h-5 opacity-50"/>
                </a>
            )}
            {(!message.type || message.type === 'text') && message.text && (
                <p className="leading-snug">{renderWithMentions(message.text)}</p>
            )}
        </div>
      </div>
    </div>
  );
}
