'use client';

import { useState, useRef, useEffect } from 'react';
import { chatMessages as initialMessages } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Mic, ImagePlus, Bot, User, Sparkles } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  time: string;
};

const suggestedQuestions = [
  'আমার জমিতে টমেটো হবে?',
  'সার কত লাগবে?',
  'পানি কখন দিতে হবে?',
  'ফসলে পোকা ধরেছে, কী করব?',
];

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages as Message[]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    const h = now.getHours();
    const period = h < 12 ? 'সকাল' : h < 17 ? 'দুপুর' : h < 20 ? 'সন্ধ্যা' : 'রাত';
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const toBn = (n: number) =>
      String(n).split('').map((d) => bengaliDigits[parseInt(d)] ?? d).join('');
    const hour12 = h % 12 || 12;
    const min = now.getMinutes();
    return `${period} ${toBn(hour12)}:${toBn(min).padStart(2, '০')}`;
  };

  const handleSend = (text?: string) => {
    const msgText = text || input.trim();
    if (!msgText) return;

    const userMsg: Message = {
      role: 'user',
      content: msgText,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate AI response after 1 second
    setTimeout(() => {
      const aiMsg: Message = {
        role: 'assistant',
        content: 'আপনার প্রশ্নের উত্তর প্রস্তুত হচ্ছে... আমি আপনার জমির তথ্য, মাটির ডেটা এবং আবহাওয়ার পূর্বাভাস বিশ্লেষণ করে সর্বোত্তম পরামর্শ দেওয়ার চেষ্টা করছি। অনুগ্রহ করে একটু অপেক্ষা করুন।',
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <Card className="flex w-full flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-xl font-bold">
          <span className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-green-600" />
            AI কৃষি সহকারী
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            <Sparkles className="h-3.5 w-3.5" />
            সক্রিয়
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3 p-4 pt-0">
        {/* Chat messages */}
        <ScrollArea className="flex-1 max-h-[420px] rounded-lg border bg-muted/30 p-3" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg, idx) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      isUser ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    {isUser ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-green-700" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm sm:max-w-[70%] ${
                      isUser
                        ? 'rounded-tr-sm bg-green-600 text-white'
                        : 'rounded-tl-sm bg-gray-100 text-foreground dark:bg-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                    <p
                      className={`mt-1 text-[10px] ${
                        isUser ? 'text-green-200' : 'text-muted-foreground'
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Suggested questions */}
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-100 dark:border-green-800 dark:bg-green-950 dark:text-green-300 dark:hover:bg-green-900"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 text-muted-foreground hover:text-green-600"
            title="ভয়েস ইনপুট"
          >
            <Mic className="h-4 w-4" />
          </Button>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="আপনার প্রশ্ন লিখুন..."
            className="flex-1"
          />

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 text-muted-foreground hover:text-green-600"
            title="ছবি আপলোড"
          >
            <ImagePlus className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="h-9 w-9 shrink-0 bg-green-600 hover:bg-green-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}