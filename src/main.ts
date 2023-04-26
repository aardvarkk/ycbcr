import "./style.css";

const r = document.getElementById("r")!;
const g = document.getElementById("g")!;
const b = document.getElementById("b")!;
const y = document.getElementById("y")!;
const cb = document.getElementById("cb")!;
const cr = document.getElementById("cr")!;

function unclamped(value: number) {
  return Math.round(value).toString();
}

function clamped(value: number) {
  return Math.min(Math.max(Math.round(value), -128), 127).toString();
}

function clampedAndScaled(value: number) {
  const positive = value + 128; // [0, 255]
  const scaled = positive * 8; // [0, 2040]
  return Math.min(Math.max(Math.round(scaled - 1020), -1020), 1016).toString(); // [-1020,1016]
}

document.getElementById("picker")!.addEventListener("change", (ev) => {
  const value = (ev.target as HTMLInputElement).value;

  const rv = parseInt(value.slice(1, 3), 16);
  const gv = parseInt(value.slice(3, 5), 16);
  const bv = parseInt(value.slice(5, 7), 16);

  r.innerText = `0x${rv.toString(16)}`;
  g.innerText = `0x${gv.toString(16)}`;
  b.innerText = `0x${bv.toString(16)}`;

  const yv =
    0.298973 * (rv - 128) + 0.58706 * (gv - 128) + 0.113967 * (bv - 128);
  const cbv =
    -0.168271 * (rv - 128) - 0.331298 * (gv - 128) + 0.500019 * (bv - 128);
  const crv =
    0.500019 * (rv - 128) - 0.41873 * (gv - 128) - 0.0812885 * (bv - 128);

  y.innerText = clampedAndScaled(yv);
  cb.innerText = clampedAndScaled(cbv);
  cr.innerText = clampedAndScaled(crv);
});
