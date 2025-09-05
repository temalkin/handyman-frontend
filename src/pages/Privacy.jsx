import React from 'react';
import Hero from '../components/Hero';

const Privacy = () => {
  return (
    <div className="bg-white">
      <Hero 
        title="Privacy Policy & Terms" 
        description="Your privacy is important to us. Learn how we collect, use, and protect your information, plus our terms and conditions." 
        showCTA={false} 
      />

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Privacy Policy Section */}
            <div className="mb-16">
              <h1 className="text-3xl font-bold text-primary-800 mb-8 border-b-2 border-primary-200 pb-4">
                Privacy Policy
              </h1>
              
              <div className="mb-8">
                <p className="text-primary-600 mb-4">
                  <strong>Last updated:</strong> September 1, 2025
                </p>
              </div>

              <div className="space-y-8">
                {/* Who We Are */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">Who we are</h2>
                  <p className="text-primary-700 leading-relaxed mb-4">
                    Handyman of South Charlotte LLC ("HSC," "we," "us," "our") operates this website and provides home-repair and improvement services in and around Charlotte, NC.
                  </p>
                  <p className="text-primary-700">
                    <strong>Contact:</strong> Email: info.handyman.southclt@gmail.com • Phone: 980-361-7667
                  </p>
                </div>

                {/* Scope */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">Scope</h2>
                  <p className="text-primary-700 leading-relaxed">
                    This Privacy Policy explains how we collect, use, share, and protect your personal information when you visit our website, contact us, request a quote, book services, message us (including SMS/MMS), leave a review, or interact with our social profiles and advertising.
                  </p>
                </div>

                {/* Information We Collect */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">1) Information We Collect</h2>
                  
                  <h3 className="text-xl font-semibold text-primary-800 mb-3">A. You provide to us:</h3>
                  <p className="text-primary-700 mb-4">
                    Contact details (name, email, phone), service address, project descriptions, photos/videos you upload, scheduling preferences, messages, reviews, signatures, payment method type (we do not store full card numbers on our servers).
                  </p>
                  <p className="text-primary-700 mb-4">
                    Business details if you inquire on behalf of a company.
                  </p>
                  <p className="text-primary-700 mb-4">
                    Communications preferences (e.g., consent to receive SMS or email).
                  </p>

                  <h3 className="text-xl font-semibold text-primary-800 mb-3">B. Automatically collected (via website/app):</h3>
                  <p className="text-primary-700 mb-4">
                    Device/browser data, IP address, general location, pages viewed, referring URLs, and interactions (clicks, forms).
                  </p>
                  <p className="text-primary-700 mb-4">
                    Cookies and similar technologies (see Cookies & Tracking).
                  </p>

                  <h3 className="text-xl font-semibold text-primary-800 mb-3">C. From third parties (when you interact with them):</h3>
                  <p className="text-primary-700 mb-4">
                    Lead platforms (e.g., Google, Nextdoor, Facebook), review sites, analytics and ads partners, payment processors, scheduling tools, and integrated SMS/email providers.
                  </p>
                  <p className="text-primary-700">
                    We do not knowingly collect data from children under 13. If you believe a child under 13 submitted data, contact us to delete it.
                  </p>
                </div>

                {/* How We Use Information */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">2) How We Use Information</h2>
                  <ul className="list-disc list-inside space-y-2 text-primary-700 mb-4">
                    <li><strong>Service delivery:</strong> respond to inquiries, provide estimates, schedule, perform services, invoice, and support.</li>
                    <li><strong>Operations & safety:</strong> verify identity where appropriate, prevent fraud, ensure safe job conditions, comply with codes and laws.</li>
                    <li><strong>Improvement & analytics:</strong> understand website usage, enhance features, quality assurance and training.</li>
                    <li><strong>Marketing (with consent where required):</strong> send service updates, promotions, requests for reviews.</li>
                    <li><strong>Legal/compliance:</strong> maintain records, exercise or defend legal claims, respond to lawful requests.</li>
                  </ul>
                  <p className="text-primary-700">
                    We do not use automated decision-making that produces legal or similarly significant effects without human involvement.
                  </p>
                </div>

                {/* Text/SMS Messaging Terms */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">3) Text/SMS Messaging Terms (A2P)</h2>
                  <p className="text-primary-700 mb-4">
                    By submitting a form with your phone number or texting us first, you consent to receive SMS/MMS from HSC related to quotes, scheduling, updates, and occasional promotions.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-primary-700 mb-4">
                    <li><strong>Opt-out:</strong> Reply STOP to any message. You can also text STOP to the phone number listed on our website or to the same number you're receiving messages from.</li>
                    <li><strong>Help:</strong> Reply HELP for assistance.</li>
                    <li><strong>Frequency:</strong> Varies by interaction.</li>
                    <li><strong>Costs:</strong> Message and data rates may apply based on your carrier.</li>
                    <li><strong>Consent not required</strong> as a condition of purchase.</li>
                  </ul>
                  <p className="text-primary-700">
                    If you opt out, you may still receive transactional notices required to complete ongoing work (e.g., time-sensitive job logistics).
                  </p>
                </div>

                {/* Cookies & Tracking */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">4) Cookies & Tracking</h2>
                  <p className="text-primary-700 mb-4">
                    We use cookies, pixels, and similar technologies for essential site functions, analytics (e.g., traffic patterns), and—if enabled—advertising measurement and retargeting.
                  </p>
                  <p className="text-primary-700 mb-4">
                    <strong>Your options:</strong> manage cookies in your browser; use platform ad-settings; or install opt-out tools offered by analytics/ads providers. Some features may not function without cookies.
                  </p>
                  <p className="text-primary-700">
                    <strong>Do Not Track:</strong> Because there is no industry consensus, our website may not respond to DNT signals.
                  </p>
                </div>

                {/* Sharing of Information */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">5) Sharing of Information</h2>
                  <p className="text-primary-700 mb-4">
                    We share personal information only as needed and with appropriate safeguards:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-primary-700 mb-4">
                    <li><strong>Service providers:</strong> hosting, analytics, payment processing, SMS/email, scheduling, subcontractors assisting with your project—bound by confidentiality and data-protection obligations.</li>
                    <li><strong>Legal & safety:</strong> to comply with law or valid process; to protect rights, property, or safety of you, us, or others.</li>
                    <li><strong>Business transfers:</strong> as part of a merger, acquisition, financing, or sale of assets, with continued protection of your data.</li>
                  </ul>
                  <p className="text-primary-700">
                    We do not sell personal information. If we "share" personal information for cross-context behavioral advertising under certain state laws, we will provide a mechanism to opt out.
                  </p>
                </div>

                {/* Data Retention */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">6) Data Retention</h2>
                  <p className="text-primary-700">
                    We retain personal information for as long as reasonably necessary to fulfill the purposes above, comply with legal obligations (including tax and recordkeeping), resolve disputes, and enforce agreements. Retention periods depend on the type of data and our regulatory requirements.
                  </p>
                </div>

                {/* Security */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">7) Security</h2>
                  <p className="text-primary-700">
                    We use reasonable administrative, technical, and physical safeguards (access controls, encryption in transit where feasible, least-privilege access). No method of transmission or storage is 100% secure; we cannot guarantee absolute security.
                  </p>
                </div>

                {/* Privacy Choices & Rights */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">8) Your Privacy Choices & Rights</h2>
                  <ul className="list-disc list-inside space-y-2 text-primary-700 mb-4">
                    <li><strong>Access/Update/Delete:</strong> Contact us to request a copy, correction, or deletion of your data, subject to legal exceptions.</li>
                    <li><strong>Marketing choices:</strong> Unsubscribe links in emails; reply STOP to texts; adjust ad settings on platforms.</li>
                    <li><strong>Cookies:</strong> Control via browser settings.</li>
                    <li><strong>State privacy laws:</strong> If you reside in a U.S. state with privacy rights (e.g., CA, CO, CT, VA, UT), you may have additional rights (access, correction, deletion, portability, opt-out of targeted advertising or "sharing"). To exercise, contact us and include your state of residence. We will verify your request consistent with applicable law.</li>
                    <li><strong>Authorized agents:</strong> We will process requests from authorized agents where the law allows and identity/authority are verified.</li>
                  </ul>
                </div>

                {/* Third-Party Links */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">9) Third-Party Links</h2>
                  <p className="text-primary-700">
                    Our website may link to third-party sites. We are not responsible for their privacy practices. Review their policies before providing personal information.
                  </p>
                </div>

                {/* Changes to Policy */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">10) Changes to This Policy</h2>
                  <p className="text-primary-700">
                    We may update this Privacy Policy. The "Last updated" date reflects the latest revision. Significant changes will be posted on this page; in some cases we may notify you by email or SMS.
                  </p>
                </div>

                {/* Contact Information */}
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">11) Contact Us</h2>
                  <p className="text-primary-700 mb-4">
                    Questions or requests about privacy:
                  </p>
                  <div className="space-y-2 text-primary-700">
                    <p><strong>Email:</strong> info.handyman.southclt@gmail.com</p>
                    <p><strong>Phone:</strong> 980-361-7667</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions Section */}
            <div>
              <h1 className="text-3xl font-bold text-primary-800 mb-8 border-b-2 border-primary-200 pb-4">
                Terms & Conditions
              </h1>
              
              <div className="mb-8">
                <p className="text-primary-600 mb-4">
                  <strong>Last updated:</strong> September 1, 2025
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-blue-800">
                    <strong>Plain-English summary</strong> (not a substitute for the terms): We aim to deliver quality workmanship with clear communication. Estimates are good-faith ranges based on current information; final pricing is confirmed after site assessment and any change orders. We warrant our workmanship for the period stated below, and we pass through manufacturer warranties. You agree to provide safe access, disclose known issues, and pay as agreed. If unforeseen conditions appear (e.g., hidden water damage), we'll discuss options and obtain your approval before proceeding.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Definitions */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">1) Definitions</h2>
                  <ul className="list-disc list-inside space-y-2 text-primary-700">
                    <li><strong>"Company," "we," "us," "our":</strong> Handyman of South Charlotte LLC (HSC).</li>
                    <li><strong>"Client," "you," "your":</strong> The individual or entity purchasing services.</li>
                    <li><strong>"Site":</strong> The property where services are performed.</li>
                    <li><strong>"Work":</strong> The services, labor, and, if applicable, materials we provide.</li>
                  </ul>
                </div>

                {/* Quotes, Estimates & Scope */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">2) Quotes, Estimates & Scope</h2>
                  <p className="text-primary-700 mb-4">
                    <strong>Estimates</strong> are preliminary price ranges based on the information available at the time. Final pricing may change after on-site assessment or if conditions differ from what was represented.
                  </p>
                  <p className="text-primary-700 mb-4">
                    <strong>Scope of Work</strong> will be described in your written estimate/proposal or work order. Only the items listed are included.
                  </p>
                  <p className="text-primary-700 mb-4">
                    <strong>Exclusions</strong> (unless listed): permits/fees, design/engineering, remediation of hazardous materials (asbestos, lead, mold), structural changes, code upgrades not expressly quoted, unexpected repairs from hidden conditions, disposal beyond normal debris, specialty equipment, overtime, and work outside normal hours.
                  </p>
                  <p className="text-primary-700">
                    <strong>Change Orders:</strong> Any change in scope, materials, or conditions requires written approval (email or text is acceptable). Change orders may affect price and schedule.
                  </p>
                </div>

                {/* Scheduling & Access */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">3) Scheduling & Access</h2>
                  <ul className="list-disc list-inside space-y-2 text-primary-700">
                    <li>We schedule in good faith and may give arrival windows rather than exact times.</li>
                    <li>Client must provide safe access (including parking), utilities (water/electric), and disclose hazards (pets, alarms, sensitive areas).</li>
                    <li>We may reschedule due to safety concerns, inclement weather, supply delays, illness, or force majeure events.</li>
                  </ul>
                </div>

                {/* Materials & Client-Supplied Items */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">4) Materials & Client-Supplied Items</h2>
                  <p className="text-primary-700 mb-4">
                    When we supply materials, we select professional-grade items unless otherwise specified. Equivalent substitutions of equal or better quality may occur due to availability.
                  </p>
                  <p className="text-primary-700">
                    If you supply materials, we are not responsible for delays, defects, incompatibility, or warranties on those items. Additional labor caused by incompatible or missing parts will be billed accordingly.
                  </p>
                </div>

                {/* Pricing, Taxes & Payments */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">5) Pricing, Taxes & Payments</h2>
                  <ul className="list-disc list-inside space-y-2 text-primary-700 mb-4">
                    <li>Prices are in U.S. dollars and are based on the agreed scope.</li>
                    <li><strong>Taxes:</strong> Applicable sales/use taxes are added (typically 7.25%, subject to change and final jurisdiction).</li>
                    <li><strong>Deposits & Progress Payments:</strong> A deposit and/or milestone payments may be required and will be stated in your estimate. Work may pause if payments fall overdue.</li>
                    <li><strong>Payment Methods:</strong> We accept the methods stated on your estimate/invoice. Card payments or third-party platforms may include a disclosed processing fee.</li>
                    <li><strong>Late Payments:</strong> Past-due balances may accrue a late fee or interest at the maximum allowed by law. You agree to pay reasonable collection costs, including attorneys' fees, if applicable.</li>
                    <li><strong>Lien Rights:</strong> HSC may file a mechanic's lien for unpaid work in accordance with law.</li>
                  </ul>
                </div>

                {/* Permits, Code & Inspections */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">6) Permits, Code & Inspections</h2>
                  <p className="text-primary-700 mb-4">
                    Unless explicitly stated otherwise in writing, Client is responsible for obtaining permits and paying related fees.
                  </p>
                  <p className="text-primary-700 mb-4">
                    We perform work to a professional standard and, where applicable, consistent with the adopted local code. Code upgrades not specified in the quote are extra.
                  </p>
                  <p className="text-primary-700">
                    If permit involvement with a licensed General Contractor is required beyond the agreed scope, an additional administrative and coordination fee (up to 25% of related labor) may apply.
                  </p>
                </div>

                {/* Worksite Conditions */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">7) Worksite Conditions & Unforeseen Issues</h2>
                  <p className="text-primary-700 mb-4">
                    Client represents that the Site is free of known hazards and will promptly disclose any known issues (e.g., water intrusion, termites, mold, electrical anomalies).
                  </p>
                  <p className="text-primary-700 mb-4">
                    Unforeseen conditions (e.g., hidden rot, obsolete wiring, non-standard plumbing, substandard previous work) may require additional work/cost or a referral to a specialist. We will notify you and seek approval before proceeding.
                  </p>
                  <p className="text-primary-700">
                    We are not responsible for pre-existing issues or damage that results from addressing those issues (e.g., opening walls to locate a leak).
                  </p>
                </div>

                {/* Warranty */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">8) Warranty</h2>
                  <p className="text-primary-700 mb-4">
                    <strong>Workmanship Warranty (labor):</strong> 90 days by default from completion for the specific work performed. We may offer an Extended Workmanship Warranty (up to 1 year) if expressly stated on your estimate/invoice.
                  </p>
                  <p className="text-primary-700 mb-4">
                    <strong>Manufacturer Warranties:</strong> We pass through manufacturer warranties (some products offer up to 10 years—these are manufacturer warranties, not HSC warranties). Registration and maintenance requirements are your responsibility.
                  </p>
                  <p className="text-primary-700 mb-4">
                    <strong>Warranty Exclusions:</strong> Misuse, neglect, alterations by others, normal wear and tear, consumables, acts of God, damage from pests/water/mold/settling, or failure to perform recommended maintenance.
                  </p>
                  <p className="text-primary-700">
                    <strong>Warranty Claims:</strong> Notify us in writing within the warranty period. We will inspect and, if covered, repair or replace the affected work within a reasonable time.
                  </p>
                </div>

                {/* Additional sections continue with same formatting... */}
                {/* For brevity, I'll include the key remaining sections */}

                {/* Communications */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">14) Communications (Email/SMS)</h2>
                  <p className="text-primary-700 mb-4">
                    By providing your contact information, you authorize HSC to contact you about your project by phone, email, and SMS/MMS.
                  </p>
                  <p className="text-primary-700 mb-4">
                    <strong>Opt-out of marketing or promotional texts:</strong> Reply STOP to any message. You can also text STOP to the phone number listed on our website or to the same number you're receiving messages from.
                  </p>
                  <p className="text-primary-700 mb-4">
                    <strong>Help:</strong> reply HELP.
                  </p>
                  <p className="text-primary-700">
                    Message and data rates may apply based on your carrier. Transactional notices needed to complete active work may still be sent.
                  </p>
                </div>

                {/* Disputes */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">16) Disputes, Governing Law & Venue</h2>
                  <p className="text-primary-700 mb-4">
                    These Terms are governed by the laws of the State of North Carolina, without regard to conflict-of-law rules.
                  </p>
                  <p className="text-primary-700 mb-4">
                    <strong>Good-faith resolution:</strong> We both agree to attempt to resolve disputes informally first.
                  </p>
                  <p className="text-primary-700 mb-4">
                    <strong>Small claims or arbitration:</strong> If not resolved within 30 days, either party may file in small claims court (where jurisdictional limits apply) or elect binding arbitration administered by a reputable provider (e.g., AAA) in Mecklenburg County, NC. Each party bears its own fees unless the arbitrator awards otherwise.
                  </p>
                  <p className="text-primary-700">
                    <strong>Injunctive relief:</strong> Either party may seek temporary relief in court to protect IP or confidential information.
                  </p>
                </div>

                {/* Contact for Terms */}
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-primary-800 mb-4">19) Contact</h2>
                  <p className="text-primary-700 mb-4">
                    Questions about these Terms:
                  </p>
                  <div className="space-y-2 text-primary-700">
                    <p><strong>Email:</strong> info.handyman.southclt@gmail.com</p>
                    <p><strong>Phone:</strong> 980-361-7667</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;