import { Config } from "@measured/puck";
import HeroCarousel from "@/components/puck/HeroCarousel";
import ClimbCard from "@/components/puck/ClimbCard";

type Props = {
  HeroCarousel: {
    slides: Array<{
      image: string;
      title: string;
      subtitle?: string;
    }>;
    autoplay?: boolean;
    effect?: 'slide' | 'fade' | 'cube' | 'coverflow';
    speed?: number;
    height?: string;
  };
  ClimbCard: {
    name: string;
    category: string;
    elevation: string;
    distance: string;
    gradient: string;
    image?: string;
    description?: string;
  };
  TextBlock: {
    text: string;
    align?: 'left' | 'center' | 'right';
    size?: 'sm' | 'base' | 'lg' | 'xl';
  };
  Container: {
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    background?: string;
  };
  Columns: {
    columns: number;
    gap?: 'sm' | 'md' | 'lg';
  };
};

export const config: Config<Props> = {
  components: {
    HeroCarousel: {
      fields: {
        slides: {
          type: "array",
          label: "Slides",
          arrayFields: {
            image: { 
              type: "text",
              label: "Image URL"
            },
            title: { 
              type: "text",
              label: "Title"
            },
            subtitle: { 
              type: "text",
              label: "Subtitle (optional)"
            }
          }
        },
        autoplay: { 
          type: "radio",
          label: "Auto Play",
          options: [
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]
        },
        effect: {
          type: "select",
          label: "Transition Effect",
          options: [
            { label: "Slide", value: "slide" },
            { label: "Fade", value: "fade" },
            { label: "Cube", value: "cube" },
            { label: "Coverflow", value: "coverflow" }
          ]
        },
        speed: {
          type: "number",
          label: "Transition Speed (ms)"
        },
        height: {
          type: "text",
          label: "Height (e.g., 70vh, 500px)"
        }
      },
      defaultProps: {
        slides: [
          {
            image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600",
            title: "THE SWISS ALPS",
            subtitle: "June - July 2026"
          },
          {
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600",
            title: "LEGENDARY CLIMBS",
            subtitle: "Furka, Grimsel, Susten & More"
          }
        ],
        autoplay: true,
        effect: "fade",
        speed: 1000,
        height: "70vh"
      },
      render: HeroCarousel
    },
    ClimbCard: {
      fields: {
        name: { 
          type: "text",
          label: "Climb Name"
        },
        category: {
          type: "select",
          label: "Category",
          options: [
            { label: "HC (Hors Catégorie)", value: "HC" },
            { label: "Category 1", value: "1" },
            { label: "Category 2", value: "2" },
            { label: "Category 3", value: "3" },
            { label: "Category 4", value: "4" }
          ]
        },
        elevation: { 
          type: "text",
          label: "Elevation"
        },
        distance: { 
          type: "text",
          label: "Distance"
        },
        gradient: { 
          type: "text",
          label: "Average Gradient"
        },
        image: { 
          type: "text",
          label: "Image URL (optional)"
        },
        description: { 
          type: "textarea",
          label: "Description (optional)"
        }
      },
      defaultProps: {
        name: "Furka Pass",
        category: "HC",
        elevation: "2436m",
        distance: "16.4 km",
        gradient: "6.5%",
        image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800",
        description: "One of the most iconic climbs in the Swiss Alps"
      },
      render: ClimbCard
    },
    TextBlock: {
      fields: {
        text: {
          type: "textarea",
          label: "Text Content"
        },
        align: {
          type: "select",
          label: "Text Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" }
          ]
        },
        size: {
          type: "select",
          label: "Text Size",
          options: [
            { label: "Small", value: "sm" },
            { label: "Base", value: "base" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" }
          ]
        }
      },
      defaultProps: {
        text: "Enter your text here",
        align: "left",
        size: "base"
      },
      render: ({ text, align, size }) => {
        const sizeClasses = {
          sm: 'text-sm',
          base: 'text-base',
          lg: 'text-lg',
          xl: 'text-xl'
        };
        
        const alignClasses = {
          left: 'text-left',
          center: 'text-center',
          right: 'text-right'
        };
        
        return (
          <div className={`${sizeClasses[size || 'base']} ${alignClasses[align || 'left']} py-4`}>
            <p className="whitespace-pre-wrap">{text}</p>
          </div>
        );
      }
    },
    Container: {
      fields: {
        maxWidth: {
          type: "select",
          label: "Max Width",
          options: [
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" },
            { label: "2XL", value: "2xl" },
            { label: "Full", value: "full" }
          ]
        },
        padding: {
          type: "select",
          label: "Padding",
          options: [
            { label: "None", value: "none" },
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" }
          ]
        },
        background: {
          type: "text",
          label: "Background Color (optional)"
        }
      },
      defaultProps: {
        maxWidth: "xl",
        padding: "md"
      },
      render: ({ maxWidth, padding, background, puck: { renderDropZone } }) => {
        const widthClasses: Record<string, string> = {
          sm: 'max-w-sm',
          md: 'max-w-md',
          lg: 'max-w-lg',
          xl: 'max-w-xl',
          '2xl': 'max-w-2xl',
          full: 'max-w-full'
        };
        
        const paddingClasses: Record<string, string> = {
          none: '',
          sm: 'px-4 py-2',
          md: 'px-6 py-4',
          lg: 'px-8 py-6'
        };
        
        return (
          <div 
            className={`mx-auto ${widthClasses[maxWidth || 'xl']} ${paddingClasses[padding || 'md']}`}
            style={{ backgroundColor: background }}
          >
            {renderDropZone({ zone: "content" })}
          </div>
        );
      }
    },
    Columns: {
      fields: {
        columns: {
          type: "number",
          label: "Number of Columns",
          min: 1,
          max: 4
        },
        gap: {
          type: "select",
          label: "Gap Size",
          options: [
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" }
          ]
        }
      },
      defaultProps: {
        columns: 2,
        gap: "md"
      },
      render: ({ columns, gap, puck: { renderDropZone } }) => {
        const gapClasses: Record<string, string> = {
          sm: 'gap-2',
          md: 'gap-4',
          lg: 'gap-6'
        };
        
        const columnClasses: Record<number, string> = {
          1: 'grid-cols-1',
          2: 'grid-cols-1 md:grid-cols-2',
          3: 'grid-cols-1 md:grid-cols-3',
          4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        };
        
        return (
          <div className={`grid ${columnClasses[columns || 2]} ${gapClasses[gap || 'md']}`}>
            {Array.from({ length: columns || 2 }).map((_, i) => (
              <div key={i}>
                {renderDropZone({ zone: `column-${i}` })}
              </div>
            ))}
          </div>
        );
      }
    }
  }
};

export default config;