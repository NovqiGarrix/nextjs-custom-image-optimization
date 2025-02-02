import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <Loader2 className='text-white w-10 h-10 animate-spin' />
        </div>
    );
}