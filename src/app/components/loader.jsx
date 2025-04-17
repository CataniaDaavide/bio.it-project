import { LoaderCircle } from "lucide-react";

export default function LoaderComponent() {

  return (
<div className="w-full not-first:text-black dark:text-white flex items-center justify-center">
<LoaderCircle className="animate-spin"/>
</div>
  );
}

