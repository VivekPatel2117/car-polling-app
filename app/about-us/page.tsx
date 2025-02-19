
export const metadata = {
  title: "About Us",
  description: "Learn more about our company.",
}

export default function AboutPage() {
  return (
    <div className="container py-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        About Us
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Welcome to our About Us page! Here you can share your company's story,
        mission, and values. Let visitors learn what makes your organization special.
      </p>
    </div>
  )
}