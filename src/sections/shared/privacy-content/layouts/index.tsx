import { useDealerContext } from "@core-dir/dealer-provider";

export default function PrivacyContentOne() {
  const { dealerData } = useDealerContext();
  const dealerName = dealerData?.CompanyName || "our dealership";
  const dealerEmail = dealerData?.Email || "contact@dealership.com";

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <div className="space-y-8">
          {/* Introduction */}
          <div>
            <p className="text-lg leading-relaxed">
              At {dealerName}, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or engage with our
              services.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              By using our website or services, you consent to the data
              practices described in this policy.
            </p>
          </div>

          {/* Information We Collect */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Personal Information
            </h3>
            <p className="leading-relaxed">
              We may collect personal information that you voluntarily provide
              to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Request information about our vehicles or services</li>
              <li>Book a test drive or appointment</li>
              <li>Apply for vehicle financing</li>
              <li>Make a purchase or reservation</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us via phone, email, or contact forms</li>
            </ul>
            <p className="leading-relaxed mt-4">
              This information may include: name, email address, phone number,
              postal address, date of birth, driver's license information,
              financial information for credit applications, and vehicle
              preferences.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Automatically Collected Information
            </h3>
            <p className="leading-relaxed">
              When you visit our website, we may automatically collect certain
              information about your device, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>IP address and browser type</li>
              <li>Operating system and device information</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website addresses</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              2. How We Use Your Information
            </h2>
            <p className="leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Process your requests, bookings, and transactions</li>
              <li>
                Communicate with you about our vehicles, services, and
                promotions
              </li>
              <li>Process financing applications and conduct credit checks</li>
              <li>Improve our website, products, and services</li>
              <li>Personalize your experience on our website</li>
              <li>Analyze usage patterns and trends</li>
              <li>Comply with legal obligations and prevent fraud</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </div>

          {/* Information Sharing */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              3. How We Share Your Information
            </h2>
            <p className="leading-relaxed">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong>Service Providers:</strong> Third-party companies that
                help us operate our business (e.g., payment processors,
                financing partners, warranty providers, IT services)
              </li>
              <li>
                <strong>Business Partners:</strong> Manufacturers, lenders, and
                insurance companies involved in your transaction
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court
                order, or government regulations
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of assets
              </li>
            </ul>
            <p className="leading-relaxed mt-4">
              We do not sell your personal information to third parties for
              their marketing purposes.
            </p>
          </div>

          {/* Cookies and Tracking */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              4. Cookies and Tracking Technologies
            </h2>
            <p className="leading-relaxed">
              We use cookies and similar tracking technologies to enhance your
              browsing experience, analyze website traffic, and understand user
              preferences. You can control cookies through your browser
              settings, but disabling cookies may limit certain features of our
              website.
            </p>
          </div>

          {/* Data Security */}
          <div>
            <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational security
              measures to protect your personal information from unauthorized
              access, disclosure, alteration, or destruction. However, no method
              of transmission over the internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              6. Your Rights and Choices
            </h2>
            <p className="leading-relaxed">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Access and receive a copy of your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing (where applicable)</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="leading-relaxed mt-4">
              To exercise these rights, please contact us at {dealerEmail}.
            </p>
          </div>

          {/* Data Retention */}
          <div>
            <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
            <p className="leading-relaxed">
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law.
            </p>
          </div>

          {/* Third-Party Links */}
          <div>
            <h2 className="text-2xl font-bold mb-4">8. Third-Party Websites</h2>
            <p className="leading-relaxed">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these external
              sites. We encourage you to review their privacy policies before
              providing any personal information.
            </p>
          </div>

          {/* Children's Privacy */}
          <div>
            <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
            <p className="leading-relaxed">
              Our services are not intended for individuals under the age of 18.
              We do not knowingly collect personal information from children. If
              you believe we have collected information from a child, please
              contact us immediately.
            </p>
          </div>

          {/* Changes to Policy */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              10. Changes to This Privacy Policy
            </h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. We will notify you
              of any significant changes by posting the updated policy on our
              website with a revised effective date.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-18 bg-gray-50 rounded-lg">
              <p className="font-semibold">{dealerName}</p>
              <p>{dealerData.FullAddress}</p>
              {dealerData?.Phone && <p>Phone: {dealerData.Phone}</p>}
            </div>
          </div>

          {/* Effective Date */}
          <div className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-600">
              <strong>Last Updated:</strong> December 5, 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
