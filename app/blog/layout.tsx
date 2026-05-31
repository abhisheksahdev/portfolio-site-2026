export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="mt-6 p-5">{children}</section>;
}
