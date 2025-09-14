declare namespace JSX {
  interface IntrinsicElements {
    'swiper-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      init?: string;
      navigation?: string;
      pagination?: string;
      'pagination-clickable'?: string;
      autoplay?: string;
      'autoplay-delay'?: string;
      effect?: string;
      loop?: string;
      speed?: string;
    }, HTMLElement>;
    'swiper-slide': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}