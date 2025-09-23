export function resizeItunesArtworkUrl(artworkUrl100: string, size: string = '1000'): string {
  const url = new URL(artworkUrl100);
  const pathname = url.pathname;

  const sizePattern = /\/\d+x\d+bb\.jpg$/;
  if (sizePattern.test(pathname)) {
    url.pathname = pathname.replace(sizePattern, `/${size}x${size}bb.jpg`);
    return url.toString();
  }
  return artworkUrl100;
}
