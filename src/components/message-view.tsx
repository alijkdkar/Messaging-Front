"use client";

import * as React from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Conversation, Message, SendMessagePayload, MessageStatus } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { SendHorizontal, Phone, Video, Info, Users, Reply, Paperclip, Mic, MapPin, File as FileIcon, Play, Pause, Download, Trash2, Square, Clock, Check, CheckCheck, ImagePlus, FileVideo } from "lucide-react";
import { mockUser } from "@/lib/mock-data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "./ui/scroll-area";
import { format, isToday, isYesterday } from "date-fns";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";

interface MessageViewProps {
  conversation?: Conversation;
  onSendMessage: (message: SendMessagePayload) => void;
}

const messageFormSchema = z.object({
  message: z.string(),
});

const formatTimestamp = (timestamp?: Date) => {
    if (!timestamp) return '';
    if (isToday(timestamp)) {
        return format(timestamp, 'p'); // e.g., 5:30 PM
    }
    if (isYesterday(timestamp)) {
        return 'Yesterday';
    }
    return format(timestamp, 'P'); // e.g., 10/25/2024
};

const MessageStatusIndicator = ({ status }: { status?: MessageStatus }) => {
    if (!status) return null;

    switch (status) {
        case 'sending':
            return <Clock className="w-4 h-4 text-muted-foreground" />;
        case 'sent':
            return <Check className="w-4 h-4 text-muted-foreground" />;
        case 'delivered':
            return <CheckCheck className="w-4 h-4 text-muted-foreground" />;
        case 'seen':
            return <CheckCheck className="w-4 h-4 text-primary" />;
        default:
            return null;
    }
};

