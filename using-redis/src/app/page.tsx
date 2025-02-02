import Images from "@/components/images";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {

  return (
    <div className="p-10 py-5">
      <h1 className="text-3xl font-bold text-center mb-5">Custom Image Optimization with File System</h1>

      <Suspense fallback={<Loading />}>
        <Images />
      </Suspense>
    </div>
  );
}
