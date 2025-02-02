import Image, { type ImageProps } from 'next/image';

const normalizeSrc = (src: string) => {
    return src.startsWith('/') ? src.slice(1) : src;
}

const imageLoader = ({ src, width, quality }: { src: string, width: number, quality?: number }) => {
    if (process.env.NODE_ENV === "development") {
        return src;
    }
    const params = [`width=${width}`];
    if (quality) {
        params.push(`quality=${quality}`);
    }
    const paramsString = params.join(',');
    return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}

export default function OptimizedImage(props: ImageProps) {
    return (
        <Image
            {...props}
            loader={imageLoader}
        />
    );
}