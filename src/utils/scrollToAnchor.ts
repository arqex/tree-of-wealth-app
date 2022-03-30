export function scrollToAnchor(e: any) {
  e.preventDefault();

  document.querySelector(e.currentTarget.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
  });
}