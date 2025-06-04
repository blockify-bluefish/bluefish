import MainLayout from "../components/MainLayout";

export default function TermsOfService() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl rounded-lg bg-white px-4 py-8 shadow-sm dark:bg-gray-900">
        <h1 className="mb-8 border-b-2 border-blue-200 pb-4 text-4xl font-extrabold tracking-tight text-blue-700 dark:border-blue-800 dark:text-blue-400">
          Terms of Service
        </h1>

        <div className="prose prose-blue dark:prose-invert max-w-none">
          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            Introduction
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Welcome to BlueFish! BlueFish is a Web3 community and asset
            management platform that allows users to manage their crypto assets,
            swap tokens, engage in Web3 communities, and participate in
            mission-based airdrops.
          </p>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            By accessing or using the BlueFish application, website, or services
            (&quot;Services&quot;), you agree to these Terms of Service
            (&quot;Terms&quot;). If you do not agree with these Terms, do not
            use BlueFish.
          </p>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            If you have any questions, please contact us at cs@blockify.it.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            1. Eligibility
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            To use BlueFish, you must:
          </p>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              Be at least 18 years old (or the legal age in your jurisdiction).
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Not be located in sanctioned countries or regions restricted by
              international laws.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Not be barred from using Web3 services under applicable
              regulations.
            </li>
          </ul>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            2. Non-Custodial & User Responsibility
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">
              You Own Your Assets & Private Keys
            </strong>{" "}
            BlueFish is a non-custodial wallet and platform. This means:
          </p>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              We do not store or control your private keys.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              You are fully responsible for your assets and transactions.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Lost private keys cannot be recovered by BlueFish.
            </li>
          </ul>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">
              No Liability for Losses
            </strong>{" "}
            Since BlueFish does not hold user funds, we are not responsible for
            any asset loss, theft, or transaction errors.
          </p>

          <div className="my-8 border-t border-gray-200 dark:border-gray-700"></div>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            3. Account & Security
          </h2>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Account Registration:
              </strong>{" "}
              Some features may require a verified account (e.g., for advanced
              Web3 integrations).
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Security Measures:
              </strong>{" "}
              You are responsible for securing your login credentials, wallet
              seed phrases, and private keys.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Unauthorized Access:
              </strong>{" "}
              If you suspect unauthorized activity, you must notify us
              immediately.
            </li>
          </ul>
          <p className="mb-4 rounded border-l-4 border-yellow-500 bg-yellow-50 p-4 leading-relaxed text-gray-700 dark:bg-yellow-900/30 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">
              Important:
            </strong>{" "}
            BlueFish will never ask for your private key or seed phrase. Be
            cautious of phishing attempts!
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            4. Permitted & Prohibited Uses
          </h2>
          <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            4.1 Permitted Uses:
          </h3>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              Using BlueFish for personal and legal Web3 activities.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Engaging in token swaps, airdrops, and decentralized social
              interactions.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Participating in community-driven initiatives.
            </li>
          </ul>

          <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            4.2 Prohibited Uses:
          </h3>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              Engaging in fraud, hacking, or illegal transactions.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Using BlueFish for money laundering or financial crimes.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Attempting to reverse-engineer, tamper, or exploit BlueFish
              systems.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Impersonating other users or violating privacy policies.
            </li>
          </ul>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Violation of these rules may result in immediate account
            termination.
          </p>

          <div className="my-8 border-t border-gray-200 dark:border-gray-700"></div>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            5. Token Swaps & Airdrops
          </h2>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">Swaps:</strong>{" "}
              BlueFish aggregates decentralized exchanges (DEXs) to provide the
              best rates. Transactions are final and non-reversible.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Airdrops:
              </strong>{" "}
              Users may participate in mission-based airdrops, but rewards are
              not guaranteed.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Smart Contract Risks:
              </strong>{" "}
              Users acknowledge the risks involved with smart contract
              interactions, including price slippage, liquidity shortages, and
              transaction failures. BlueFish is not responsible for losses due
              to smart contract vulnerabilities.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Service Outages & Network Failures:
              </strong>{" "}
              BlueFish does not guarantee uninterrupted service, and we are not
              responsible for network congestion, blockchain forks, or external
              service failures that may affect transactions.
            </li>
          </ul>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            6. Fees & Payments
          </h2>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              BlueFish does not charge hidden fees.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Gas fees apply for blockchain transactions and are determined by
              network conditions.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Third-party services may have separate fees.
            </li>
          </ul>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            7. Third-Party Services & DApps
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            BlueFish integrates with third-party services and DApps. When using
            them:
          </p>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              You are bound by their terms & policies.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              BlueFish is not responsible for third-party failures, losses, or
              security breaches.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Users are responsible for reviewing and accepting the privacy
              policies and terms of any third-party services they interact with.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              BlueFish does not endorse or guarantee the security of any
              third-party services.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Users acknowledge that third-party services may carry risks,
              including data loss, security vulnerabilities, and smart contract
              failures. BlueFish holds no liability for damages resulting from
              third-party service interactions.
            </li>
          </ul>

          <div className="my-8 border-t border-gray-200 dark:border-gray-700"></div>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            8. Privacy & Data Protection
          </h2>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              BlueFish values privacy and follows global data protection laws
              (GDPR, CCPA, PIPL, etc.).
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              We do not store private keys.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              We do not sell user data.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Users can manage data settings in-app.
            </li>
          </ul>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            See our{" "}
            <a
              href="/privacy-policy"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              BlueFish Privacy Policy
            </a>{" "}
            for full details.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            9. KYC/AML Compliance
          </h2>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              BlueFish currently does not require KYC (Know Your Customer)
              verification, but certain services may require identity
              verification in the future due to legal or regulatory changes.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Users agree to comply with applicable laws, and BlueFish may
              implement KYC/AML requirements if necessary.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              If KYC is introduced, personal data will only be used for
              compliance purposes and will not be shared with third parties
              beyond legal obligations.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Users have the right to refuse KYC verification; however, certain
              services may become unavailable if verification is declined.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              If a regulatory change results in access restrictions for certain
              jurisdictions, BlueFish reserves the right to suspend or restrict
              access to affected users.
            </li>
          </ul>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            10. Service Modifications & Termination
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            BlueFish may modify, discontinue, or terminate services at any time.
            In case of service termination, we will provide at least 30
            days&apos; notice to users via email, app notifications, or website
            announcements.
          </p>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Users are responsible for backing up their wallet information and
            transaction data before service termination. BlueFish is not liable
            for data loss after service discontinuation.
          </p>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Upon termination, users will be provided with an option to download
            their transaction data and, where applicable, request data migration
            to another service.
          </p>

          <div className="my-8 border-t border-gray-200 dark:border-gray-700"></div>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            11. Governing Law & Dispute Resolution
          </h2>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              These Terms are governed by the laws of Vietnam.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              All disputes shall be resolved through binding arbitration under
              the rules of the International Chamber of Commerce (ICC).
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Users waive the right to class action lawsuits or jury trials.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              BlueFish is not liable for legal disputes arising from regulatory
              changes in a user&apos;s jurisdiction.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              If regulatory changes impose new restrictions on Web3 services,
              BlueFish may modify its services accordingly without liability to
              affected users.
            </li>
          </ul>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            12. Contact Us
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            For any inquiries regarding these Terms, reach out to:
          </p>
          <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="mt-2">
              <strong className="text-blue-600 dark:text-blue-400">
                Email:
              </strong>{" "}
              cs@blockify.it
            </p>
            <p className="mt-2">
              <strong className="text-blue-600 dark:text-blue-400">
                Address:
              </strong>{" "}
              46, Ta Hien Street, Thanh My Loi Ward, Thu Duc City, Ho Chi Minh
            </p>
          </div>

          <p className="mt-10 rounded border-l-4 border-blue-500 bg-blue-50 p-4 text-lg font-bold dark:bg-blue-900/30">
            By using BlueFish, you agree to these Terms of Service. If you do
            not agree, please discontinue use immediately.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
