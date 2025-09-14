"use client";

import React, { useState } from 'react';

interface ClimbCardProps {
  name: string;
  category: string;
  elevation: string;
  distance: string;
  gradient: string;
  image?: string;
  description?: string;
}

export default function ClimbCard({
  name = "Furka Pass",
  category = "HC",
  elevation = "2436m",
  distance = "16.4 km",
  gradient = "6.5%",
  image = "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800",
  description = "One of the most iconic climbs in the Swiss Alps"
}: ClimbCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'HC': return 'bg-red-500 text-white';
      case '1': return 'bg-orange-500 text-white';
      case '2': return 'bg-yellow-500 text-black';
      case '3': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        onClick={() => setShowDetails(true)}
      >
        <div 
          className="h-48 bg-gradient-to-br from-green-400 to-blue-500 bg-cover bg-center"
          style={{
            backgroundImage: image ? `url(${image})` : undefined,
          }}
        />
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <span className={`px-2 py-1 rounded text-xs font-bold ${getCategoryColor(category)}`}>
              {category}
            </span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
              </svg>
              <span>{elevation}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>{distance}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>{gradient}</span>
            </div>
          </div>
          
          {description && (
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
        </div>
      </div>

      {showDetails && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <div 
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div 
                className="h-64 bg-gradient-to-br from-green-400 to-blue-500 bg-cover bg-center"
                style={{
                  backgroundImage: image ? `url(${image})` : undefined,
                }}
              />
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold">{name}</h2>
                <span className={`px-3 py-1 rounded text-sm font-bold ${getCategoryColor(category)}`}>
                  {category}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">⛰️</div>
                  <div className="text-sm text-gray-600">Elevation</div>
                  <div className="font-bold">{elevation}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">📏</div>
                  <div className="text-sm text-gray-600">Distance</div>
                  <div className="font-bold">{distance}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">📈</div>
                  <div className="text-sm text-gray-600">Avg Gradient</div>
                  <div className="font-bold">{gradient}</div>
                </div>
              </div>
              
              {description && (
                <p className="text-gray-600">{description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}