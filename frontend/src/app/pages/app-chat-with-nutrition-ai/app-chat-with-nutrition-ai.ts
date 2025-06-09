import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  typing?: boolean;
}

@Component({
  selector: 'app-chat-with-nutrition-ai',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col h-screen bg-[#0d1b2aff]">
      <!-- Header -->
      <div class="bg-[#1b263bff] border-b border-[#415a77ff] p-4 shadow-lg">
        <div class="container mx-auto max-w-4xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-[#415a77ff] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#e0e1ddff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 class="text-xl font-semibold text-[#e0e1ddff]">Nutrition AI Assistant</h1>
                <p class="text-sm text-[#778da9ff]">
                  <span class="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Online - Under Development – UI Preview Only
                </p>
              </div>
            </div>
            <button 
              (click)="clearChat()"
              class="btn btn-outline text-sm px-4 py-2 hover:bg-[#415a77ff] transition-colors"
            >
              Clear Chat
            </button>
          </div>
        </div>
      </div>

      <!-- Chat Messages Container -->
      <div class="flex-1 overflow-hidden">
        <div 
          #chatContainer
          class="h-full overflow-y-auto p-4 space-y-4 custom-scrollbar"
        >
          <div class="container mx-auto max-w-4xl">
            <!-- Welcome Message -->
            <div *ngIf="messages.length === 0" class="text-center py-12">
              <div class="w-20 h-20 bg-[#415a77ff] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-[#e0e1ddff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-[#e0e1ddff] mb-2">Welcome to Nutrition AI</h2>
              <p class="text-[#778da9ff] max-w-md mx-auto">
                Ask me anything about nutrition, meal planning, or dietary advice. I'm here to help you on your health journey!
              </p>
              <div class="mt-6 flex flex-wrap justify-center gap-2">
                <button 
                  *ngFor="let suggestion of quickSuggestions"
                  (click)="sendQuickMessage(suggestion)"
                  class="bg-[#1b263bff] hover:bg-[#415a77ff] text-[#e0e1ddff] px-4 py-2 rounded-full text-sm transition-colors border border-[#415a77ff]"
                >
                  {{ suggestion }}
                </button>
              </div>
            </div>

            <!-- Chat Messages -->
            <div *ngFor="let message of messages; trackBy: trackByMessageId" class="message-container">
              <!-- User Message -->
              <div *ngIf="message.isUser" class="flex justify-end mb-4">
                <div class="max-w-xs lg:max-w-md">
                  <div class="bg-[#415a77ff] text-[#e0e1ddff] rounded-2xl rounded-br-md px-4 py-3 shadow-lg">
                    <p class="whitespace-pre-wrap">{{ message.content }}</p>
                  </div>
                  <p class="text-xs text-[#778da9ff] mt-1 text-right">
                    {{ formatTime(message.timestamp) }}
                  </p>
                </div>
                <div class="w-8 h-8 bg-[#778da9ff] rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#e0e1ddff]" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>

              <!-- AI Message -->
              <div *ngIf="!message.isUser" class="flex justify-start mb-4">
                <div class="w-8 h-8 bg-[#415a77ff] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#e0e1ddff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div class="max-w-xs lg:max-w-md">
                  <div class="bg-[#1b263bff] text-[#e0e1ddff] rounded-2xl rounded-bl-md px-4 py-3 shadow-lg border border-[#415a77ff]">
                    <div *ngIf="message.typing" class="flex space-x-1">
                      <div class="typing-dot"></div>
                      <div class="typing-dot" style="animation-delay: 0.2s"></div>
                      <div class="typing-dot" style="animation-delay: 0.4s"></div>
                    </div>
                    <p *ngIf="!message.typing" class="whitespace-pre-wrap">{{ message.content }}</p>
                  </div>
                  <p *ngIf="!message.typing" class="text-xs text-[#778da9ff] mt-1">
                    {{ formatTime(message.timestamp) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="bg-[#1b263bff] border-t border-[#415a77ff] p-4">
        <div class="container mx-auto max-w-4xl">
          <form [formGroup]="messageForm" (ngSubmit)="sendMessage()" class="flex space-x-3">
            <div class="flex-1 relative">
              <textarea
                formControlName="message"
                placeholder="Ask me about nutrition, meal planning, or dietary advice..."
                class="w-full bg-[#0d1b2aff] border border-[#415a77ff] rounded-2xl px-4 py-3 pr-12 text-[#e0e1ddff] placeholder-[#778da9ff] focus:outline-none focus:ring-2 focus:ring-[#778da9ff] focus:border-transparent resize-none max-h-32"
                rows="1"
                (keydown)="onKeyDown($event)"
                #messageTextarea
              ></textarea>
              <button
                type="button"
                (click)="toggleEmojiPicker()"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#778da9ff] hover:text-[#e0e1ddff] transition-colors"
              >
                😊
              </button>
            </div>
            <button
              type="submit"
              [disabled]="messageForm.invalid || isTyping"
              class="bg-[#415a77ff] hover:bg-[#778da9ff] disabled:bg-[#415a77ff]/50 text-[#e0e1ddff] rounded-2xl px-6 py-3 transition-colors flex items-center justify-center min-w-[60px]"
            >
              <svg *ngIf="!isTyping" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              <div *ngIf="isTyping" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </button>
          </form>
          
          <!-- Character Count -->
          <div class="text-xs text-[#778da9ff] mt-2 text-right">
            {{ messageForm.get('message')?.value?.length || 0 }}/500
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #1b263b;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #415a77;
      border-radius: 3px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #778da9;
    }

    .typing-dot {
      width: 8px;
      height: 8px;
      background-color: #778da9;
      border-radius: 50%;
      animation: typing 1.4s infinite ease-in-out;
    }

    @keyframes typing {
      0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .message-container {
      animation: slideInUp 0.3s ease-out;
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    textarea {
      field-sizing: content;
    }
  `]
})
export class ChatWithNutritionAiComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @ViewChild('messageTextarea') private messageTextarea!: ElementRef;

  messageForm: FormGroup;
  messages: ChatMessage[] = [];
  isTyping = false;
  private shouldScrollToBottom = false;

  quickSuggestions = [
    "What's a healthy breakfast?",
    "How much protein do I need?",
    "Best foods for energy",
    "Meal prep ideas",
    "Healthy snacks"
  ];

  // Sample AI responses for the template
  private aiResponses = [
    "That's a great question about nutrition! Here are some key points to consider...",
    "Based on current nutritional guidelines, I'd recommend...",
    "For optimal health, it's important to focus on...",
    "Here's what nutritionists typically suggest...",
    "That's an excellent approach to healthy eating! Let me share some insights...",
    "Nutrition is very individual, but generally speaking...",
    "I'd be happy to help you with that! Here's what you should know...",
    "Great question! The key factors to consider are...",
    "From a nutritional standpoint, here's what I recommend...",
    "That's a common concern, and here's how to address it..."
  ];

  constructor(private fb: FormBuilder) {
    this.messageForm = this.fb.group({
      message: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.loadChatHistory();
    
    // Auto-resize textarea
    setTimeout(() => {
      if (this.messageTextarea) {
        this.messageTextarea.nativeElement.addEventListener('input', this.autoResizeTextarea.bind(this));
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private autoResizeTextarea(): void {
    const textarea = this.messageTextarea.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px';
  }

  trackByMessageId(index: number, message: ChatMessage): string {
    return message.id;
  }

  sendMessage(): void {
    if (this.messageForm.invalid || this.isTyping) return;

    const messageContent = this.messageForm.get('message')?.value.trim();
    if (!messageContent) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: this.generateId(),
      content: messageContent,
      isUser: true,
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    this.messageForm.reset();
    this.shouldScrollToBottom = true;

    // Reset textarea height
    if (this.messageTextarea) {
      this.messageTextarea.nativeElement.style.height = 'auto';
    }

    // Simulate AI typing
    this.simulateAIResponse();
    this.saveChatHistory();
  }

  sendQuickMessage(suggestion: string): void {
    this.messageForm.patchValue({ message: suggestion });
    this.sendMessage();
  }

  private simulateAIResponse(): void {
    this.isTyping = true;

    // Add typing indicator
    const typingMessage: ChatMessage = {
      id: this.generateId(),
      content: '',
      isUser: false,
      timestamp: new Date(),
      typing: true
    };

    this.messages.push(typingMessage);
    this.shouldScrollToBottom = true;

    // Simulate AI thinking time (1-3 seconds)
    const thinkingTime = Math.random() * 2000 + 1000;

    setTimeout(() => {
      // Remove typing indicator
      this.messages = this.messages.filter(m => !m.typing);

      // Add AI response
      const aiResponse: ChatMessage = {
        id: this.generateId(),
        content: this.getRandomAIResponse(),
        isUser: false,
        timestamp: new Date()
      };

      this.messages.push(aiResponse);
      this.isTyping = false;
      this.shouldScrollToBottom = true;
      this.saveChatHistory();
    }, thinkingTime);
  }

  private getRandomAIResponse(): string {
    const randomResponse = this.aiResponses[Math.floor(Math.random() * this.aiResponses.length)];
    
    // Add some variety to responses
    const additionalInfo = [
      "\n\n• Focus on whole, unprocessed foods\n• Stay hydrated throughout the day\n• Listen to your body's hunger cues",
      "\n\nRemember, consistency is key when it comes to healthy eating habits!",
      "\n\nWould you like me to elaborate on any specific aspect?",
      "\n\nFeel free to ask if you need more personalized recommendations!",
      "\n\n💡 Pro tip: Small, sustainable changes often lead to the best long-term results."
    ];

    return randomResponse + (Math.random() > 0.5 ? additionalInfo[Math.floor(Math.random() * additionalInfo.length)] : '');
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  toggleEmojiPicker(): void {
    // Placeholder for emoji picker functionality
    console.log('Emoji picker would open here');
  }

  clearChat(): void {
    if (confirm('Are you sure you want to clear the chat history?')) {
      this.messages = [];
      localStorage.removeItem('nutrition-ai-chat-history');
    }
  }

  formatTime(timestamp: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  }

  private scrollToBottom(): void {
    try {
      const container = this.chatContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private saveChatHistory(): void {
    try {
      const chatData = {
        messages: this.messages.filter(m => !m.typing),
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('nutrition-ai-chat-history', JSON.stringify(chatData));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  }

  private loadChatHistory(): void {
    try {
      const savedData = localStorage.getItem('nutrition-ai-chat-history');
      if (savedData) {
        const chatData = JSON.parse(savedData);
        this.messages = chatData.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        this.shouldScrollToBottom = true;
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      this.messages = [];
    }
  }
}