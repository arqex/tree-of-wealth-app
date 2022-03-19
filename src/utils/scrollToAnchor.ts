export function scrollToAnchor(e: any) {
  e.preventDefault();

  document.querySelector(e.target.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
  });
}