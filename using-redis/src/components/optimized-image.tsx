import Image, { type ImageProps } from 'next/image';

const imageLoader = ({ src, width, quality }: { src: string, width: number, quality?: number }) => {
    const url = `/api/image?q=${quality || 80}&w=${width}&url=${encodeURIComponent(src)}`;
    return url;
}

export default function OptimizedImage(props: ImageProps) {
    return (
        <Image
            {...props}
            loader={imageLoader}
        />
    );
}