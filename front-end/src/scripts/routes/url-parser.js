export function getActiveRoute() {
  const url = window.location.hash.slice(1) || '/'; // Mengambil hash dari URL atau default ke '/'
  return url;
}