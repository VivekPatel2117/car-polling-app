export const metadata = {
  title: "Terms & Conditions",
  description: "Review the terms for using our service.",
}

export default function TermsAndConditionsPage() {
  return (
    <div className="container py-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Terms &amp; Conditions
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Your Terms &amp; Conditions define the rules and guidelines for using 
        your website or service. This typically includes user responsibilities,
        prohibited activities, disclaimers, and liability limits.
      </p>
      <ol className="list-decimal pl-6 mt-4 space-y-2">
        <li>Use of the Website</li>
        <li>User Obligations</li>
        <li>Intellectual Property Rights</li>
        <li>Liability Limitations</li>
        <li>Governing Law</li>
      </ol>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Customize these points to suit your platform and legal requirements.
      </p>
    </div>
  )
}