'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import OptimizedImage from './optimized-image';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader2 } from 'lucide-react';

interface Photo {
    id: number;
    width: number;
    height: number;
    src: {
        medium: string;
        original: string;
        large: string;
        large2x: string;
    }
    alt: string;
}

const PER_PAGE = 20;

async function getPhotos(nextUrl?: string | null) {
    const resp = await fetch(nextUrl ?? `https://api.pexels.com/v1/curated?per_page=${PER_PAGE}&orientation=portrait`, {
        headers: {
            Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!
        }
    });

    const data = await resp.json();
    return {
        info: {
            page: data.page,
            next_page: data.next_page
        },
        photos: data.photos
    }
}

const Images = () => {

    const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
        queryKey: ["photos"],
        queryFn: ({ pageParam }) => getPhotos(pageParam.next_page),
        initialPageParam: {
            next_page: null
        },
        getNextPageParam: ({ info }) => info,
    });

    const photos = useMemo(() => data.pages.map(({ photos }) => photos).flat() as Array<Photo>, [data]);

    return (
        <InfiniteScroll
            dataLength={photos.length}
            hasMore={hasNextPage}
            loader={
                <div className='fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 rounded-full'>
                    <Loader2 className='w-6 h-6 text-white animate-spin' />
                </div>
            }
            next={fetchNextPage}
            className='grid grid-cols-5 gap-5 w-full'
            scrollThreshold={0.8}
        >
            {photos.map((photo) => (
                <OptimizedImage
                    key={photo.id}
                    alt={photo.alt}
                    loading='lazy'
                    width={+(new URL(photo.src.large2x).searchParams.get("w")!)}
                    height={+(new URL(photo.src.large2x).searchParams.get("h")!)}
                    src={photo.src.large2x}
                    className='aspect-auto'
                />
            ))}
        </InfiniteScroll>
    )
}

export default Images;