// ⚡️ RetroLab 启动序列动画
document.addEventListener("DOMContentLoaded", () => {
  const bootScreen = document.getElementById("bootScreen");
  const bootText = document.getElementById("bootText");

  const lines = [
    "Initializing RetroLab System...",
    "Calibrating Quantum Sensors...",
    "Loading Neural Memory Modules...",
    "Syncing Experimental Logs...",
    "Activating Interface Rendering Engine...",
    "System Online ✅"
  ];

  let i = 0;

  function typeLine() {
    if (i < lines.length) {
      bootText.innerHTML += `> ${lines[i]}<br>`;
      i++;
      setTimeout(typeLine, 300); // 每行显示间隔
    } else {
      setTimeout(() => {
        
        bootScreen.classList.add("fade-out");
        setTimeout(() => bootScreen.remove(), 1200);
      }, 1200);
    }
  }

  typeLine();
});

// ========================================================
// 💫 RetroLab 数据流 + 能量脉冲动画模块（独立安全版）
// ========================================================

(function initDataStream() {
  const canvas = document.getElementById("dataStream");
  if (!canvas) {
    console.warn("⚠️ Canvas #dataStream 未找到，已跳过数据流动画。");
    return;
  }

  const ctx = canvas.getContext("2d");
  let width, height, columns, chars;
  let pulseColumns = []; // 闪亮列
  let pulseTimer = 0;

  // 🧩 初始化尺寸
  function resizeStream() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / 20);
    chars = Array(columns).fill(0);
  }

  resizeStream();
  window.addEventListener("resize", resizeStream);

  // ⚡ 主绘制循环
  function drawStream() {
    // 拖影背景
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    const charsSet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    ctx.font = "16px JetBrains Mono, monospace";

    chars.forEach((y, i) => {
      const isPulse = pulseColumns.includes(i);
      const baseAlpha = Math.random() * 0.7 + 0.3;

      ctx.fillStyle = isPulse
        ? `rgba(200, 240, 255, 1)`
        : `rgba(80, 160, 255, ${baseAlpha})`;

      const text = charsSet.charAt(Math.floor(Math.random() * charsSet.length));
      const x = i * 20;
      ctx.fillText(text, x, y);

      if (y > height + Math.random() * 1000) chars[i] = 0;
      else chars[i] = y + 18;
    });

    // ⚙️ 能量脉冲节奏控制
    pulseTimer++;
    if (pulseTimer % 120 === 0) {
      pulseColumns = [];
      const pulseCount = 3 + Math.floor(Math.random() * 3);
      for (let j = 0; j < pulseCount; j++) {
        const randCol = Math.floor(Math.random() * columns);
        pulseColumns.push(randCol);
      }
      // 淡出闪光
      setTimeout(() => (pulseColumns = []), 600);
    }

    requestAnimationFrame(drawStream);
  }

  // 🚀 延迟启动（等启动动画播放完）
  window.addEventListener("load", () => {
    setTimeout(() => {
      canvas.style.transition = "opacity 2s ease";
      canvas.style.opacity = "0.4";
      drawStream();
    }, 3000);
  });
})();


