import Image from "next/image";

type JuiceImageProps = {
  className?: string;
  name: string;
  symbol: string;
  width?: number;
  height?: number;
};

export function JuiceImage({ className = "rounded-full", name, symbol, width = 32, height = 32 }: JuiceImageProps) {
  return <Image src={`/assets/juice-${symbol}.jpg`} alt={name} width={width} height={height} className={className} />;
}
