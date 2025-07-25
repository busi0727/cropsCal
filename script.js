const fruitReq = 64;
const boxes = [
  { name: "1단계 상자", plywood: 446, nail: 52 },
  { name: "2단계 상자", plywood: 405, nail: 35 },
  { name: "3단계 상자", plywood: 418, nail: 18 }
];

let crops = {
  "블랙베리": 51.68,
  "블루베리": 35.78,
  "라즈베리": 55.26,
  "체리": 57.86,
  "아보카도": 59.51,
  "오이": 58.52,
  "리치": 60.73,
  "파파야": 59.21,
  "구아바": 57.87,
  "코코넛": 25.14,
  "두리안": 69.44,
  "키위": 72.11,
  "망고": 54.9,
  "카람볼라": 66.88,
  "구기자": 36.66
};

const select = document.getElementById('crop-select');
const editor = document.getElementById('price-editor');
const input = document.getElementById('price-input');
const editName = document.getElementById('edit-name');
const result = document.getElementById('price-result');

Object.keys(crops).forEach(name => {
  const option = document.createElement('option');
  option.value = name;
  option.textContent = name;
  select.appendChild(option);
});

function calPrice(unitPrice, box) {
  return (unitPrice * fruitReq) + (box.plywood * 3) + (box.nail * 2);
}

function showPrices() {
  const name = select.value;
  const unit = crops[name];
  let html = `<h2>${name}</h2><table><tr><th>상자</th><th>가격</th></tr>`;
  boxes.forEach(box => {
    const total = calPrice(unit, box).toFixed(2);
    html += `<tr><td>${box.name}</td><td>${total} DP</td></tr>`;
  });
  html += `</table>`;
  result.innerHTML = html;
  result.style.display = 'block';
}

function editPrice() {
  const name = select.value;
  editor.style.display = 'block';
  editName.textContent = name;
  input.value = crops[name];
}

function savePrice() {
  const name = editName.textContent;
  const newVal = parseFloat(input.value);
  if (!isNaN(newVal)) {
    crops[name] = newVal;
  }
  editor.style.display = 'none';
}

// 다크모드 토글
function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById("theme-icon");

  if (body.dataset.theme === "dark") {
    body.dataset.theme = "light";
    localStorage.setItem("theme", "light");
    icon.textContent = "🌙";
  } else {
    body.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
    icon.textContent = "🌞";
  }
}

// 초기 테마 적용
(function () {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.dataset.theme = "dark";
    document.getElementById("theme-icon").textContent = "🌞";
  } else {
    document.body.dataset.theme = "light";
    document.getElementById("theme-icon").textContent = "🌙";
  }
})();
