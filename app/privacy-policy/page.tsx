import MainLayout from "../components/MainLayout";

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl rounded-lg bg-white px-4 py-8 shadow-sm dark:bg-gray-900">
        <h1 className="mb-8 border-b-2 border-blue-200 pb-4 text-4xl font-extrabold tracking-tight text-blue-700 dark:border-blue-800 dark:text-blue-400">
          Privacy Policy
        </h1>

        <div className="prose prose-blue dark:prose-invert max-w-none">
          <p className="lead mb-8 text-lg font-medium text-gray-700 dark:text-gray-300">
            BlueFish provides wallet functionalities, token swaps, secure
            messaging (1:1 and group chats), token airdrops, and community
            advertising services
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            Introduction
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Welcome to BlueFish, a next-generation blockchain wallet and
            decentralized communication platform. BlueFish provides wallet
            functionalities, token swaps, secure messaging (1:1 and group
            chats), token airdrops, and community advertising services. Your
            privacy is important to us, and we are committed to processing your
            personal information responsibly and in compliance with applicable
            global laws and regulations, including but not limited to:
          </p>

          <ul className="my-4 list-disc space-y-2 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              General Data Protection Regulation (GDPR) (EU)
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              California Consumer Privacy Act (CCPA) & California Privacy Rights
              Act (CPRA) (USA)
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              California Consumer Privacy Act (CCPA) & California Privacy Rights
              Act (CPRA) (USA)
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Personal Data Protection Act (PDPA) (Singapore)
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Personal Information Protection Law (PIPL) (China)
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              Act on the Protection of Personal Information (APPI) (Japan)
            </li>
          </ul>

          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            By using BlueFish and its services, you acknowledge that you have
            read and understood this Privacy Policy. If you do not agree with
            any part of this Privacy Policy, you should not access or use
            BlueFish services. If you have any questions or concerns, you can
            contact us at cs@blockify.it.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            1. Our Relationship With You
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            BlueFish operates as a non-custodial wallet service, meaning we do
            not store or manage private keys on behalf of users. Users are
            solely responsible for managing their private keys and seed phrases.
            BlueFish serves as a data controller only for the limited personal
            information collected through its applications, websites, and
            services.
          </p>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            When interacting with third-party services (e.g., decentralized
            applications, advertisements, or payment providers), those services
            act as independent data controllers and their respective privacy
            policies apply. BlueFish does not control how these third parties
            process personal data.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            2. Personal Information We Collect
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We collect personal information necessary to provide our services
            and enhance user experience. This includes:
          </p>

          <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            2.1 Information You Provide to Us
          </h3>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Account and Profile Information:
              </strong>{" "}
              Username, email address (if applicable), and contact details (if
              provided for support).
            </li>
            <li>
              <strong>Wallet Information:</strong> Wallet addresses are
              processed for transactions but private keys are never stored or
              accessed by BlueFish.
            </li>
            <li>
              <strong>Messages and Chats:</strong> End-to-end encrypted messages
              for security, with no retention after delivery.
            </li>
            <li>
              <strong>Airdrop Participation:</strong> Eligibility data and
              transaction history related to token airdrops.
            </li>
            <li>
              <strong>Community Advertising Data:</strong> Engagement metrics
              for advertising interactions.
            </li>
            <li>
              <strong>Support Requests:</strong> Inquiry details and contact
              information provided for customer support.
            </li>
          </ul>

          <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            2.2 information Collected Automatically
          </h3>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Device and Usage Information:
              </strong>{" "}
              Includes IP address, device type, OS, browser type, and app usage
              data.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Cookies and Tracking Technologies:
              </strong>{" "}
              Used for user experience improvements and traffic analysis (see
              Section 9 for details).
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Location Information:
              </strong>{" "}
              General location inferred from IP addresses to enhance services
              and comply with regulations.
            </li>
          </ul>

          <div className="my-8 border-t border-gray-200 dark:border-gray-700"></div>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            3. Legal Basis for Processing Personal Information
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We process your personal information under the following legal
            bases:
          </p>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Contractual Necessity:
              </strong>{" "}
              To provide you with BlueFish services as per our terms and
              conditions.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Legitimate Interests:
              </strong>{" "}
              For fraud prevention, security, and improving user experience.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Legal Obligation:
              </strong>{" "}
              To comply with regulatory requirements where applicable.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Consent:
              </strong>{" "}
              For marketing communications and optional data collection (you may
              withdraw consent at any time).
            </li>
          </ul>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            4. How We Use the Personal Information We Collect
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We use your personal information for the following purposes:
          </p>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Providing and maintaining services:
              </strong>{" "}
              Facilitating transactions, swaps, messaging, and community
              interactions.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Security and fraud prevention:
              </strong>{" "}
              Protecting accounts, preventing unauthorized access, and
              mitigating fraudulent activities.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Improving user experience:
              </strong>{" "}
              Personalizing services and recommending relevant features.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Regulatory compliance:
              </strong>{" "}
              Where applicable, ensuring compliance with local legal
              requirements.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Marketing and engagement:
              </strong>{" "}
              Sending promotional content (with opt-out options available).
            </li>
          </ul>

          <div className="my-8 border-t border-gray-200 dark:border-gray-700"></div>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            5. Data Storage and Retention Policy
          </h2>
          <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            5.1 Data Storage
          </h3>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Default Storage Location:
              </strong>{" "}
              BlueFish utilizes Amazon Web Services (AWS) for primary data
              storage.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                China Users:
              </strong>{" "}
              In compliance with PIPL (China Personal Information Protection
              Law), personal data of users located in China will be stored in
              China-based cloud infrastructure suitable for service delivery.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Other Regions:
              </strong>{" "}
              Data may be stored in cloud infrastructure appropriate for the
              service region, ensuring compliance with local data protection
              laws.
            </li>
          </ul>

          <h3 className="mt-6 mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
            5.2 Data Retention
          </h3>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Account Information:
              </strong>{" "}
              Retained for as long as your account is active. Deleted within 30
              days upon request.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Transaction Records:
              </strong>{" "}
              Retained for 5 years to comply with financial regulations (if
              applicable).
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Customer Support Data:
              </strong>{" "}
              Retained for 1 year to resolve disputes and improve service.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Cookies & Tracking Data:
              </strong>{" "}
              See Section 9 for details on storage duration and opt-out options.
            </li>
          </ul>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            6. Data Breach Notification
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            If a data breach occurs that affects your personal information,
            BlueFish will notify affected users and relevant regulatory
            authorities within 72 hours of discovering the breach, in compliance
            with GDPR, CCPA, and other applicable laws.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            7. User Rights and Data Requests
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            Users can exercise their rights under applicable privacy laws by
            contacting cs@blockify.it. Requests will be processed within 30 days
            unless an extension is required by law.
          </p>

          <div className="my-8 border-t border-gray-200 dark:border-gray-700"></div>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            8. Advertising & Third-Party Data Processing
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">
              No Direct Data Sharing with Advertisers:
            </strong>{" "}
            BlueFish does not share personal data directly with advertisers. All
            ad interactions are processed using anonymized and aggregated data.
          </p>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-white">
              Third-Party Services:
            </strong>{" "}
            Users who engage with third-party services (e.g., DApps, external
            advertisements) acknowledge that their data may be subject to the
            third party&apos;s privacy policy.
          </p>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            9. Cookies and Tracking Technologies
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We use cookies and similar technologies for analytics and service
            improvements:
          </p>
          <ul className="my-4 list-disc space-y-3 pl-5">
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Essential Cookies:
              </strong>{" "}
              Required for core functionality (cannot be disabled).
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Performance Cookies:
              </strong>{" "}
              Used for analytics (opt-out available via browser settings or
              [Insert Link]).
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">
                Marketing Cookies:
              </strong>{" "}
              Used for advertising (opt-out available via [Insert Link] or
              Global Privacy Control (GPC)).
            </li>
          </ul>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            10. Terms of Service Linkage
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            This Privacy Policy is incorporated into and forms part of the
            BlueFish Terms of Service. Users should review both policies to
            understand their rights and obligations.
          </p>

          <div className="my-8 border-t border-gray-200 dark:border-gray-700"></div>

          <h2 className="mt-10 mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
            11. Contact Us
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            For any privacy-related inquiries, contact us at:
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
            By continuing to use BlueFish, you acknowledge and agree to this
            Privacy Policy.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
