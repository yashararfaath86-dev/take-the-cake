import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FlavorShowcase } from '@/components/FlavorShowcase';
import { CustomCakeBuilder } from '@/components/CustomCakeBuilder';
import { StorytellingSection } from '@/components/StorytellingSection';
import { BentoGrid } from '@/components/BentoGrid';
import { ReviewsSection } from '@/components/ReviewsSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Interactive 3D Cake */}
      <HeroSection />

      {/* Signature Flavor Showcase */}
      <FlavorShowcase />

      {/* Interactive 3D Custom Cake Builder Widget */}
      <CustomCakeBuilder />

      {/* Storytelling & Ingredient Philosophy */}
      <StorytellingSection />

      {/* Why Take The Cake Bento Grid */}
      <BentoGrid />

      {/* Coimbatore Customer Reviews */}
      <ReviewsSection />
    </div>
  );
}
