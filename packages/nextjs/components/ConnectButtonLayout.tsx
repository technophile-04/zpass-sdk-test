import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

export function ConnectButtonLayout() {
  return (
    <main>
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/priest.jpg')`,
        }}
      >
        <div className="mt-[28rem]">
          <RainbowKitCustomConnectButton />
        </div>
      </div>
    </main>
  );
}
