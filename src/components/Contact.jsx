import useMagnetic from '../hooks/useMagnetic.js'

export default function Contact() {
  const emailRef = useMagnetic()

  return (
    <section id="contact" className="section-pad relative text-center">
      <div className="eyebrow text-brand-secondary mb-4"><span className="opacity-50">05 —</span> Get In Touch</div>
      <h2 className="h-display fs-h2 text-brand-primary mb-6">Let's build something <span className="h-italic text-brand-secondary">great.</span></h2>
      <p className="text-brand-ink/70 fs-lead mb-10 max-w-lg mx-auto">Have a project in mind or just want to say hi? My inbox is always open.</p>
      <a
        href="mailto:himanshupanchal8439@gmail.com"
        ref={emailRef}
        data-cursor
        className="magnetic inline-flex max-w-full bg-brand-primary text-brand-cream eyebrow px-5 sm:px-8 py-4 sm:py-5 rounded-full text-sm sm:text-base normal-case tracking-normal break-all sm:break-normal"
      >
        himanshupanchal8439@gmail.com
      </a>
      <p className="eyebrow text-brand-primary/50 mt-6">+91-8439470318</p>

      <div className="flex justify-center gap-8 mt-10 eyebrow text-brand-primary/70">
        <a href="https://linkedin.com/in/himanshupanchal" target="_blank" rel="noreferrer" className="link-line" data-cursor>LinkedIn</a>
        <a href="#" className="link-line" data-cursor>GitHub</a>
      </div>
    </section>
  )
}
