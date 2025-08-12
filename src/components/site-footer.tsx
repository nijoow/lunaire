export function SiteFooter() {
  return (
    <footer className="border-t px-4 md:px-6">
      <div className="flex flex-col items-start gap-2 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Café Lunaire. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-foreground">
            Privacy
          </a>
          <a href="/terms" className="hover:text-foreground">
            Terms
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-foreground"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
