async function generate() {
  const can = document.getElementById('canvas');
  const ctx = can.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  await drawCanvasBackground();

  // load svg, store it in invisible element.
  const resp = await fetch('./playmat-svgs/' + document.getElementById('layout').value + '.svg');

  const invisibleDiv = document.getElementById('invisible');
  invisibleDiv.innerHTML = await resp.text();
  const svg = document.getElementById('mat');

  // apply style
  applySlotStyle();

  // add text
  addTextToSVG();

  // load svg to img then draw to canvas.
  const svgURL = new XMLSerializer().serializeToString(svg);
  const img = new Image();
  img.onload = function () {
    ctx.drawImage(this, 0, 0);
  }
  img.src = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgURL);

  // scroll to preview
  document.body.style.zoom = '25%';
  can.scrollIntoView(true);
}

async function drawCanvasBackground() {
  const bg = document.getElementById('background-color');
  const file = document.getElementById('background-file');
  const can = document.getElementById('canvas');
  const ctx = can.getContext('2d');

  if (file.value === '') {
    // use pure color as background
    ctx.fillStyle = bg.value;
    ctx.fillRect(0, 0, 7200, 4200);
  } else {
    const reader = new FileReader();
    reader.readAsDataURL(file.files[0]);

    const p = new Promise((resolve) => {
      reader.onload = function () {
        const img = new Image();
        img.onload = function () {
          ctx.drawImage(this, 0, 0);
          resolve();
        }
        img.src = reader.result;
      }
    });

    await p;
  }
}

function applySlotStyle() {
  const r = document.getElementById('rounded-corner').value.toString();
  const strokeWidth = document.getElementById('stroke-width').value.toString();
  const slots = document.querySelectorAll('.slot');
  for (slot of slots) {
    slot.setAttribute('rx', r);
    slot.setAttribute('ry', r);
    slot.setAttribute('stroke-width', strokeWidth);

    // per slot
    const fill = document.getElementById('per-slot-' + slot.id + '-fill').value;
    const fillOp = document.getElementById('per-slot-' + slot.id + '-fill-op').value.toString() + '%';
    const stroke = document.getElementById('per-slot-' + slot.id + '-stroke').value;
    const strokeOp = document.getElementById('per-slot-' + slot.id + '-stroke-op').value.toString() + '%';
    slot.setAttribute('fill', fill);
    slot.setAttribute('fill-opacity', fillOp);
    slot.setAttribute('stroke', stroke);
    slot.setAttribute('stroke-opacity', strokeOp);
  }
}

function generatePerSlotForm() {
  const slots = document.querySelectorAll('.per-slot');
  for (slot of slots) {
    const bgLabel = document.createElement('label');
    bgLabel.for = slot.id + '-fill';
    bgLabel.innerText = 'background:';
    slot.appendChild(bgLabel);

    const bg = document.createElement('input');
    bg.id = slot.id + '-fill';
    bg.type = 'color';
    bg.className = 'per-slot-fill';
    bg.value = '#000000';
    slot.appendChild(bg);
    addLineBreak(slot);

    const bgOpLabel = document.createElement('label');
    bgOpLabel.for = slot.id + '-fill-op';
    bgOpLabel.innerText = 'bg opacity:';
    slot.appendChild(bgOpLabel);

    const bgOp = document.createElement('input');
    bgOp.id = slot.id + '-fill-op';
    bgOp.type = 'number';
    bgOp.className = 'per-slot-fill-op';
    bgOp.min = 0;
    bgOp.max = 100;
    bgOp.value = 100;
    slot.appendChild(bgOp);
    addLineBreak(slot);

    const strokeLabel = document.createElement('label');
    strokeLabel.for = slot.id + '-stroke';
    strokeLabel.innerText = 'stroke color:';
    slot.appendChild(strokeLabel);

    const stroke = document.createElement('input');
    stroke.id = slot.id + '-stroke';
    stroke.type = 'color';
    stroke.className = 'per-slot-stroke';
    stroke.value = '#FFFFFF';
    slot.appendChild(stroke);
    addLineBreak(slot);

    const strokeOpLabel = document.createElement('label');
    strokeOpLabel.for = slot.id + '-stroke-op';
    strokeOpLabel.innerText = 'stroke opacity:';
    slot.appendChild(strokeOpLabel);

    const strokeOp = document.createElement('input');
    strokeOp.id = slot.id + '-stroke-op';
    strokeOp.type = 'number';
    strokeOp.className = 'per-slot-stroke-op';
    strokeOp.min = 0;
    strokeOp.max = 100;
    strokeOp.value = 100;
    slot.appendChild(strokeOp);
  }
}

function addLineBreak(e) {
  const br = document.createElement('br');
  e.appendChild(br);
}

function addTextToSVG() {
  const e = document.getElementById('text');
  const checked = document.getElementById('include-text').checked;

  if (!checked) {
    e.setAttribute('visibility', 'hidden');
    return;
  }
  const replace = document.getElementById('replace-text').value;
  const fontSize = document.getElementById('font-size').value;
  const textColor = document.getElementById('text-color').value;
  const x = document.getElementById('text-x').value.toString()+'%';
  const y = document.getElementById('text-y').value.toString()+'%';
  e.textContent = replace;
  e.setAttribute('font-size', fontSize);
  e.setAttribute('fill', textColor);
  e.setAttribute('x', x);
  e.setAttribute('y', y);
}

function onFillChange() {
  updatePerSlot('slot-fill', '.per-slot-fill');
}

function onFillOpChange() {
  updatePerSlot('slot-fill-op', '.per-slot-fill-op');
}

function onStrokeChange() {
  updatePerSlot('slot-stroke', '.per-slot-stroke');
}

function onStrokeOpChange() {
  updatePerSlot('slot-stroke-op', '.per-slot-stroke-op');
}

function updatePerSlot(id, perSlot) {
  const v = document.getElementById(id).value;
  const list = document.querySelectorAll(perSlot);
  for (e of list) {
    e.value = v;
  }
}

function resetZoom() {
  document.body.style.zoom = '100%';
  document.documentElement.scrollTop = 0;
}

window.onload = () => {
  generatePerSlotForm();
}