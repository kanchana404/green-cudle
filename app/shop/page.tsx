import { permanentRedirect } from 'next/navigation';

/** The shop was a catalogue of separate garments. It is one gift box now. */
export default function ShopPage(): never {
  permanentRedirect('/collections');
}