// 💫 RetroLab Journal 统一动画脚本
document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("titleText");
  const cursor = title.querySelector(".cursor");
  const text = "RetroLab Journal 🌌";
  let index = 0;



  // 打字机动画
  title.childNodes[0].textContent = "";
  function type() {
    if (index < text.length) {
      title.childNodes[0].textContent += text.charAt(index);
      index++;
      setTimeout(type, 120);
    } else {
      cursor.classList.add("blink");
    }
  }
  type();

  // 元素选择（仅声明一次）
  const saveBtn = document.getElementById("saveBtn");
  const titleInput = document.getElementById("titleInput");
  const contentInput = document.getElementById("contentInput");
  const experimentList = document.getElementById("experimentList");

  // 保存逻辑 + 动画
  saveBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (!title || !content) return;

    saveBtn.classList.add("saving");
    saveBtn.textContent = "💾 保存中...";

    setTimeout(() => {
      saveBtn.classList.remove("saving");
      saveBtn.textContent = "✅ 已保存";

      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <button class="deleteBtn">🗑️ 删除</button>
      `;
      experimentList.prepend(div);

      // 清空输入框
      titleInput.value = "";
      contentInput.value = "";

      // 恢复按钮状态
      setTimeout(() => (saveBtn.textContent = "💾 保存"), 1500);

      // 删除逻辑
      div.querySelector(".deleteBtn").addEventListener("click", () => {
        div.classList.add("removing");
        setTimeout(() => div.remove(), 500);
      });
    }, 700);
  });
});

// 💫 蓝色粒子爆发动画
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// 创建粒子
function createParticles(x, y) {
  for (let i = 0; i < 25; i++) {
    particles.push({
      x,
      y,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 5,
      speedY: (Math.random() - 0.5) * 5,
      color: `rgba(74, 163, 255, ${Math.random() * 0.8 + 0.2})`,
      life: 100 + Math.random() * 30
    });
  }
}

// 更新粒子状态
function updateParticles() {
  particles.forEach((p, i) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.size *= 0.97;
    p.life--;
    if (p.life <= 0 || p.size < 0.5) particles.splice(i, 1);
  });
}

// 绘制粒子
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
}

// 动画循环
function animateParticles() {
  updateParticles();
  drawParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// 💾 绑定保存按钮的粒子效果
saveBtn.addEventListener("click", (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  createParticles(x, y);
});

// =====================================================
// ⚗️ RetroLab 实验笔记系统（防丢数据版）
// =====================================================

window.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "retroLabNotes";

  const titleInput = document.getElementById("expTitle");
  const contentInput = document.getElementById("expContent");
  const tagsInput = document.getElementById("expTags");
  const saveBtn = document.getElementById("saveBtn");
  const listContainer = document.getElementById("experimentList");
  const searchInput = document.getElementById("searchInput");

  // 🧩 首次从 localStorage 加载
  let notes = [];
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      notes = JSON.parse(saved);
      console.log("📦 已加载数据：", notes);
    } catch (e) {
      console.error("❌ 数据解析错误：", e);
      notes = [];
    }
  } else {
    console.log("📭 没有找到存储数据。");
  }

  // 💾 保存到 localStorage
  function saveNotes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    console.log("💾 已保存：", notes);
  }

  // ➕ 新增
function addNote(title, content, tags = [], customDate = null) {
  const newNote = {
    id: crypto.randomUUID(),
    title,
    content,
    tags,
    date: customDate || new Date().toISOString(),
  };
  notes.push(newNote);
  saveNotes();
  renderNotes(notes);
}


  // ❌ 删除
  function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    saveNotes();
    renderNotes(notes);
  }

// 🧠 渲染
function renderNotes(data) {
  listContainer.innerHTML = "";
  if (data.length === 0) {
    listContainer.innerHTML = `<p class="text-gray-400 italic">暂无实验记录。</p>`;
    return;
  }

  data
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach(note => {
      const div = document.createElement("div");
      div.className = "note-item";
div.innerHTML = `
  <h3>${note.title}</h3>
  <p>${note.content}</p>
  <p>🕒 ${new Date(note.date).toLocaleString()}</p>
  <div class='tags'>${(note.tags||[]).map(t=>`<span class='tag' data-tag='${t}'>${t}</span>`).join('')}</div>
  <div class="note-actions">
    <button class='edit-btn' data-id='${note.id}'>✏️ 编辑</button>
    <button class='delete-btn' data-id='${note.id}'>🗑️ 删除</button>
  </div>
`;

      listContainer.appendChild(div);
    });

  // 删除按钮事件
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.dataset.id;
      deleteNote(id);
    });
  });

  // ✏️ 编辑按钮事件
document.querySelectorAll(".edit-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    const id = e.target.dataset.id;
    const note = notes.find(n => n.id === id);
    if (!note) return;

    // 将笔记内容填入输入框
    titleInput.value = note.title;
    contentInput.value = note.content;
    tagsInput.value = (note.tags || []).join(", ");
    dateInput.value = note.date ? note.date.split("T")[0] : "";

    saveBtn.textContent = "💾 更新记录";
    saveBtn.dataset.editing = id; // 标记为编辑模式
  });
});


  // 🏷️ 标签点击事件绑定
  document.querySelectorAll(".tag").forEach(tag => {
    tag.addEventListener("click", e => {
      const clickedTag = e.target.getAttribute("data-tag");
      const filtered = notes.filter(note => note.tags && note.tags.includes(clickedTag));
      renderNotes(filtered);
      alert(`🔍 当前筛选标签：${clickedTag}`);
      if (searchInput) {
        searchInput.value = `#${clickedTag}`;
      }
    });
  });
}
// 📅 日期范围筛选功能
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const filterDateBtn = document.getElementById("filterDateBtn");
const clearDateBtn = document.getElementById("clearDateBtn");

