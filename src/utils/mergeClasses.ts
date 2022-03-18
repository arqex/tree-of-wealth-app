export function mergeClasses( ...classes: any[] ){
  return classes.filter(Boolean).join(' ');
}