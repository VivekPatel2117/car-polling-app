export const metadata = {
  title: "Privacy Policy",
  description: "Understand how we handle your data.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Privacy Policy
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Your Privacy Policy details how you collect, use, and protect user data.
        Make sure to be transparent about any third-party services you use, data 
        retention policies, and more.
      </p>
      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>Information Collection</li>
        <li>Use of Information</li>
        <li>Data Protection</li>
        <li>Third-Party Sharing</li>
      </ul>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Update this text to reflect your specific policies. 
        Ensure compliance with relevant laws (e.g., GDPR, CCPA).
      </p>
    </div>
  )
}