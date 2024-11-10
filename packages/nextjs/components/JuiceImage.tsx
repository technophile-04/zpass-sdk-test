import Image from "next/image";
import clsx from "clsx";

type JuiceImageProps = {
  className?: string;
  name: string;
  symbol: string;
};

export function JuiceImage({ className = "w-8 h-8", name, symbol }: JuiceImageProps) {
  return (
    <Image
      src={`/assets/juice-${symbol}.jpg`}
      alt={name}
      width={100}
      height={100}
      className={clsx("rounded-full", className)}
    />
  );
}
