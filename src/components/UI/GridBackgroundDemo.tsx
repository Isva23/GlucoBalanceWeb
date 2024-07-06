import { ImagesSliderDemo } from "../ImagesSliderDemo";
import { SignUpDemo } from "../SingUp";

export function GridBackgroundDemo() {
  return (
    <div className="h-[60rem] w-full bg-black bg-grid-white/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-20 bg-clip-text">
        <div className="mt-40">
            <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="">
                <SignUpDemo />
            </div>
            <div className="">
                <ImagesSliderDemo />
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}
