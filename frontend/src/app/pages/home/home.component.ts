import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginModalComponent } from "../../components/login-modal/login-modal.component";
import { RegisterModalComponent } from "../../components/register-modal/register-modal.component";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, LoginModalComponent, RegisterModalComponent],
  template: `
    <div class="min-h-screen bg-[#0d1b2aff]">
      <!-- Header -->
      <header class="relative z-10 bg-[#0d1b2aff]/90 backdrop-blur-sm">
        <div class="container mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="text-2xl font-bold text-[#e0e1ddff]">NutriMile</div>
            <button
              (click)="openModal('login')"
              class="btn btn-primary px-6 py-2 rounded-full hover:scale-105 transition-transform"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <section
        class="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <!-- Background Image -->
        <div class="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
            alt="Healthy food background"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-[#0d1b2aff]/70"></div>
        </div>

        <!-- Hero Content -->
        <div class="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1
            class="text-5xl md:text-7xl font-bold text-[#e0e1ddff] mb-8 leading-tight"
          >
            Transform Your
            <span class="text-[#778da9ff] block">Nutrition Journey</span>
          </h1>
          <p
            class="text-xl md:text-2xl text-[#e0e1ddff]/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            "The groundwork for all happiness is good health. Let AI guide your
            path to optimal nutrition and wellness."
          </p>
          <button
            (click)="openModal('login')"
            class="btn btn-primary text-xl px-12 py-4 rounded-full shadow-2xl transform transition-all hover:scale-110 hover:shadow-[#778da9ff]/30"
          >
            Start Your Journey
          </button>
        </div>

        <!-- Scroll Indicator -->
        <div
          class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-[#e0e1ddff]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 bg-[#1b263bff]">
        <div class="container mx-auto px-6">
          <h2
            class="text-4xl md:text-5xl font-bold text-center text-[#e0e1ddff] mb-20"
          >
            Powerful Features for Your Health
          </h2>

          <div class="space-y-32">
            <!-- Feature 1 -->
            <div
              class="feature-row"
              [class.animate-slide-in]="visibleFeatures.includes(0)"
              #feature1
            >
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div class="order-2 lg:order-1">
                  <div class="feature-image-container">
                    <img
                      src="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=800&h=800"
                      alt="AI Nutrition Chat"
                      class="feature-image"
                    />
                  </div>
                </div>
                <div class="order-1 lg:order-2 space-y-6">
                  <div class="feature-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-3xl font-bold text-[#e0e1ddff]">
                    AI-Powered Nutrition Chat
                  </h3>
                  <p class="text-lg text-[#778da9ff] leading-relaxed">
                    Simply describe your meals in natural language and receive
                    instant, comprehensive nutritional analysis. Our advanced AI
                    understands context and provides personalized insights based
                    on your health profile.
                  </p>
                  <ul class="space-y-3 text-[#e0e1ddff]">
                    <li class="flex items-center">
                      <svg
                        class="h-5 w-5 text-[#778da9ff] mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Instant macro and micronutrient breakdown
                    </li>
                    <li class="flex items-center">
                      <svg
                        class="h-5 w-5 text-[#778da9ff] mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Personalized health recommendations
                    </li>
                    <li class="flex items-center">
                      <svg
                        class="h-5 w-5 text-[#778da9ff] mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Support for dietary restrictions
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Feature 2 -->
            <div
              class="feature-row"
              [class.animate-slide-in]="visibleFeatures.includes(1)"
              #feature2
            >
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div class="space-y-6">
                  <div class="feature-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-3xl font-bold text-[#e0e1ddff]">
                    Smart Photo Analysis
                  </h3>
                  <p class="text-lg text-[#778da9ff] leading-relaxed">
                    Capture your meals with your camera and let our computer
                    vision technology identify ingredients, estimate portions,
                    and calculate nutritional values automatically.
                  </p>
                  <ul class="space-y-3 text-[#e0e1ddff]">
                    <li class="flex items-center">
                      <svg
                        class="h-5 w-5 text-[#778da9ff] mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Advanced food recognition AI
                    </li>
                    <li class="flex items-center">
                      <svg
                        class="h-5 w-5 text-[#778da9ff] mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Accurate portion estimation
                    </li>
                    <li class="flex items-center">
                      <svg
                        class="h-5 w-5 text-[#778da9ff] mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Instant nutritional breakdown
                    </li>
                  </ul>
                  <div
                    class="inline-block bg-[#415a77ff] text-[#e0e1ddff] px-4 py-2 rounded-full text-sm font-medium"
                  >
                    Coming Soon
                  </div>
                </div>
                <div>
                  <div class="feature-image-container">
                    <img
                      src="https://media.istockphoto.com/id/1241881284/photo/hands-of-cook-photographing-mexican-tacos.jpg?s=612x612&w=0&k=20&c=zFkJ71PlN32cgEpEiuKxVwb5f89fZoI9xt4xfyRhQUM="
                      alt="Photo Analysis"
                      class="feature-image"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Feature 3 -->
            <div
              class="feature-row"
              [class.animate-slide-in]="visibleFeatures.includes(2)"
              #feature3
            >
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div class="order-2 lg:order-1">
                  <div class="feature-image-container">
                    <img
                      src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800&h=800"
                      alt="Meal Planning"
                      class="feature-image"
                    />
                  </div>
                </div>
                <div class="order-1 lg:order-2 space-y-6">
                  <div class="feature-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <h3 class="text-3xl font-bold text-[#e0e1ddff]">
                    Intelligent Meal Planning
                  </h3>
                  <p class="text-lg text-[#778da9ff] leading-relaxed">
                    Get personalized meal plans that adapt to your goals,
                    preferences, and health conditions. Our AI creates balanced,
                    delicious meal suggestions that fit your lifestyle.
                  </p>
                  <ul class="space-y-3 text-[#e0e1ddff]">
                    <li class="flex items-center">
                      <svg
                        class="h-5 w-5 text-[#778da9ff] mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Personalized weekly meal plans
                    </li>
                    <li class="flex items-center">
                      <svg
                        class="h-5 w-5 text-[#778da9ff] mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Smart grocery list generation
                    </li>
                    <li class="flex items-center">
                      <svg
                        class="h-5 w-5 text-[#778da9ff] mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Recipe recommendations
                    </li>
                  </ul>
                  <div
                    class="inline-block bg-[#415a77ff] text-[#e0e1ddff] px-4 py-2 rounded-full text-sm font-medium"
                  >
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>

            <!-- Feature 4 -->
            <div
              class="feature-row"
              [class.animate-slide-in]="visibleFeatures.includes(1)"
              #feature2
            >
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div class="space-y-6">
                  <div class="feature-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 13V6a2 2 0 00-2-2h-4l-2-2-2 2H6a2 2 0 00-2 2v7M8 12h.01M16 12h.01M12 16v2m-4 4h8"
                      />
                    </svg>
                  </div>
                  <h3 class="text-3xl font-bold text-[#e0e1ddff]">
                    Personalized Exercise Suggestions
                  </h3>
                  <p class="text-lg text-[#778da9ff] leading-relaxed">
                    Get tailored workout recommendations based on your fitness
                    level, goals, and daily activity data. Our system adapts as
                    you progress to keep you on track.
                  </p>
                  <ul class="space-y-3 text-[#e0e1ddff]">
                    <li class="flex items-center">
                      <svg
                        class="h-5 w-5 text-[#778da9ff] mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      AI-powered routine generation
                    </li>
                    <li class="flex items-center">
                      <svg
                        class="h-5 w-5 text-[#778da9ff] mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Adjusts to your fitness level
                    </li>
                    <li class="flex items-center">
                      <svg
                        class="h-5 w-5 text-[#778da9ff] mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Integrates with wearable data
                    </li>
                  </ul>
                  <div
                    class="inline-block bg-[#415a77ff] text-[#e0e1ddff] px-4 py-2 rounded-full text-sm font-medium"
                  >
                    Coming Soon
                  </div>
                </div>
                <div>
                  <div class="feature-image-container">
                    <img
                      src="https://media.istockphoto.com/id/1500051695/photo/athletic-woman-eating-a-healthy-bowl-of-muesli-with-fruit-sitting-on-floor-in-the-kitchen-at.jpg?s=612x612&w=0&k=20&c=ewWO1mH-L-kJLSeEcVImTNqsZbfjbyqyyvBmp-Q2bEc="
                      alt="Exercise Suggestions"
                      class="feature-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-[#0d1b2aff] py-16">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 class="text-3xl font-bold text-[#e0e1ddff] mb-6">
                Meet Our Team
              </h3>
              <p class="text-lg text-[#778da9ff] leading-relaxed mb-8">
                We're a passionate team of nutritionists, AI engineers, and
                health enthusiasts dedicated to making nutrition tracking
                accessible and intelligent. Our mission is to empower
                individuals to make informed dietary choices through
                cutting-edge technology and personalized insights.
              </p>
              <div class="flex space-x-6">
                <div class="text-center">
                  <div
                    class="w-16 h-16 bg-[#415a77ff] rounded-full flex items-center justify-center mb-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-[#e0e1ddff]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <p class="text-sm text-[#778da9ff]">Innovation</p>
                </div>
                <div class="text-center">
                  <div
                    class="w-16 h-16 bg-[#415a77ff] rounded-full flex items-center justify-center mb-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-[#e0e1ddff]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <p class="text-sm text-[#778da9ff]">Health Focus</p>
                </div>
                <div class="text-center">
                  <div
                    class="w-16 h-16 bg-[#415a77ff] rounded-full flex items-center justify-center mb-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-8 w-8 text-[#e0e1ddff]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <p class="text-sm text-[#778da9ff]">Community</p>
                </div>
              </div>
            </div>
            <div class="text-center lg:text-right">
              <div class="text-6xl font-bold text-[#415a77ff] mb-4">
                NutriMile
              </div>
              <p class="text-[#778da9ff] mb-6">
                Transforming nutrition through AI
              </p>
              <div class="space-y-2 text-sm text-[#778da9ff]">
                <p>© 2025 NutriMile. All rights reserved.</p>
                <p>Built with ❤️ for better health</p>
                <p>By <b>ProjOctopus 🐙</b></p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <!-- Login Modal -->
      <app-login-modal
        *ngIf="showModal && modalType === 'login'"
        (closeModal)="closeModal()"
        (switchMode)="switchModalType($event)"
      ></app-login-modal>

      <!-- Register Modal -->
      <app-register-modal
        *ngIf="showModal && modalType === 'register'"
        (closeModal)="closeModal()"
        (switchMode)="switchModalType($event)"
      ></app-register-modal>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  showModal = false;
  modalType: "login" | "register" = "login";
  visibleFeatures: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check if user is already authenticated
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/chat-nutrition"]);
      return;
    }

    // Check if redirected with requiresLogin flag
    this.route.queryParams.subscribe((params) => {
      if (params["requiresLogin"] === "true") {
        this.openModal("login");
      }
    });

    // Set up intersection observer for feature animations
    this.setupFeatureAnimations();
  }

  private setupFeatureAnimations(): void {
    // Use setTimeout to ensure DOM elements are rendered
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const featureIndex = parseInt(
                entry.target.getAttribute("data-feature-index") || "0"
              );
              if (!this.visibleFeatures.includes(featureIndex)) {
                this.visibleFeatures.push(featureIndex);
              }
            }
          });
        },
        { threshold: 0.3 }
      );

      // Observe feature elements
      const features = document.querySelectorAll(".feature-row");
      features.forEach((feature, index) => {
        feature.setAttribute("data-feature-index", index.toString());
        observer.observe(feature);
      });
    }, 100);
  }

  openModal(type: "login" | "register"): void {
    this.modalType = type;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  switchModalType(type: string): void {
    this.modalType = type as "login" | "register";
  }
}
