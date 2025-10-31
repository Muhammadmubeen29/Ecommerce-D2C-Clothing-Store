import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  product?: {
    name?: string;
    price?: number;
    currency?: string;
    availability?: string;
    category?: string;
  };
}

export default function SEO({
  title = 'D2C Export Fashion E-Commerce - Premium Pakistani Fashion',
  description = 'Discover premium handcrafted Pakistani fashion. Shop elegant kurtas, shalwar kameez, and traditional outfits with worldwide shipping.',
  keywords = 'Pakistani fashion, kurta, shalwar kameez, traditional clothing, ethnic wear, online shopping',
  image = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=630&fit=crop',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  product,
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', 'D2C Export Fashion', 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Product-specific structured data
    if (product) {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name || title,
        description: description,
        image: image,
        offers: {
          '@type': 'Offer',
          price: product.price || 0,
          priceCurrency: product.currency || 'USD',
          availability: product.availability || 'https://schema.org/InStock',
          url: url,
        },
        category: product.category || 'Fashion',
      };

      // Remove existing product structured data
      const existingScript = document.querySelector('script[type="application/ld+json"][data-seo="product"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'product');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    } else {
      // Website structured data
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'D2C Export Fashion',
        description: description,
        url: typeof window !== 'undefined' ? window.location.origin : '',
      };

      // Remove existing website structured data
      const existingScript = document.querySelector('script[type="application/ld+json"][data-seo="website"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'website');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      // Optional: Clean up if needed
    };
  }, [title, description, keywords, image, url, type, product]);

  return null; // This component doesn't render anything
}

