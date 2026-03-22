export function SiteFooter() {
  return (
    <footer aria-label="사이트 푸터" className="border-t px-4 md:px-6">
      <div className="container mx-auto grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
        {/* Brand & Social */}
        <div className="space-y-4">
          <h3 className="font-display text-xl">Café Lunaire</h3>
          <p className="text-muted-foreground text-sm">
            달빛 아래 고요와 여유를 담은 커피와 칵테일.
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider">Contact</h4>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>서울특별시 강남구 테헤란로 123</li>
            <li>02-1234-5678</li>
            <li>contact@lunaire.cafe</li>
          </ul>
        </div>

        {/* Hours */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider">Hours</h4>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Mon - Fri</span>
              <span>08:00 - 22:00</span>
            </li>
            <li className="flex justify-between">
              <span>Sat - Sun</span>
              <span>10:00 - 23:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto border-t py-6 text-center text-xs text-muted-foreground">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© {new Date().getFullYear()} Café Lunaire. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-foreground">
              Privacy
            </a>
            <a href="/terms" className="hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
