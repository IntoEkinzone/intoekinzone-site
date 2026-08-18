const BREAKPOINTS = [480, 768, 1080, 1440, 1920, 2560, 3840, 5120];

export function widthsFor(nativeWidth: number): number[] {
  const widths = BREAKPOINTS.filter((w) => w <= nativeWidth);
  if (widths.at(-1) !== nativeWidth) {
    widths.push(nativeWidth);
  }
  return widths;
}
