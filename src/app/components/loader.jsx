import { LoaderCircle } from "lucide-react";

export default function LoaderComponent() {

  return (
<div className="w-full h-full text-black dark:text-white flex items-center justify-center">
<LoaderCircle className="animate-spin"/>
</div>
  );
}

