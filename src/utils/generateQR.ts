export function generateQRData(propertyId: string): string {
  return `${window.location.origin}/property/${propertyId}`
}
