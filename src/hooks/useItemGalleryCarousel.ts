"use client";

import { useCallback, useState } from "react";

import { useAutoCarousel } from "@/hooks/useAutoCarousel";

interface UseItemGalleryCarouselOptions {
  imageCount: number;
  itemId: string;
}

interface ItemGalleryState {
  imageIndex: number;
  itemId: string;
}

/** Keeps item detail image galleries manual, auto-advancing, and reset-safe across item changes. */
export function useItemGalleryCarousel({
  imageCount,
  itemId,
}: UseItemGalleryCarouselOptions) {
  const [galleryState, setGalleryState] = useState<ItemGalleryState>({
    imageIndex: 0,
    itemId,
  });
  const maxImageIndex = Math.max(imageCount - 1, 0);
  const imageIndex =
    galleryState.itemId === itemId
      ? Math.min(galleryState.imageIndex, maxImageIndex)
      : 0;

  const selectImage = useCallback(
    (nextImageIndex: number) => {
      setGalleryState({
        imageIndex: Math.min(Math.max(nextImageIndex, 0), maxImageIndex),
        itemId,
      });
    },
    [itemId, maxImageIndex],
  );

  const showPreviousImage = useCallback(() => {
    if (imageCount <= 1) {
      return;
    }

    selectImage(imageIndex === 0 ? imageCount - 1 : imageIndex - 1);
  }, [imageCount, imageIndex, selectImage]);

  const showNextImage = useCallback(() => {
    if (imageCount <= 1) {
      return;
    }

    selectImage(imageIndex === imageCount - 1 ? 0 : imageIndex + 1);
  }, [imageCount, imageIndex, selectImage]);

  useAutoCarousel({
    count: imageCount,
    onAdvance: showNextImage,
    resetKey: `${itemId}:${imageIndex}`,
  });

  return {
    imageIndex,
    selectImage,
    showNextImage,
    showPreviousImage,
  };
}
