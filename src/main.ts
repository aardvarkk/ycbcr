import "./style.css";

const r = document.getElementById("r")!;
const g = document.getElementById("g")!;
const b = document.getElementById("b")!;
const y = document.getElementById("y")!;
const cb = document.getElementById("cb")!;
const cr = document.getElementById("cr")!;

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

  y.innerText = Math.min(Math.max(Math.round(yv), -128), 127).toString();
  cb.innerText = Math.min(Math.max(Math.round(cbv), -128), 127).toString();
  cr.innerText = Math.min(Math.max(Math.round(crv), -128), 127).toString();
});
