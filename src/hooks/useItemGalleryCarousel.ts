"use client";

import { useCallback, useState } from "react";

import { useAutoCarousel } from "@/hooks/useAutoCarousel";

interface UseItemGalleryCarouselOptions {
  autoAdvance?: boolean;
  imageCount: number;
  itemId: string;
}

interface ItemGalleryState {
  imageIndex: number;
  itemId: string;
}

/** Keeps item galleries reset-safe while allowing each surface to choose manual or auto behavior. */
export function useItemGalleryCarousel({
  autoAdvance = true,
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
    enabled: autoAdvance,
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
