import { NewsletterForm } from '@/components/NewsletterForm';
import { Reveal } from '@/components/Reveal';

/** Full-bleed moss band, field type. The only band on the page. */
export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-heading" className="bg-moss">
      <Reveal className="shell section-y">
        <div className="grid12">
          <div className="col-span-12 lg:col-span-6">
            <h2 id="newsletter-heading" className="text-display-l text-field">
              One email a month. Usually about fabric.
            </h2>
          </div>

          <div className="col-span-12 mt-16 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <NewsletterForm tone="sprout" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
