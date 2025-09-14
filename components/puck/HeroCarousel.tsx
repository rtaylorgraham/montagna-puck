"use client";

import React, { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';

interface Slide {
  image: string;
  title: string;
  subtitle?: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  autoplay?: boolean;
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow';
  speed?: number;
  height?: string;
}

export default function HeroCarousel({ 
  slides = [], 
  autoplay = true,
  effect = 'fade',
  speed = 1000,
  height = '70vh'
}: HeroCarouselProps) {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    // Register Swiper web component
    register();

    const swiperEl = swiperRef.current;
    if (swiperEl) {
      const params = {
        navigation: true,
        pagination: {
          clickable: true,
        },
        autoplay: autoplay ? {
          delay: 5000,
          disableOnInteraction: false,
        } : false,
        effect: effect,
        speed: speed,
        loop: true,
        fadeEffect: {
          crossFade: true
        },
      };

      Object.assign(swiperEl, params);
      swiperEl.initialize();
    }
  }, [autoplay, effect, speed]);

  if (!slides || slides.length === 0) {
    return (
      <div 
        className="relative flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700"
        style={{ height }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Add Your Slides</h1>
          <p className="text-xl">Configure slides in the editor</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height }}>
      <swiper-container
        ref={swiperRef}
        init="false"
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <swiper-slide key={index}>
            <div 
              className="relative h-full w-full bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                height
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <p className="text-xl md:text-2xl lg:text-3xl drop-shadow-xl">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>

      <style jsx global>{`
        swiper-container {
          --swiper-navigation-color: #fff;
          --swiper-pagination-color: #fff;
          --swiper-pagination-bullet-inactive-color: rgba(255, 255, 255, 0.5);
        }
        
        swiper-container::part(button-prev),
        swiper-container::part(button-next) {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }
        
        swiper-container::part(button-prev):hover,
        swiper-container::part(button-next):hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        swiper-container::part(pagination) {
          bottom: 24px;
        }
      `}</style>
    </div>
  );
}