"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

export default function PropertyGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const photos = images.length > 0 ? images : ["https://placehold.co/1200x800?text=No+Image"];
  const thumbs = photos.slice(1, 5);
  const remaining = photos.length - 5;

  function next() {
    setLightbox((i) => (i === null ? null : (i + 1) % photos.length));
  }
  function prev() {
    setLightbox((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          onClick={() => setLightbox(0)}
          className="relative aspect-4/3 cursor-pointer overflow-hidden rounded-2xl bg-plum-900/5 sm:col-span-2 sm:aspect-auto"
        >
          <Image src={photos[0]} alt={alt} fill unoptimized className="object-cover" />
        </button>

        <div className="grid grid-cols-2 gap-2 sm:grid-rows-2">
          {thumbs.map((src, i) => {
            const isLast = i === thumbs.length - 1 && remaining > 0;
            return (
              <button
                key={src + i}
                onClick={() => setLightbox(i + 1)}
                className="relative aspect-4/3 cursor-pointer overflow-hidden rounded-xl bg-plum-900/5 sm:aspect-auto"
              >
                <Image src={src} alt={alt} fill unoptimized className="object-cover" />
                {isLast && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-semibold text-white">
                    +{remaining + 1} photos
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {photos.length > 1 && (
        <button
          onClick={() => setLightbox(0)}
          className="mt-3 flex cursor-pointer items-center gap-1.5 text-sm font-medium text-plum-700 hover:underline"
        >
          <Images size={15} /> View all {photos.length} photos
        </button>
      )}

      {lightbox !== null && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4">
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 cursor-pointer rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          <button
            onClick={prev}
            className="absolute left-3 cursor-pointer rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="relative h-full max-h-[80vh] w-full max-w-4xl">
            <Image
              src={photos[lightbox]}
              alt={alt}
              fill
              unoptimized
              className="object-contain"
            />
          </div>

          <button
            onClick={next}
            className="absolute right-3 cursor-pointer rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>

          <span className="absolute bottom-5 text-sm text-white/70">
            {lightbox + 1} / {photos.length}
          </span>
        </div>
      )}
    </>
  );
}
