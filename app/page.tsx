import MainLayout from "./components/MainLayout";

export default function Home() {
  const features = [
    {
      title: "Full Ownership & Privacy:",
      description:
        "Your private keys stay on your device. BlueFish never stores or has access to your sensitive information.",
    },
    {
      title: "Multi-Chain Support:",
      description:
        "Easily manage Bitcoin, Ethereum, Solana, and many other major blockchains. All your tokens and NFTs in one place.",
    },
    {
      title: "Instant Transfers:",
      description:
        "Send and receive crypto securely with fast, reliable transactions. Just scan a QR code or share your address.",
    },
    {
      title: "Secure Wallet Creation:",
      description:
        "Create a new wallet or import with your secret recovery phrase. Backup and restore with ease.",
    },
    {
      title: "Built-in Contacts & Chat:",
      description:
        "Connect, chat, and transact directly with your friends—all inside BlueFish.",
    },
    {
      title: "Advanced Security:",
      description:
        "Protect your assets with device-level encryption and optional biometric authentication.",
    },
    {
      title: "No Ads, No Trackers, No Bullshit:",
      description: "100% open-source, privacy-first. Your data belongs to YOU.",
    },
  ];

  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl rounded-lg bg-white px-4 py-8 shadow-sm dark:bg-gray-900">
        <h1 className="mb-8 border-b-2 border-blue-200 pb-4 text-4xl font-extrabold tracking-tight text-blue-700 dark:border-blue-800 dark:text-blue-400">
          BlueFish Wallet
        </h1>

        <div className="prose prose-blue dark:prose-invert max-w-none">
          <p className="lead mb-8 text-lg font-medium text-gray-700 dark:text-gray-300">
            Your Secure Gateway to Web3 — Take full control of your digital
            assets and web3 experience
          </p>

          <div className="mb-10 rounded-xl bg-blue-50 p-6 dark:bg-blue-900/30">
            <h2 className="mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
              Non-custodial, Open-source Crypto Wallet
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              BlueFish Wallet is a non-custodial, open-source crypto wallet,
              designed to help you take full control of your digital assets and
              web3 experience.
            </p>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              Seamlessly manage, send, receive, and swap a wide range of tokens
              across multiple blockchains—all in one intuitive app.
            </p>
          </div>

          <h2 className="mt-10 mb-6 text-2xl font-bold text-blue-600 dark:text-blue-300">
            🔒 Key Features
          </h2>

          <ul className="space-y-6">
            {features.map((feature, index) => (
              <li
                key={index}
                className="rounded-lg bg-gray-50 p-4 shadow-sm dark:bg-gray-800/50"
              >
                <div className="flex items-start">
                  <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-lg text-blue-500 dark:bg-blue-900/50 dark:text-blue-300">
                    {index + 1}
                  </span>
                  <div>
                    <span className="mb-1 block font-bold text-blue-600 dark:text-blue-300">
                      {feature.title}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature.description}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-lg border border-blue-200 bg-white p-6 text-center dark:border-blue-800 dark:bg-gray-800">
            <p className="mb-4 text-lg font-medium text-gray-800 dark:text-gray-200">
              Ready to take control of your crypto?
            </p>
            <a
              href="#download"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Download BlueFish Wallet
            </a>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Available for iOS, Android, and desktop
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
