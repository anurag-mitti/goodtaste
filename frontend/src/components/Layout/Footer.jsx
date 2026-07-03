import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 mt-20 pb-8 pt-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-heading font-semibold text-foreground/80">GoodTaste</span>
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
