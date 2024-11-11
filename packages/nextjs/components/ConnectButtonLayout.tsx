import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

export function ConnectButtonLayout() {
  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <div className="mt-[20rem]">
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
}
