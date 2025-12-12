import { useDealerContext } from "@core-dir/dealer-provider";

export default function TermsContentOne() {
  const { dealerData } = useDealerContext();
  const dealerName = dealerData?.CompanyName || "our dealership";

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <div className="space-y-8">
          {/* Introduction */}
          <div>
            <p className="text-lg leading-relaxed">
              Welcome to {dealerName}. These Terms of Service ("Terms") govern
              your use of our website and services. By accessing or using our
              website, you agree to be bound by these Terms. If you do not agree
              with any part of these Terms, please do not use our services.
            </p>
          </div>

          {/* Definitions */}
          <div>
            <h2 className="text-2xl font-bold mb-4">1. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>"We," "Us," "Our"</strong> refers to {dealerName}
              </li>
              <li>
                <strong>"You," "Your"</strong> refers to the user of our website
                or services
              </li>
              <li>
                <strong>"Website"</strong> refers to our online platform and all
                related services
              </li>
              <li>
                <strong>"Services"</strong> includes vehicle sales, financing,
                warranty, and related offerings
              </li>
              <li>
                <strong>"Vehicle"</strong> refers to any automobile listed for
                sale on our website
              </li>
            </ul>
          </div>

          {/* Use of Website */}
          <div>
            <h2 className="text-2xl font-bold mb-4">2. Use of Website</h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">Acceptable Use</h3>
            <p className="leading-relaxed">
              You agree to use our website only for lawful purposes and in
              accordance with these Terms. You must not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                Use the website in any way that violates applicable laws or
                regulations
              </li>
              <li>Engage in any fraudulent, abusive, or harmful activities</li>
              <li>
                Attempt to gain unauthorized access to our systems or networks
              </li>
              <li>Interfere with or disrupt the website's operation</li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Scrape, copy, or redistribute content without permission</li>
              <li>Impersonate any person or entity</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Account Registration
            </h3>
            <p className="leading-relaxed">
              Some features may require you to create an account. You are
              responsible for maintaining the confidentiality of your account
              credentials and for all activities under your account. You must
              provide accurate and complete information and keep it updated.
            </p>
          </div>

          {/* Vehicle Information and Pricing */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              3. Vehicle Information and Pricing
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Accuracy of Information
            </h3>
            <p className="leading-relaxed">
              We strive to provide accurate information about our vehicles,
              including specifications, features, pricing, and availability.
              However, errors may occur. We reserve the right to correct any
              errors and update information without prior notice.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Pricing</h3>
            <p className="leading-relaxed">
              All prices displayed on our website are subject to change without
              notice. Prices do not include additional costs such as taxes,
              registration fees, documentation fees, or optional extras unless
              explicitly stated. The final price will be confirmed at the time
              of purchase.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Vehicle Availability
            </h3>
            <p className="leading-relaxed">
              Vehicle availability is subject to prior sale. We make every
              effort to keep our inventory current, but vehicles may be sold
              before the website is updated. Viewing or reserving a vehicle does
              not guarantee its availability.
            </p>
          </div>

          {/* Vehicle Purchase and Sales */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              4. Vehicle Purchase and Sales
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Purchase Agreement
            </h3>
            <p className="leading-relaxed">
              Any vehicle purchase is subject to a separate purchase agreement.
              Making an inquiry or reservation through our website does not
              constitute a binding contract. A contract is formed only when both
              parties sign a formal purchase agreement.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Deposits and Reservations
            </h3>
            <p className="leading-relaxed">
              Deposits may be required to reserve a vehicle. Deposit terms,
              including refund policies, will be communicated at the time of
              reservation. Deposits are typically non-refundable unless
              otherwise agreed in writing.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Vehicle Inspection
            </h3>
            <p className="leading-relaxed">
              We encourage you to inspect any vehicle before purchase. Vehicles
              are sold "as is" unless covered by a warranty. You are responsible
              for conducting your own inspection and due diligence.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Test Drives</h3>
            <p className="leading-relaxed">
              Test drives are available by appointment and subject to
              availability. You must have a valid driver's license and
              appropriate insurance. You accept full responsibility for any
              damage during the test drive.
            </p>
          </div>

          {/* Financing */}
          <div>
            <h2 className="text-2xl font-bold mb-4">5. Financing Services</h2>
            <p className="leading-relaxed">
              We offer financing options through third-party lenders. Financing
              is subject to credit approval and lender terms. We act as a credit
              broker and not a lender. Finance applications are processed in
              accordance with applicable regulations, including FCA requirements
              where applicable.
            </p>
            <p className="leading-relaxed mt-4">
              Interest rates, terms, and monthly payments will be disclosed
              before you enter into a finance agreement. You are responsible for
              making all payments as agreed with the lender.
            </p>
          </div>

          {/* Warranties */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              6. Warranties and After-Sales
            </h2>

            <h3 className="text-xl font-semibold mb-3 mt-6">
              Warranty Coverage
            </h3>
            <p className="leading-relaxed">
              Warranty terms, if applicable, will be provided at the time of
              purchase. Warranties are subject to specific terms and conditions,
              including coverage limits, exclusions, and maintenance
              requirements.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Consumer Rights</h3>
            <p className="leading-relaxed">
              Nothing in these Terms affects your statutory rights as a consumer
              under applicable law, including rights under the Consumer Rights
              Act 2015 (UK) or equivalent legislation in your jurisdiction.
            </p>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              7. Intellectual Property
            </h2>
            <p className="leading-relaxed">
              All content on our website, including text, images, logos,
              graphics, videos, and software, is owned by us or our licensors
              and protected by copyright, trademark, and other intellectual
              property laws. You may not reproduce, distribute, modify, or
              create derivative works without our written permission.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              8. Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              To the fullest extent permitted by law:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                We are not liable for any indirect, incidental, special, or
                consequential damages
              </li>
              <li>
                We do not guarantee uninterrupted or error-free website
                operation
              </li>
              <li>
                We are not responsible for third-party content or services
              </li>
              <li>
                Our total liability for any claim shall not exceed the amount
                you paid to us
              </li>
            </ul>
            <p className="leading-relaxed mt-4">
              This limitation does not apply to liability that cannot be
              excluded by law, such as death or personal injury caused by
              negligence.
            </p>
          </div>

          {/* Indemnification */}
          <div>
            <h2 className="text-2xl font-bold mb-4">9. Indemnification</h2>
            <p className="leading-relaxed">
              You agree to indemnify and hold harmless {dealerName}, its
              affiliates, and their respective officers, directors, employees,
              and agents from any claims, damages, losses, or expenses arising
              from your use of our website or violation of these Terms.
            </p>
          </div>

          {/* Third-Party Services */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              10. Third-Party Services
            </h2>
            <p className="leading-relaxed">
              Our website may include links to third-party websites or services
              (such as financing partners, warranty providers, or social media
              platforms). We are not responsible for their content, policies, or
              practices. Your use of third-party services is at your own risk.
            </p>
          </div>

          {/* Privacy */}
          <div>
            <h2 className="text-2xl font-bold mb-4">11. Privacy</h2>
            <p className="leading-relaxed">
              Your use of our website is subject to our Privacy Policy, which
              describes how we collect, use, and protect your personal
              information. By using our services, you consent to our data
              practices as described in the Privacy Policy.
            </p>
          </div>

          {/* Changes to Terms */}
          <div>
            <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes
              will be effective immediately upon posting on our website. Your
              continued use of the website after changes are posted constitutes
              acceptance of the modified Terms.
            </p>
          </div>

          {/* Termination */}
          <div>
            <h2 className="text-2xl font-bold mb-4">13. Termination</h2>
            <p className="leading-relaxed">
              We may suspend or terminate your access to our website at any
              time, without notice, for conduct that we believe violates these
              Terms or is harmful to our business, other users, or third
              parties.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              14. Governing Law and Jurisdiction
            </h2>
            <p className="leading-relaxed">
              These Terms are governed by and construed in accordance with the
              laws of England and Wales. Any disputes arising from these Terms
              or your use of our services shall be subject to the exclusive
              jurisdiction of the courts of England and Wales.
            </p>
          </div>

          {/* Severability */}
          <div>
            <h2 className="text-2xl font-bold mb-4">15. Severability</h2>
            <p className="leading-relaxed">
              If any provision of these Terms is found to be invalid or
              unenforceable, the remaining provisions will continue in full
              force and effect.
            </p>
          </div>

          {/* Entire Agreement */}
          <div>
            <h2 className="text-2xl font-bold mb-4">16. Entire Agreement</h2>
            <p className="leading-relaxed">
              These Terms, together with our Privacy Policy and any purchase
              agreement, constitute the entire agreement between you and{" "}
              {dealerName} regarding the use of our website and services.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-4">17. Contact Information</h2>
            <p className="leading-relaxed">
              If you have any questions or concerns about these Terms of
              Service, please contact us:
            </p>
            <div className="mt-18 bg-gray-50 rounded-lg">
              <p className="font-semibold">{dealerName}</p>
              <p>{dealerData.FullAddress}</p>
              {dealerData?.ContactInfo?.PhoneNumber && (
                <p>Phone: {dealerData.ContactInfo.PhoneNumber}</p>
              )}
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
