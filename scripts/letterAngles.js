const number = 121;

const R = 424;

console.log( renderId(number) );

console.log( printColors() );

calculateRepetitions()

function round(n, factor=10){
  return Math.round(n*factor)/factor;
}

function toDegrees(rad){
  return rad / (Math.PI /90);
}

function renderId(number){
  const {angle, numbers} = getNumbers(number.toString());
  const idAngle = (angle+(Math.PI/32)) / 2;

  console.log( getColors(number) );

  let x = 500 - (Math.sin(idAngle) * R);
  let y = 476 + (Math.cos(idAngle) * R);

  return `
<g fill="#dee" style="transform: translate(${x}px, ${y}px) rotate(${idAngle}rad)">
<path id="#" d="M13.9 71.2 17 49.4h9.8l-3.1 21.8h7.8l3.1-21.8h9.9v-6.6h-9.2l2.2-14.4h9.9v-6.6h-9.2L41.3 0h-7.8l-3.1 21.8h-9.8L23.7 0h-7.8l-3.1 21.8H2.9v6.6h9.2L9.9 42.8H0v6.6h9.2L6.1 71.2z" />
${numbers}</g>
  `;
}

function getNumbers(strNumber){
  let angle = 0;
  let output = '';
  for(let i = 0; i < strNumber.length; i++ ){
    let n = strNumber[i];
    let prev = strNumber[i-1];
    let increment = prev === '1' ? Math.PI / 32 : Math.PI / 25;
    angle += increment;
    let x = round(R * Math.sin(angle));
    let y = round( (R * Math.cos(angle)) - R);
    let rotate = n === '9' ? angle + Math.PI : angle;
    let id = n === '9' ? '6' : n;
    let extraTranslate = n === '9' ? 'translate(-40px, -70px)' : '';
    output += `<use xlink:href="#${id}" style="transform: translate(${x}px, ${y}px) rotate(-${round(rotate, 100)}rad) ${extraTranslate}" />\n`;
  }
  return {angle, numbers: output};
}

/*
function getColors(n) {
  let [r1,g1,b1] = getBaseColor(n);
  let [r2,g2,b2] = getAltColor(n);

  let brightness1 = getBrightness(r1,g1,b1);
  let brightness2 = getBrightness(r2,g2,b2);
  console.log(brightness1, brightness2, Math.abs(brightness1 - brightness2));

  if( Math.abs(brightness1 - brightness2) > 120 ){
    return [
      toHex(r1,g1,b1),
      toHex(r2,g2,b2)
    ]
  }

  if( brightness1 <= 120 ){
    let factor = (255 - brightness2) / 255;
    r2 = Math.min( Math.round(r2*factor) + r2, 255);
    g2 = Math.min( Math.round(g2*factor) + g2, 255);
    b2 = Math.min( Math.round(b2*factor) + b2, 255);

    return [
      toHex(r1,g1,b1),
      toHex(r2,g2,b2)
    ]
  }
  else {
    let factor = brightness2 / 255;
    r2 = Math.max( Math.round(r2 - r2*factor), 0);
    g2 = Math.max( Math.round(g2 - g2*factor), 0);
    b2 = Math.max( Math.round(b2 - b2*factor), 0);

    return [
      toHex(r1,g1,b1),
      toHex(r2,g2,b2)
    ]
  }
}
*/

function getColors(n) {
  let h = n*41 % 360;
  let s = (n*n+69) % 100;
  let l = n*61 % 100;

  let factor = ((n+150) * 3 % 100) / 100;
  let diff = l < 50 ?
    100 - (l + 50) : 
    l - 50
  ;

  // console.log('diff factor', diff, factor);
  let altL = l < 50 ?
    l + 50 + Math.round(diff*factor) : 
    l - 50 - Math.round(diff*factor)
  ;

  return [
    `hsl(${h},${s}%,${l}%)`,
    `hsl(${h},${s}%,${altL}%)`,
  ];
}

function getBaseColor(n) {
  let r = n*5 % 256;
  let g = n*n+200 % 256;
  let b = n*2 % 256;
  return [r,g,b];
}

function getAltColor(n, baseColor) {
  let r = n*4 % 256;
  let g = n*3 % 256;
  let b = (n*2*n+101) % 256;
  return [r,g,b];
}

function getBrightness(r,g,b){
  return (.299*r + .587*g + .114*b);
}

function toHex(r,g,b) {
  let hr = r.toString(16);
  let hg = g.toString(16);
  let hb = b.toString(16);

  if( hr.length === 1 ) hr = '0'+hr;
  if( hg.length === 1 ) hg = '0'+hr;
  if( hb.length === 1 ) hb = '0'+hr;
  return `#${hr.toString(16)}${hg.toString(16)}${hb.toString(16)}`;
}



function printColors() {
  let markup = [];

  for(let i = 1; i<=100; i++){
    let colors = getColors(i);
    markup.push(
      `<div style="background: ${colors[0]}; padding: 20px"><div style="background: ${colors[1]}; width: 10px; height:20px"></div></div>`
    );
  }

  return `<div>${markup.join('')}</div>`;
}


function calculateRepetitions() {
  let i = 1;
  let occurences = {};
  let colors = getColors(i).join('');
  while(!occurences[colors]){
    occurences[colors] = 1;
    i++;
    colors = getColors(i).join('');
  }

  console.log('First repetition at color #', i);
}