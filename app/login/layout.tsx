export const metadata = {
  title: 'Rocket by NLP4BIA',
  description: 'Login of Rocket by NLP4BIA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