if (filterDateBtn) {
  filterDateBtn.addEventListener("click", () => {
    const start = startDateInput.value ? new Date(startDateInput.value) : null;
    const end = endDateInput.value ? new Date(endDateInput.value) : null;

    if (!start && !end) {
      alert("请选择起始或结束日期！");
      return;
    }

    const filtered = notes.filter(n => {
      const noteDate = new Date(n.date);
      if (start && noteDate < start) return false;
      if (end && noteDate > end) return false;
      return true;
    });

    renderNotes(filtered);
  });
}

if (clearDateBtn) {
  clearDateBtn.addEventListener("click", () => {
    startDateInput.value = "";
    endDateInput.value = "";
    renderNotes(notes);
  });
}

// 🔍 搜索
if (searchInput) {
  searchInput.addEventListener("input", e => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      renderNotes(notes);
      return;
    }
    const filtered = notes.filter(n =>
      n.title.toLowerCase().includes(query) ||
      n.content.toLowerCase().includes(query) ||
      (n.tags && n.tags.some(t => t.toLowerCase().includes(query)))
    );
    renderNotes(filtered);
  });
}

// 🕒 快捷日期选择逻辑
const dateInput = document.getElementById("expDate");
document.querySelectorAll(".quick-dates button").forEach(btn => {
  btn.addEventListener("click", () => {
    const offset = parseInt(btn.dataset.offset);
    const d = new Date();
    d.setDate(d.getDate() + offset);
    const formatted = d.toISOString().split("T")[0];
    dateInput.value = formatted;
  });
});

// 💾 保存按钮
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const tags = tagsInput.value
    ? tagsInput.value.split(",").map(t => t.trim()).filter(Boolean)
    : [];
  const dateValue = document.getElementById("expDate").value;
// 🧩 如果是编辑模式
if (saveBtn.dataset.editing) {
  const editId = saveBtn.dataset.editing;
  const idx = notes.findIndex(n => n.id === editId);
  if (idx !== -1) {
    notes[idx].title = title;
    notes[idx].content = content;
    notes[idx].tags = tags;
    notes[idx].date = date;
    saveNotes();
    renderNotes(notes);
  }
  saveBtn.textContent = "💾 保存";
  delete saveBtn.dataset.editing; // 清除编辑标志
  titleInput.value = "";
  contentInput.value = "";
  tagsInput.value = "";
  dateInput.value = "";
  return; // 阻止继续执行“新增”逻辑
}

  if (!title || !content) {
    alert("请输入实验标题与内容！");
    return;
  }

  // 🕒 若用户未选时间，则自动使用当前时间
  const date = dateValue ? new Date(dateValue).toISOString() : new Date().toISOString();

  addNote(title, content, tags, date);

  titleInput.value = "";
  contentInput.value = "";
  tagsInput.value = "";
  document.getElementById("expDate").value = "";
  });

// 📁 导出按钮功能
const exportBtn = document.getElementById("exportBtn");
if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    if (notes.length === 0) {
      alert("没有可导出的实验记录！");
      return;
    }

    // 选择导出格式
    const format = prompt("请选择导出格式：\n1️⃣ JSON（原始格式）\n2️⃣ CSV（表格格式）", "1");
    if (!format) return;

    if (format === "1") exportAsJSON();
    else if (format === "2") exportAsCSV();
    else alert("无效选择，请输入 1 或 2。");
  });
}

// 🧾 导出为 JSON 文件
function exportAsJSON() {
  const dataStr = JSON.stringify(notes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `RetroLab_Notes_${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  alert("✅ 实验笔记已导出为 JSON 文件！");
}

// 📊 导出为 CSV 文件
function exportAsCSV() {
  const header = ["标题", "内容", "标签", "日期"];
  const rows = notes.map(note => [
    `"${note.title.replace(/"/g, '""')}"`,
    `"${note.content.replace(/"/g, '""')}"`,
    `"${(note.tags || []).join(", ")}"`,
    `"${new Date(note.date).toLocaleString()}"`
  ]);
  const csvContent = [header.join(","), ...rows.map(r => r.join(","))].join("\n");
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `RetroLab_Notes_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  alert("✅ 实验笔记已导出为 CSV 文件！");
}

}

// 🚀 首次渲染
renderNotes(notes);
});

