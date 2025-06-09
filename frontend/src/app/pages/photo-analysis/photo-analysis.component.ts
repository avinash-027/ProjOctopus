import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-analysis',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-[#e0e1ddff] mb-8">Photo Analysis</h1>
        
        <div class="card flex flex-col items-center text-center p-12">
          <div class="text-[#778da9ff] mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          
          <h2 class="text-2xl font-semibold text-[#e0e1ddff] mb-4">Coming Soon</h2>
          
          <p class="text-[#778da9ff] text-lg mb-8 max-w-lg">
            This feature will allow users to upload photos for nutrition analysis. 
            Our AI will identify the foods in your image and provide a complete nutritional breakdown.
          </p>
          
          <div class="bg-[#0d1b2aff] rounded-lg p-6 border border-[#415a77ff] w-full max-w-md">
            <h3 class="text-xl font-semibold text-[#e0e1ddff] mb-3">Planned Features</h3>
            
            <ul class="text-left text-[#778da9ff] space-y-2">
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 text-[#415a77ff]" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Instant food recognition
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 text-[#415a77ff]" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Portion size estimation
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 text-[#415a77ff]" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Complete nutritional breakdown
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 mt-0.5 text-[#415a77ff]" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                Save meals to history
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PhotoAnalysisComponent {}