export function MessageView({ conversation, onSendMessage }: MessageViewProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordedAudio, setRecordedAudio] = React.useState<{ url: string; blob: Blob } | null>(null);
  const [recordingDuration, setRecordingDuration] = React.useState(0);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const recordingTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const [mentionPopoverOpen, setMentionPopoverOpen] = React.useState(false);
  const [mentionSearch, setMentionSearch] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  const [mediaPreview, setMediaPreview] = React.useState<{ file: File; url: string; type: 'image' | 'video' } | null>(null);
  const [caption, setCaption] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const form = useForm<z.infer<typeof messageFormSchema>>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const messageValue = form.watch("message");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);
  
  React.useEffect(() => {
    form.reset({ message: '' });
  }, [conversation?.id, form]);
  
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) && inputRef.current && !inputRef.current.contains(event.target as Node)) {
          setMentionPopoverOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverRef, inputRef]);


  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  function onSubmit(data: z.infer<typeof messageFormSchema>) {
    if (!data.message.trim()) return;
    onSendMessage({ text: data.message, type: 'text' });
    form.reset();
  }

  const handleStartRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        const audioChunks: Blob[] = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setRecordedAudio({ url: audioUrl, blob: audioBlob });
            stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
        setRecordingDuration(0);
        recordingTimerRef.current = setInterval(() => {
            setRecordingDuration(prev => prev + 1);
        }, 1000);
      } catch (err) {
        toast({
            variant: "destructive",
            title: "Microphone Access Denied",
            description: "Please enable microphone permissions in your browser settings to record audio.",
        })
        console.error("Failed to get mic", err);
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if(recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    }
  };

  const handleDeleteRecording = () => {
    if (recordedAudio) {
      URL.revokeObjectURL(recordedAudio.url);
    }
    setRecordedAudio(null);
    setIsRecording(false);
    setRecordingDuration(0);
    if(recordingTimerRef.current) clearInterval(recordingTimerRef.current);
  };
  
  const handleSendVoiceMessage = () => {
      if (!recordedAudio) return;
      onSendMessage({
          text: '',
          type: 'voice',
          mediaUrl: recordedAudio.url,
          duration: new Date(recordingDuration * 1000).toISOString().substr(14, 5)
      });
      handleDeleteRecording();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const url = URL.createObjectURL(file);
        const type = file.type.startsWith('image/') ? 'image' : 'video';
        setMediaPreview({ file, url, type });
    }
    if (event.target) {
        event.target.value = '';
    }
  };

  const triggerFileInput = (type: 'image' | 'video') => {
      if (fileInputRef.current) {
          fileInputRef.current.accept = type === 'image' ? 'image/*' : 'video/*';
          fileInputRef.current.click();
      }
  };

  const handleSendMedia = () => {
    if (!mediaPreview) return;
    onSendMessage({
        text: caption,
        type: mediaPreview.type,
        mediaUrl: mediaPreview.url,
        fileName: mediaPreview.file.name,
        fileSize: `${(mediaPreview.file.size / 1024 / 1024).toFixed(2)} MB`,
    });
    setMediaPreview(null);
    setCaption('');
  };

  const otherUser = !conversation?.isGroup ? conversation?.members.find(m => m.id !== mockUser.id) : null;
  
  const filteredMembers = React.useMemo(() => {
    if (!conversation || !conversation.isGroup) return [];
    return conversation.members
        .filter(member => member.id !== mockUser.id)
        .filter(member => member.name.toLowerCase().includes(mentionSearch.toLowerCase()));
  }, [conversation, mentionSearch]);

  const handleMentionSelect = (name: string) => {
    const nameWithoutSpaces = name.replace(/\s/g, '');
    const currentValue = form.getValues("message");
    const cursorPosition = inputRef.current?.selectionStart ?? currentValue.length;
    
    const textBeforeCursor = currentValue.substring(0, cursorPosition);
    
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    if (mentionMatch) {
        const startIndex = mentionMatch.index ?? 0;
        const newTextBefore = textBeforeCursor.substring(0, startIndex);
        const textAfterCursor = currentValue.substring(cursorPosition);
        const newText = `${newTextBefore}@${nameWithoutSpaces} ${textAfterCursor}`;
        form.setValue("message", newText, { shouldValidate: true });
        setMentionPopoverOpen(false);

        setTimeout(() => {
            if (inputRef.current) {
                const newCursorPosition = `${newTextBefore}@${nameWithoutSpaces} `.length;
                inputRef.current.focus();
                inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
            }
        }, 0);
    }
  };


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
        <div className="relative">
          <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />

          {mediaPreview && (
            <Dialog open={!!mediaPreview} onOpenChange={(open) => !open && setMediaPreview(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send {mediaPreview.type}</DialogTitle>
                  <DialogDescription>Add a caption to your media before sending.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  {mediaPreview.type === 'image' ? (
                    <Image src={mediaPreview.url} alt="Preview" width={400} height={300} className="rounded-md max-h-80 w-auto object-contain mx-auto" data-ai-hint="preview photo"/>
                  ) : (
                    <video src={mediaPreview.url} controls className="rounded-md max-h-80 w-auto mx-auto" />
                  )}
                  <Textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Add a caption..."
                    className="mt-4"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setMediaPreview(null)}>Cancel</Button>
                  <Button onClick={handleSendMedia}>Send</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}


          {isRecording || recordedAudio ? (
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" onClick={handleDeleteRecording}>
                <Trash2 className="w-5 h-5 text-muted-foreground" />
              </Button>
              <div className="flex items-center gap-2 p-1 rounded-full bg-card flex-1">
                {isRecording ? (
                  <div className="flex items-center gap-2 w-full px-2">
                    <Mic className="text-destructive w-5 h-5 animate-pulse" />
                    <SoundWave isAnimating={true} />
                  </div>
                ) : (
                  <AudioPlayerPreview url={recordedAudio!.url} />
                )}
                <span className="font-mono text-sm text-muted-foreground w-14 text-center">
                  {new Date(recordingDuration * 1000).toISOString().substr(14, 5)}
                </span>
              </div>
              {isRecording ? (
                  <Button type="button" size="icon" onClick={handleStopRecording} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      <Square className="w-5 h-5" />
                  </Button>
              ) : (
                  <Button type="button" size="icon" onClick={handleSendVoiceMessage}>
                      <SendHorizontal className="w-5 h-5" />
                  </Button>
              )}
            </div>
          ) : (
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
                       <Button variant="ghost" className="justify-start gap-2" onClick={() => triggerFileInput('image')}>
                        <ImagePlus className="w-4 h-4" /> Image
                      </Button>
                       <Button variant="ghost" className="justify-start gap-2" onClick={() => triggerFileInput('video')}>
                        <FileVideo className="w-4 h-4" /> Video
                      </Button>
                      <Button variant="ghost" className="justify-start gap-2">
                        <FileIcon className="w-4 h-4" /> Document
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
                  render={({ field }) => {
                      const combinedRef = (el: HTMLInputElement | null) => {
                          field.ref(el);
                          inputRef.current = el;
                      };

                      return (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                                {...field}
                                ref={combinedRef}
                                onChange={(e) => {
                                    field.onChange(e);
                                    
                                    if (!conversation.isGroup) return;

                                    const value = e.target.value;
                                    const cursorPosition = e.target.selectionStart ?? 0;
                                    const textBeforeCursor = value.substring(0, cursorPosition);
                                    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
                                    
                                    if (mentionMatch) {
                                        setMentionPopoverOpen(true);
                                        setMentionSearch(mentionMatch[1] || "");
                                    } else {
                                        setMentionPopoverOpen(false);
                                    }
                                }}
                                placeholder="Type a message..."
                                className="bg-card/80 focus:bg-card"
                                autoComplete="off"
                            />
                          </FormControl>
                        </FormItem>
                      )
                  }}
                />
                {messageValue ? (
                  <Button type="submit" size="icon">
                    <SendHorizontal className="w-5 h-5" />
                    <span className="sr-only">Send Message</span>
                  </Button>
                ) : (
                  <Button type="button" size="icon" variant="ghost" onClick={handleStartRecording}>
                    <Mic className="w-5 h-5 text-muted-foreground" />
                    <span className="sr-only">Record Voice</span>
                  </Button>
                )}
              </form>
            </Form>
          )}

          {/* Custom Popover for Mentions */}
          {conversation.isGroup && mentionPopoverOpen && (
            <div 
              ref={popoverRef}
              className="absolute bottom-full mb-2 w-full max-w-sm rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-10 animate-in fade-in-0 zoom-in-95"
            >
              {filteredMembers.length > 0 ? (
                  <ScrollArea className="h-fit max-h-48">
                      <div className="flex flex-col gap-1 p-1">
                          {filteredMembers.map(member => (
                              <Button
                                  key={member.id}
                                  variant="ghost"
                                  className="w-full justify-start gap-2 p-2 h-auto"
                                  onClick={() => handleMentionSelect(member.name)}
                                  onMouseDown={(e) => e.preventDefault()}
                              >
                                  <Avatar className="h-8 w-8">
                                      <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="person" />
                                      <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                                  </Avatar>
                                  <span>{member.name}</span>
                              </Button>
                          ))}
                      </div>
                  </ScrollArea>
              ) : (
                  <div className="p-2 text-center text-sm text-muted-foreground">
                      No one found.
                  </div>
              )}
            </div>
          )}
        </div>
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
                const isYou = part === mockUser.name || part === mockUser.name.replace(/\s/g, '');
                return (
                    <span key={index} className={cn(
                      "font-semibold rounded px-1 py-0.5",
                      isYou ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent-foreground"
                    )}>
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
            <div className="bg-secondary border-l-2 border-primary pl-2 pr-3 py-1.5 rounded-md text-sm w-full mb-1 max-w-full">
                <div className="flex items-center gap-1.5">
                    <Reply className="w-3.5 h-3.5 text-primary" />
                    <p className="font-semibold text-xs text-primary">{message.replyTo.sender.name}</p>
                </div>
                <p className="text-muted-foreground text-sm truncate pl-2">{message.replyTo.text}</p>
            </div>
        )}

        <div
            className={cn(
            "rounded-2xl text-sm relative",
            message.isMe
                ? "bg-primary text-primary-foreground rounded-br-lg"
                : "bg-secondary rounded-bl-lg",
            (!message.type || message.type === 'text') ? "p-3" : "p-1.5"
            )}
        >
            {message.type === 'image' && message.mediaUrl && (
                <Dialog>
                    <DialogTrigger asChild disabled={typeof message.uploadProgress === 'number'}>
                        <div className="relative">
                            <Image src={message.mediaUrl} alt={message.text || 'Image'} width={400} height={300} className="rounded-xl max-w-xs cursor-pointer object-cover" data-ai-hint="photo" />
                            {typeof message.uploadProgress !== 'number' && message.text && <p className={cn("text-xs p-2", message.isMe ? "text-primary-foreground/80" : "text-foreground/80")}>{renderWithMentions(message.text)}</p>}
                        </div>
                    </DialogTrigger>
                    <DialogContent className="p-0 border-0 max-w-4xl bg-transparent">
                         <Image src={message.mediaUrl} alt={message.text || 'Image'} width={1200} height={800} className="rounded-lg object-contain w-full h-full" data-ai-hint="photo" />
                    </DialogContent>
                </Dialog>
            )}
            {message.type === 'video' && message.mediaUrl && (
                <div className="relative">
                    <video src={message.mediaUrl} controls={typeof message.uploadProgress !== 'number'} className="rounded-xl max-w-xs" />
                    {typeof message.uploadProgress !== 'number' && message.text && <p className={cn("text-xs p-2", message.isMe ? "text-primary-foreground/80" : "text-foreground/80")}>{renderWithMentions(message.text)}</p>}
                </div>
            )}
            {message.type === 'voice' && message.mediaUrl && (
                <div className="flex items-center gap-2 w-60 p-1">
                    <audio ref={audioRef} src={message.mediaUrl} preload="metadata" />
                    <Button onClick={togglePlay} variant="ghost" size="icon" className={cn("h-9 w-9 shrink-0 rounded-full", message.isMe ? "bg-white/25 hover:bg-white/30" : "bg-primary/10 hover:bg-primary/20")}>
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <SoundWave isAnimating={false} />
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
             {message.isMe && typeof message.uploadProgress === 'number' && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-xl cursor-default">
                    <Progress value={message.uploadProgress} className="w-3/4 h-2 bg-background/20" />
                    <p className="text-white text-xs mt-2 font-semibold">{`Uploading...`}</p>
                </div>
            )}
        </div>
        <div className="flex items-center gap-1.5 px-2">
            <span className="text-xs text-muted-foreground">
                {formatTimestamp(message.timestamp)}
            </span>
            {message.isMe && <MessageStatusIndicator status={message.status} />}
        </div>
      </div>
    </div>
  );
}

const SoundWave = ({ isAnimating }: { isAnimating: boolean }) => (
    <div className={cn("flex items-end h-6 flex-1 gap-px", isAnimating ? "text-primary" : "text-primary/70")}>
        {[...Array(20)].map((_, i) => (
            <div
                key={i}
                className="w-0.5 bg-current rounded-full"
                style={{
                    height: isAnimating ? `${Math.random() * 80 + 20}%` : `${(Math.sin(i * 0.4) * 0.6 + 0.4) * 80}%`,
                    animation: isAnimating ? `sound-wave 1.2s infinite ease-in-out ${i * 0.1}s` : 'none',
                }}
            />
        ))}
    </div>
);

const AudioPlayerPreview = ({ url }: { url: string }) => {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);

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
        <div className="flex items-center gap-2 w-full">
            <audio ref={audioRef} src={url} preload="metadata" />
            <Button onClick={togglePlay} type="button" variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-full">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <SoundWave isAnimating={isPlaying} />
        </div>
    );
};

    
