/* ============================================================
   GRIDGUARD — Transformer Intelligence Platform
   Frontend Prototype — script.js
   ============================================================ */

// ============================================================
// 1. MOCK DATA
// ============================================================

const FEEDERS = [
  { id: 'FD-01', name: 'Feeder 01 — Rajpur East', transformerCount: 5 },
  { id: 'FD-02', name: 'Feeder 02 — Kankhal South', transformerCount: 4 },
  { id: 'FD-03', name: 'Feeder 03 — Bhagwanpur', transformerCount: 4 },
  { id: 'FD-04', name: 'Feeder 04 — Laksar West', transformerCount: 4 },
  { id: 'FD-05', name: 'Feeder 05 — Roorkee Rural', transformerCount: 4 },
  { id: 'FD-06', name: 'Feeder 06 — Manglaur', transformerCount: 3 },
  { id: 'FD-07', name: 'Feeder 07 — Deoband North', transformerCount: 3 },
  { id: 'FD-08', name: 'Feeder 08 — Nakur Circle', transformerCount: 3 },
];

const TRANSFORMERS = [
  // Feeder 01
  { id: 'TR-2048', feeder: 'FD-07', lat: 29.8543, lng: 77.8960, risk: 87, status: 'critical', currentLoad: 78, peakLoad: 91, farmers: 42, backup: false, season: 'peak', lastMaintenance: 42, capacity: 100, anomalies: 4, predictedWindow: '7–14 days', confidence: 'high', connections: ['TR-1182','TR-3091','TR-4410'] },
  { id: 'TR-1182', feeder: 'FD-07', lat: 29.8610, lng: 77.9050, risk: 81, status: 'critical', currentLoad: 74, peakLoad: 88, farmers: 67, backup: false, season: 'peak', lastMaintenance: 38, capacity: 100, anomalies: 3, predictedWindow: '14–21 days', confidence: 'high', connections: ['TR-2048','TR-3091'] },
  { id: 'TR-3091', feeder: 'FD-07', lat: 29.8470, lng: 77.9120, risk: 76, status: 'high', currentLoad: 70, peakLoad: 84, farmers: 24, backup: true, season: 'normal', lastMaintenance: 55, capacity: 100, anomalies: 3, predictedWindow: '2–3 weeks', confidence: 'medium', connections: ['TR-2048','TR-1182','TR-4410'] },
  { id: 'TR-4410', feeder: 'FD-04', lat: 29.8390, lng: 77.8880, risk: 69, status: 'high', currentLoad: 65, peakLoad: 79, farmers: 53, backup: true, season: 'peak', lastMaintenance: 61, capacity: 100, anomalies: 2, predictedWindow: '3–4 weeks', confidence: 'medium', connections: ['TR-2048','TR-3091'] },
  { id: 'TR-5128', feeder: 'FD-01', lat: 29.8700, lng: 77.8800, risk: 63, status: 'high', currentLoad: 62, peakLoad: 76, farmers: 31, backup: false, season: 'peak', lastMaintenance: 70, capacity: 100, anomalies: 2, predictedWindow: '4–5 weeks', confidence: 'medium', connections: ['TR-6234'] },
  { id: 'TR-6234', feeder: 'FD-01', lat: 29.8780, lng: 77.8720, risk: 58, status: 'warning', currentLoad: 58, peakLoad: 72, farmers: 28, backup: true, season: 'normal', lastMaintenance: 30, capacity: 100, anomalies: 2, predictedWindow: '5–6 weeks', confidence: 'low', connections: ['TR-5128','TR-7891'] },
  { id: 'TR-7891', feeder: 'FD-01', lat: 29.8830, lng: 77.8650, risk: 52, status: 'warning', currentLoad: 54, peakLoad: 68, farmers: 19, backup: true, season: 'normal', lastMaintenance: 25, capacity: 100, anomalies: 1, predictedWindow: '6–8 weeks', confidence: 'low', connections: ['TR-6234'] },
  { id: 'TR-8102', feeder: 'FD-01', lat: 29.8680, lng: 77.8550, risk: 45, status: 'warning', currentLoad: 50, peakLoad: 64, farmers: 35, backup: false, season: 'peak', lastMaintenance: 20, capacity: 100, anomalies: 1, predictedWindow: null, confidence: null, connections: [] },
  { id: 'TR-8455', feeder: 'FD-01', lat: 29.8750, lng: 77.8480, risk: 22, status: 'healthy', currentLoad: 38, peakLoad: 52, farmers: 22, backup: true, season: 'normal', lastMaintenance: 15, capacity: 100, anomalies: 0, predictedWindow: null, confidence: null, connections: [] },
  // Feeder 02
  { id: 'TR-1024', feeder: 'FD-02', lat: 29.8300, lng: 77.9200, risk: 48, status: 'warning', currentLoad: 52, peakLoad: 66, farmers: 38, backup: true, season: 'peak', lastMaintenance: 50, capacity: 100, anomalies: 1, predictedWindow: null, confidence: null, connections: ['TR-1025'] },
  { id: 'TR-1025', feeder: 'FD-02', lat: 29.8250, lng: 77.9280, risk: 35, status: 'warning', currentLoad: 44, peakLoad: 58, farmers: 26, backup: true, season: 'normal', lastMaintenance: 35, capacity: 100, anomalies: 1, predictedWindow: null, confidence: null, connections: ['TR-1024','TR-1026'] },
  { id: 'TR-1026', feeder: 'FD-02', lat: 29.8200, lng: 77.9350, risk: 18, status: 'healthy', currentLoad: 34, peakLoad: 48, farmers: 20, backup: true, season: 'normal', lastMaintenance: 12, capacity: 100, anomalies: 0, predictedWindow: null, confidence: null, connections: ['TR-1025'] },
  { id: 'TR-1027', feeder: 'FD-02', lat: 29.8150, lng: 77.9180, risk: 12, status: 'healthy', currentLoad: 28, peakLoad: 42, farmers: 15, backup: true, season: 'normal', lastMaintenance: 8, capacity: 100, anomalies: 0, predictedWindow: null, confidence: null, connections: [] },
  // Feeder 03
  { id: 'TR-2101', feeder: 'FD-03', lat: 29.8950, lng: 77.8500, risk: 55, status: 'warning', currentLoad: 56, peakLoad: 70, farmers: 44, backup: false, season: 'peak', lastMaintenance: 65, capacity: 100, anomalies: 2, predictedWindow: '5–7 weeks', confidence: 'low', connections: ['TR-2102'] },
  { id: 'TR-2102', feeder: 'FD-03', lat: 29.9010, lng: 77.8580, risk: 41, status: 'warning', currentLoad: 48, peakLoad: 62, farmers: 33, backup: true, season: 'normal', lastMaintenance: 40, capacity: 100, anomalies: 1, predictedWindow: null, confidence: null, connections: ['TR-2101','TR-2103'] },
  { id: 'TR-2103', feeder: 'FD-03', lat: 29.9080, lng: 77.8440, risk: 20, status: 'healthy', currentLoad: 32, peakLoad: 46, farmers: 18, backup: true, season: 'normal', lastMaintenance: 18, capacity: 100, anomalies: 0, predictedWindow: null, confidence: null, connections: ['TR-2102'] },
  { id: 'TR-2104', feeder: 'FD-03', lat: 29.9120, lng: 77.8360, risk: 14, status: 'healthy', currentLoad: 26, peakLoad: 40, farmers: 12, backup: true, season: 'normal', lastMaintenance: 10, capacity: 100, anomalies: 0, predictedWindow: null, confidence: null, connections: [] },
  // Feeder 04
  { id: 'TR-3201', feeder: 'FD-04', lat: 29.8350, lng: 77.8700, risk: 44, status: 'warning', currentLoad: 49, peakLoad: 63, farmers: 29, backup: true, season: 'normal', lastMaintenance: 45, capacity: 100, anomalies: 1, predictedWindow: null, confidence: null, connections: ['TR-4410'] },
  { id: 'TR-3202', feeder: 'FD-04', lat: 29.8280, lng: 77.8780, risk: 30, status: 'warning', currentLoad: 42, peakLoad: 56, farmers: 21, backup: true, season: 'normal', lastMaintenance: 28, capacity: 100, anomalies: 1, predictedWindow: null, confidence: null, connections: [] },
  { id: 'TR-3203', feeder: 'FD-04', lat: 29.8220, lng: 77.8650, risk: 16, status: 'healthy', currentLoad: 30, peakLoad: 44, farmers: 16, backup: true, season: 'normal', lastMaintenance: 14, capacity: 100, anomalies: 0, predictedWindow: null, confidence: null, connections: [] },
  // Feeder 05
  { id: 'TR-4301', feeder: 'FD-05', lat: 29.8600, lng: 77.9400, risk: 50, status: 'warning', currentLoad: 53, peakLoad: 67, farmers: 40, backup: false, season: 'peak', lastMaintenance: 58, capacity: 100, anomalies: 2, predictedWindow: '6–8 weeks', confidence: 'low', connections: ['TR-4302'] },
  { id: 'TR-4302', feeder: 'FD-05', lat: 29.8550, lng: 77.9480, risk: 38, status: 'warning', currentLoad: 46, peakLoad: 60, farmers: 25, backup: true, season: 'normal', lastMaintenance: 33, capacity: 100, anomalies: 1, predictedWindow: null, confidence: null, connections: ['TR-4301','TR-4303'] },
  { id: 'TR-4303', feeder: 'FD-05', lat: 29.8500, lng: 77.9550, risk: 19, status: 'healthy', currentLoad: 33, peakLoad: 47, farmers: 17, backup: true, season: 'normal', lastMaintenance: 16, capacity: 100, anomalies: 0, predictedWindow: null, confidence: null, connections: ['TR-4302'] },
  { id: 'TR-4304', feeder: 'FD-05', lat: 29.8650, lng: 77.9530, risk: 10, status: 'healthy', currentLoad: 24, peakLoad: 38, farmers: 14, backup: true, season: 'normal', lastMaintenance: 7, capacity: 100, anomalies: 0, predictedWindow: null, confidence: null, connections: [] },
  // Feeder 06
  { id: 'TR-5401', feeder: 'FD-06', lat: 29.8100, lng: 77.8400, risk: 42, status: 'warning', currentLoad: 47, peakLoad: 61, farmers: 36, backup: false, season: 'peak', lastMaintenance: 52, capacity: 100, anomalies: 1, predictedWindow: null, confidence: null, connections: ['TR-5402'] },
  { id: 'TR-5402', feeder: 'FD-06', lat: 29.8050, lng: 77.8320, risk: 25, status: 'healthy', currentLoad: 36, peakLoad: 50, farmers: 23, backup: true, season: 'normal', lastMaintenance: 22, capacity: 100, anomalies: 0, predictedWindow: null, confidence: null, connections: ['TR-5401'] },
  { id: 'TR-5403', feeder: 'FD-06', lat: 29.8000, lng: 77.8250, risk: 11, status: 'healthy', currentLoad: 22, peakLoad: 36, farmers: 10, backup: true, season: 'normal', lastMaintenance: 5, capacity: 100, anomalies: 0, predictedWindow: null, confidence: null, connections: [] },
  // Feeder 07 (already has TR-2048, TR-1182, TR-3091 above)
  // Feeder 08
  { id: 'TR-6501', feeder: 'FD-08', lat: 29.8900, lng: 77.9300, risk: 46, status: 'warning', currentLoad: 51, peakLoad: 65, farmers: 37, backup: false, season: 'peak', lastMaintenance: 48, capacity: 100, anomalies: 1, predictedWindow: null, confidence: null, connections: ['TR-6502'] },
  { id: 'TR-6502', feeder: 'FD-08', lat: 29.8960, lng: 77.9380, risk: 28, status: 'healthy', currentLoad: 40, peakLoad: 54, farmers: 20, backup: true, season: 'normal', lastMaintenance: 24, capacity: 100, anomalies: 0, predictedWindow: null, confidence: null, connections: ['TR-6501'] },
  { id: 'TR-6503', feeder: 'FD-08', lat: 29.9020, lng: 77.9250, risk: 15, status: 'healthy', currentLoad: 29, peakLoad: 43, farmers: 13, backup: true, season: 'normal', lastMaintenance: 11, capacity: 100, anomalies: 0, predictedWindow: null, confidence: null, connections: [] },
];

// Historical load data generator
function generateLoadHistory(transformer, days = 30) {
  const data = [];
  const baseLoad = transformer.currentLoad * 0.6;
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    const irrigationSpike = (dayOfWeek >= 1 && dayOfWeek <= 5) ? Math.random() * 15 : 0;
    const seasonal = transformer.season === 'peak' ? Math.random() * 10 : 0;
    const deterioration = transformer.risk > 60 ? (days - i) * 0.3 : 0;
    const noise = (Math.random() - 0.5) * 8;
    let load = baseLoad + irrigationSpike + seasonal + deterioration + noise;
    load = Math.max(10, Math.min(98, load));
    data.push({ date: date.toISOString().split('T')[0], load: Math.round(load * 10) / 10 });
  }
  return data;
}

function generateRiskHistory(transformer, days = 30) {
  const data = [];
  const baseRisk = transformer.risk * 0.4;
  for (let i = days; i >= 0; i--) {
    const progress = (days - i) / days;
    const risk = baseRisk + (transformer.risk - baseRisk) * Math.pow(progress, 1.5) + (Math.random() - 0.5) * 5;
    data.push(Math.max(5, Math.min(95, Math.round(risk * 10) / 10)));
  }
  return data;
}

const ANOMALIES = {
  'TR-2048': [
    { date: '08 Aug', event: 'Repeated morning overload', icon: 'alert-triangle' },
    { date: '14 Aug', event: 'Peak duration increasing', icon: 'trending-up' },
    { date: '19 Aug', event: 'Abnormal load recovery', icon: 'activity' },
    { date: '24 Aug', event: 'Sustained high utilization', icon: 'zap' },
    { date: 'Today', event: 'Risk crossed intervention threshold', icon: 'alert-circle' },
  ],
  'TR-1182': [
    { date: '12 Aug', event: 'Evening load spikes detected', icon: 'alert-triangle' },
    { date: '20 Aug', event: 'Load recovery time increasing', icon: 'trending-up' },
    { date: '27 Aug', event: 'Sustained overload pattern', icon: 'zap' },
  ],
  'TR-3091': [
    { date: '10 Aug', event: 'Irregular load fluctuations', icon: 'activity' },
    { date: '18 Aug', event: 'Morning peak exceeding threshold', icon: 'alert-triangle' },
    { date: '25 Aug', event: 'Consecutive overload days', icon: 'trending-up' },
  ],
};

// ============================================================
// 2. UTILITY FUNCTIONS
// ============================================================

function getStatusColor(status) {
  switch (status) {
    case 'healthy': return '#238636';
    case 'warning': return '#D99A00';
    case 'high': return '#E67E22';
    case 'critical': return '#C0392B';
    default: return '#627D98';
  }
}

function getStatusLabel(status) {
  switch (status) {
    case 'healthy': return 'Healthy';
    case 'warning': return 'At Risk';
    case 'high': return 'High Risk';
    case 'critical': return 'Critical';
    default: return 'Unknown';
  }
}

function formatNumber(n) {
  return n.toLocaleString('en-IN');
}

function animateCounter(el, target, duration = 1200) {
  let start = 0;
  const isDecimal = target % 1 !== 0;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    if (isDecimal) {
      el.textContent = current.toFixed(1);
    } else {
      el.textContent = formatNumber(Math.round(current));
    }
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function safeCreateIcons(scope) {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    try {
      if (scope) {
        if (Array.isArray(scope)) {
          scope.forEach(s => lucide.createIcons({ root: s }));
        } else {
          lucide.createIcons({ root: scope });
        }
      } else {
        lucide.createIcons();
      }
    } catch (e) {
      try {
        lucide.createIcons();
      } catch (err) {
        console.warn('Icon render fallback:', err);
      }
    }
  }
}

function showNotification(message, type = 'info') {
  const container = document.getElementById('notification-container');
  if (!container) return;
  const notif = document.createElement('div');
  notif.className = `notification notification-${type}`;
  const iconName = type === 'success' ? 'check-circle' : type === 'warning' ? 'alert-triangle' : type === 'error' ? 'alert-circle' : 'info';
  notif.innerHTML = `<i data-lucide="${iconName}"></i><span>${message}</span>`;
  container.appendChild(notif);
  safeCreateIcons(notif);
  requestAnimationFrame(() => notif.classList.add('show'));
  setTimeout(() => {
    notif.classList.remove('show');
    setTimeout(() => notif.remove(), 300);
  }, 3500);
}

// ============================================================
// 3. NAVIGATION
// ============================================================

let currentPage = '';
let mapInstance = null;
let mapMarkers = [];
let feederLines = [];
let riskMapInstance = null;
let riskMapMarkers = [];
let riskFeederLines = [];
let chartsCreated = {};

function navigateTo(page) {
  if (currentPage === page) return;

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
  });

  // Update nav
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navItem) navItem.classList.add('active');

  // Show target page
  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) {
    targetPage.style.display = 'block';
    requestAnimationFrame(() => {
      targetPage.classList.add('active');
      safeCreateIcons(targetPage);
    });
  }

  currentPage = page;

  // Initialize page-specific content
  switch (page) {
    case 'command-center':
      initCommandCenter();
      break;
    case 'risk-map':
      setTimeout(() => initRiskMap(), 100);
      break;
    case 'predictions':
      initPredictions();
      break;
    case 'network':
      initNetwork();
      break;
    case 'priorities':
      initPriorities();
      break;
    case 'reports':
      initReports();
      break;
  }

  // Close mobile nav
  document.querySelector('.sidebar').classList.remove('open');
}

// ============================================================
// 4. COMMAND CENTER
// ============================================================

let commandCenterInitialized = false;

function initCommandCenter() {
  if (!commandCenterInitialized) {
    // Animate KPIs
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseFloat(el.dataset.counter);
      animateCounter(el, target);
    });

    // Init map
    setTimeout(() => initCommandMap(), 200);

    // Build priority panel
    buildPriorityPanel();

    // Build recent alerts
    buildRecentAlerts();

    commandCenterInitialized = true;
  } else {
    if (mapInstance) mapInstance.invalidateSize();
  }
}

function initCommandMap() {
  if (mapInstance) {
    mapInstance.invalidateSize();
    return;
  }

  mapInstance = L.map('command-map', {
    center: [29.855, 77.895],
    zoom: 13,
    zoomControl: false,
    attributionControl: false,
  });

  L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);

  // Clean OSM tile layer with custom contrast/saturation styling
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(mapInstance);

  addTransformersToMap(mapInstance, mapMarkers, feederLines, false);
}

function addTransformersToMap(map, markersArr, linesArr, fullscreen) {
  // Clear existing
  markersArr.forEach(m => map.removeLayer(m));
  linesArr.forEach(l => map.removeLayer(l));
  markersArr.length = 0;
  linesArr.length = 0;

  const currentFilter = fullscreen
    ? document.getElementById('riskmap-filter')?.value || 'all'
    : document.getElementById('cmd-map-filter')?.value || 'all';

  const filtered = currentFilter === 'all'
    ? TRANSFORMERS
    : TRANSFORMERS.filter(t => t.status === currentFilter);

  // Draw feeder lines
  const drawnConnections = new Set();
  filtered.forEach(t => {
    t.connections.forEach(cId => {
      const key = [t.id, cId].sort().join('-');
      if (drawnConnections.has(key)) return;
      drawnConnections.add(key);
      const connected = TRANSFORMERS.find(x => x.id === cId);
      if (!connected) return;
      if (currentFilter !== 'all' && connected.status !== currentFilter) return;
      const line = L.polyline([[t.lat, t.lng], [connected.lat, connected.lng]], {
        color: '#486581',
        weight: 1.5,
        opacity: 0.35,
        dashArray: '6 4',
      }).addTo(map);
      linesArr.push(line);
    });
  });

  // Draw markers
  filtered.forEach(t => {
    const color = getStatusColor(t.status);
    const size = t.status === 'critical' ? 14 : t.status === 'high' ? 12 : 10;
    const pulseClass = (t.status === 'critical' || t.status === 'high') ? 'marker-pulse' : '';

    const icon = L.divIcon({
      className: 'transformer-marker-wrapper',
      html: `<div class="transformer-marker ${pulseClass}" style="background:${color};width:${size}px;height:${size}px;"></div>`,
      iconSize: [size + 10, size + 10],
      iconAnchor: [(size + 10) / 2, (size + 10) / 2],
    });

    const marker = L.marker([t.lat, t.lng], { icon })
      .addTo(map)
      .on('click', () => openTransformerDetail(t.id));

    marker.bindTooltip(`
      <div class="map-tooltip">
        <div class="map-tooltip-header">${t.id}</div>
        <div class="map-tooltip-row"><span>Risk</span><span style="color:${color};font-weight:600">${t.risk}%</span></div>
        <div class="map-tooltip-row"><span>Farmers</span><span>${t.farmers}</span></div>
        <div class="map-tooltip-row"><span>Load</span><span>${t.currentLoad}%</span></div>
      </div>
    `, { className: 'custom-tooltip', direction: 'top', offset: [0, -10] });

    marker._transformerId = t.id;
    markersArr.push(marker);
  });
}

function buildPriorityPanel() {
  const panel = document.getElementById('priority-action-panel');
  if (!panel) return;

  const top = getTopPriority();
  if (!top) return;

  panel.innerHTML = `
    <div class="priority-panel-header">
      <span class="priority-panel-badge">PRIORITY ACTION</span>
    </div>
    <div class="priority-panel-rank">01</div>
    <div class="priority-panel-id">${top.id}</div>
    <div class="priority-panel-status">
      <span class="status-dot" style="background:${getStatusColor(top.status)}"></span>
      <span class="status-label" style="color:${getStatusColor(top.status)}">${getStatusLabel(top.status).toUpperCase()} RISK</span>
    </div>
    <div class="priority-panel-risk">${top.risk}%</div>
    <p class="priority-panel-rec">Recommended for immediate inspection</p>
    <div class="priority-panel-details">
      <div class="priority-detail-item">
        <i data-lucide="users"></i>
        <span>${top.farmers} farmers affected</span>
      </div>
      <div class="priority-detail-item">
        <i data-lucide="sun"></i>
        <span>${top.season === 'peak' ? 'Peak irrigation season' : 'Normal season'}</span>
      </div>
      <div class="priority-detail-item">
        <i data-lucide="${top.backup ? 'shield-check' : 'shield-off'}"></i>
        <span>${top.backup ? 'Backup available' : 'No backup supply'}</span>
      </div>
      <div class="priority-detail-item">
        <i data-lucide="alert-triangle"></i>
        <span>${top.anomalies} recent overload events</span>
      </div>
    </div>
    <div class="priority-panel-why">
      <h4>WHY THIS ONE?</h4>
      <div class="why-grid">
        <div class="why-item">
          <span class="why-label">Risk</span>
          <span class="why-value" style="color:${getStatusColor(top.status)}">${top.risk}%</span>
        </div>
        <div class="why-item">
          <span class="why-label">Human Impact</span>
          <span class="why-value">High</span>
        </div>
        <div class="why-item">
          <span class="why-label">Season</span>
          <span class="why-value">${top.season === 'peak' ? 'Peak' : 'Normal'}</span>
        </div>
        <div class="why-item">
          <span class="why-label">Backup</span>
          <span class="why-value" style="color:${top.backup ? '#238636' : '#C0392B'}">${top.backup ? 'Available' : 'Unavailable'}</span>
        </div>
      </div>
    </div>
    <div class="priority-panel-action">
      <div class="action-label">RECOMMENDED ACTION</div>
      <div class="action-text">Inspect within 48 hours</div>
    </div>
    <button class="btn-primary priority-cta" onclick="navigateTo('predictions'); setTimeout(()=>selectPrediction('${top.id}'),300)">
      <i data-lucide="eye"></i>
      VIEW PREDICTION
    </button>
  `;
  safeCreateIcons(panel);
}

function buildRecentAlerts() {
  const container = document.getElementById('recent-alerts');
  if (!container) return;

  const critical = TRANSFORMERS.filter(t => t.status === 'critical' || t.status === 'high').slice(0, 5);
  container.innerHTML = critical.map(t => `
    <div class="alert-item" onclick="openTransformerDetail('${t.id}')">
      <span class="status-dot" style="background:${getStatusColor(t.status)}"></span>
      <div class="alert-item-content">
        <span class="alert-item-id">${t.id}</span>
        <span class="alert-item-text">${t.risk}% risk — ${t.predictedWindow || 'Monitoring'}</span>
      </div>
      <i data-lucide="chevron-right" class="alert-chevron"></i>
    </div>
  `).join('');
  safeCreateIcons(container);
}

function getTopPriority() {
  return getPrioritizedList()[0];
}

function getPrioritizedList() {
  return [...TRANSFORMERS]
    .map(t => ({
      ...t,
      priorityScore: computePriority(t),
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

function computePriority(t) {
  const seasonMultiplier = t.season === 'peak' ? 1.25 : 1.0;
  const backupMultiplier = t.backup ? 1.0 : 1.4;
  const farmerFactor = 1 + (t.farmers / 200);
  const anomalyFactor = 1 + ((t.anomalies || 0) * 0.08);
  return Math.pow(t.risk / 100, 1.8) * farmerFactor * seasonMultiplier * backupMultiplier * anomalyFactor * 100;
}

// ============================================================
// 5. TRANSFORMER DETAIL PANEL
// ============================================================

let detailChart = null;

function openTransformerDetail(id) {
  const t = TRANSFORMERS.find(x => x.id === id);
  if (!t) return;

  const panel = document.getElementById('detail-panel');
  const overlay = document.getElementById('detail-overlay');

  // Build content
  const content = document.getElementById('detail-content');
  const loadHistory = generateLoadHistory(t);
  const riskHistory = generateRiskHistory(t);
  const anomalies = ANOMALIES[t.id] || [];

  content.innerHTML = `
    <div class="detail-header-section">
      <div class="detail-id-row">
        <h2 class="detail-id">${t.id}</h2>
        <span class="detail-status-badge" style="background:${getStatusColor(t.status)}20;color:${getStatusColor(t.status)};border:1px solid ${getStatusColor(t.status)}40">${getStatusLabel(t.status).toUpperCase()}</span>
      </div>
      <div class="detail-risk-display">
        <span class="detail-risk-number" style="color:${getStatusColor(t.status)}">${t.risk}%</span>
        <span class="detail-risk-label">Failure Risk</span>
      </div>
      ${t.predictedWindow ? `
      <div class="detail-prediction-window">
        <span class="detail-pred-label">Predicted failure window</span>
        <span class="detail-pred-value">${t.predictedWindow.toUpperCase()}</span>
      </div>` : ''}
    </div>

    <div class="detail-stats-grid">
      <div class="detail-stat">
        <span class="detail-stat-label">Current Load</span>
        <span class="detail-stat-value">${t.currentLoad}%</span>
      </div>
      <div class="detail-stat">
        <span class="detail-stat-label">Peak Load</span>
        <span class="detail-stat-value">${t.peakLoad}%</span>
      </div>
      <div class="detail-stat">
        <span class="detail-stat-label">Farmers Served</span>
        <span class="detail-stat-value">${t.farmers}</span>
      </div>
      <div class="detail-stat">
        <span class="detail-stat-label">Backup</span>
        <span class="detail-stat-value" style="color:${t.backup ? '#238636' : '#C0392B'}">${t.backup ? 'Available' : 'Unavailable'}</span>
      </div>
      <div class="detail-stat">
        <span class="detail-stat-label">Feeder</span>
        <span class="detail-stat-value">${t.feeder}</span>
      </div>
      <div class="detail-stat">
        <span class="detail-stat-label">Last Maintenance</span>
        <span class="detail-stat-value">${t.lastMaintenance} days ago</span>
      </div>
    </div>

    <div class="detail-chart-section">
      <h3 class="detail-section-title">LOAD & RISK — LAST 30 DAYS</h3>
      <div class="detail-chart-container">
        <canvas id="detail-chart"></canvas>
      </div>
    </div>

    ${anomalies.length > 0 ? `
    <div class="detail-patterns-section">
      <h3 class="detail-section-title">DETECTED PATTERNS</h3>
      <div class="pattern-timeline">
        ${anomalies.map((a, i) => `
          <div class="pattern-item ${i === anomalies.length - 1 ? 'pattern-current' : ''}">
            <div class="pattern-line-container">
              <div class="pattern-dot" style="background:${i === anomalies.length - 1 ? getStatusColor(t.status) : '#486581'}"></div>
              ${i < anomalies.length - 1 ? '<div class="pattern-line"></div>' : ''}
            </div>
            <div class="pattern-content">
              <span class="pattern-date">${a.date}</span>
              <span class="pattern-event">${a.event}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="detail-explanation">
      <h3 class="detail-section-title">WHY IS THIS TRANSFORMER AT RISK?</h3>
      <div class="explanation-flow">
        <div class="explanation-step">
          <i data-lucide="zap"></i>
          <span>Repeated irrigation spikes</span>
        </div>
        <div class="explanation-arrow"><i data-lucide="arrow-down"></i></div>
        <div class="explanation-step">
          <i data-lucide="clock"></i>
          <span>Longer overload duration</span>
        </div>
        <div class="explanation-arrow"><i data-lucide="arrow-down"></i></div>
        <div class="explanation-step">
          <i data-lucide="trending-up"></i>
          <span>Increasing stress pattern</span>
        </div>
        <div class="explanation-arrow"><i data-lucide="arrow-down"></i></div>
        <div class="explanation-step final" style="border-color:${getStatusColor(t.status)}">
          <i data-lucide="alert-circle"></i>
          <span>Higher failure probability</span>
        </div>
      </div>
    </div>` : ''}
  `;

  // Show panel
  panel.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';

  // Create chart
  setTimeout(() => {
    createDetailChart(loadHistory, riskHistory, t);
    safeCreateIcons(content);
  }, 100);
}

function closeDetailPanel() {
  const panel = document.getElementById('detail-panel');
  const overlay = document.getElementById('detail-overlay');
  panel.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
  if (detailChart) {
    detailChart.destroy();
    detailChart = null;
  }
}

function createDetailChart(loadHistory, riskHistory, transformer) {
  const ctx = document.getElementById('detail-chart');
  if (!ctx) return;

  if (detailChart) detailChart.destroy();

  const labels = loadHistory.map(d => {
    const date = new Date(d.date);
    return date.getDate() + ' ' + date.toLocaleString('en', { month: 'short' });
  });

  // Find anomaly indices for highlighting
  const anomalyStart = Math.max(0, loadHistory.length - 10);

  detailChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Load %',
          data: loadHistory.map(d => d.load),
          borderColor: '#168AAD',
          backgroundColor: 'rgba(22,138,173,0.08)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: 'Risk Score',
          data: riskHistory,
          borderColor: getStatusColor(transformer.status),
          backgroundColor: `${getStatusColor(transformer.status)}15`,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderDash: [5, 3],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            usePointStyle: true,
            pointStyle: 'line',
            font: { family: 'Inter', size: 11 },
            color: '#627D98',
            padding: 16,
          },
        },
        tooltip: {
          backgroundColor: '#102A43',
          titleFont: { family: 'Inter', size: 12 },
          bodyFont: { family: 'Inter', size: 11 },
          padding: 10,
          cornerRadius: 6,
          displayColors: true,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: 'Inter', size: 10 },
            color: '#627D98',
            maxTicksLimit: 8,
          },
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: '#F0F2F5' },
          ticks: {
            font: { family: 'Inter', size: 10 },
            color: '#627D98',
            callback: v => v + '%',
          },
        },
      },
    },
  });
}

// ============================================================
// 6. RISK MAP (FULL SCREEN)
// ============================================================

function initRiskMap() {
  if (riskMapInstance) {
    riskMapInstance.invalidateSize();
    return;
  }

  riskMapInstance = L.map('riskmap-map', {
    center: [29.855, 77.895],
    zoom: 13,
    zoomControl: false,
    attributionControl: false,
  });

  L.control.zoom({ position: 'bottomright' }).addTo(riskMapInstance);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(riskMapInstance);

  addTransformersToMap(riskMapInstance, riskMapMarkers, riskFeederLines, true);

  // Build side stats
  buildRiskMapStats();
}

function buildRiskMapStats() {
  const container = document.getElementById('riskmap-stats');
  if (!container) return;

  const critical = TRANSFORMERS.filter(t => t.status === 'critical').length;
  const high = TRANSFORMERS.filter(t => t.status === 'high').length;
  const warning = TRANSFORMERS.filter(t => t.status === 'warning').length;
  const healthy = TRANSFORMERS.filter(t => t.status === 'healthy').length;

  container.innerHTML = `
    <div class="riskmap-stat-item">
      <div class="riskmap-stat-number">${((TRANSFORMERS.length - critical - high) / TRANSFORMERS.length * 100).toFixed(1)}%</div>
      <div class="riskmap-stat-label">Network Health</div>
    </div>
    <div class="riskmap-stat-item">
      <span class="status-dot" style="background:#C0392B"></span>
      <div class="riskmap-stat-number">${critical}</div>
      <div class="riskmap-stat-label">Critical</div>
    </div>
    <div class="riskmap-stat-item">
      <span class="status-dot" style="background:#E67E22"></span>
      <div class="riskmap-stat-number">${high}</div>
      <div class="riskmap-stat-label">High Risk</div>
    </div>
    <div class="riskmap-stat-item">
      <span class="status-dot" style="background:#D99A00"></span>
      <div class="riskmap-stat-number">${warning}</div>
      <div class="riskmap-stat-label">At Risk</div>
    </div>
    <div class="riskmap-stat-item">
      <span class="status-dot" style="background:#238636"></span>
      <div class="riskmap-stat-number">${healthy}</div>
      <div class="riskmap-stat-label">Healthy</div>
    </div>
  `;
}

function filterRiskMap(status) {
  // Update buttons
  document.querySelectorAll('.riskmap-filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');

  document.getElementById('riskmap-filter').value = status;

  if (riskMapInstance) {
    addTransformersToMap(riskMapInstance, riskMapMarkers, riskFeederLines, true);
  }
}

function filterCommandMap(status) {
  document.querySelectorAll('.cmd-filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('cmd-map-filter').value = status;
  if (mapInstance) {
    addTransformersToMap(mapInstance, mapMarkers, feederLines, false);
  }
}

function searchTransformer(input, mapRef, markersRef) {
  const query = input.value.trim().toUpperCase();
  if (!query || !mapRef) return;

  const found = TRANSFORMERS.find(t => t.id.includes(query));
  if (found) {
    mapRef.setView([found.lat, found.lng], 15, { animate: true });
    const marker = markersRef.find(m => m._transformerId === found.id);
    if (marker) marker.openTooltip();
    showNotification(`Found ${found.id}`, 'success');
  } else {
    showNotification('No transformer found', 'warning');
  }
}

// ============================================================
// 7. PREDICTIONS PAGE
// ============================================================

let predictionChart = null;

function initPredictions() {
  buildPredictionsList();
  const topPred = TRANSFORMERS.filter(t => t.predictedWindow).sort((a, b) => b.risk - a.risk)[0];
  if (topPred) selectPrediction(topPred.id);
}

function buildPredictionsList() {
  const container = document.getElementById('predictions-list');
  if (!container) return;

  const predictions = TRANSFORMERS.filter(t => t.predictedWindow).sort((a, b) => b.risk - a.risk);
  container.innerHTML = predictions.map(t => `
    <div class="prediction-item ${t.id === 'TR-2048' ? 'active' : ''}" data-id="${t.id}" onclick="selectPrediction('${t.id}')">
      <div class="prediction-item-left">
        <span class="status-dot" style="background:${getStatusColor(t.status)}"></span>
        <span class="prediction-item-id">${t.id}</span>
      </div>
      <div class="prediction-item-right">
        <span class="prediction-item-risk" style="color:${getStatusColor(t.status)}">${t.risk}%</span>
        <span class="prediction-item-window">${t.predictedWindow}</span>
      </div>
    </div>
  `).join('');
}

function selectPrediction(id) {
  const t = TRANSFORMERS.find(x => x.id === id);
  if (!t) return;

  // Update active
  document.querySelectorAll('.prediction-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === id);
  });

  // Update featured
  const featured = document.getElementById('prediction-featured');
  if (featured) {
    featured.innerHTML = `
      <div class="pred-featured-header">
        <div>
          <h3 class="pred-featured-id">${t.id}</h3>
          <span class="pred-featured-feeder">${t.feeder} · ${FEEDERS.find(f => f.id === t.feeder)?.name.split('—')[1]?.trim() || ''}</span>
        </div>
        <div class="pred-featured-risk-block">
          <span class="pred-featured-risk" style="color:${getStatusColor(t.status)}">${t.risk}%</span>
          <span class="pred-featured-risk-label">FAILURE RISK</span>
        </div>
      </div>
      <div class="pred-featured-meta">
        <div class="pred-meta-item">
          <span class="pred-meta-label">Predicted failure window</span>
          <span class="pred-meta-value">${t.predictedWindow}</span>
        </div>
        <div class="pred-meta-item">
          <span class="pred-meta-label">Confidence</span>
          <span class="pred-meta-value">${t.confidence ? t.confidence.toUpperCase() : 'N/A'}</span>
        </div>
        <div class="pred-meta-item">
          <span class="pred-meta-label">Farmers at risk</span>
          <span class="pred-meta-value">${t.farmers}</span>
        </div>
      </div>
    `;
  }

  // Create prediction chart
  setTimeout(() => createPredictionChart(t), 50);
}

function createPredictionChart(transformer) {
  const ctx = document.getElementById('prediction-chart');
  if (!ctx) return;
  if (predictionChart) predictionChart.destroy();

  const loadHistory = generateLoadHistory(transformer, 45);
  const riskHistory = generateRiskHistory(transformer, 45);

  const labels = loadHistory.map((d, i) => {
    const date = new Date(d.date);
    return date.getDate() + ' ' + date.toLocaleString('en', { month: 'short' });
  });

  // Add future prediction labels
  const futureLabels = [];
  const futureRisk = [];
  const now = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    futureLabels.push(d.getDate() + ' ' + d.toLocaleString('en', { month: 'short' }));
    futureRisk.push(Math.min(98, transformer.risk + i * 0.8 + (Math.random() - 0.3) * 3));
  }

  const allLabels = [...labels, ...futureLabels];
  const historicalLoad = [...loadHistory.map(d => d.load), ...new Array(14).fill(null)];
  const fullRisk = [...riskHistory, ...futureRisk];

  // Prediction zone background
  const predictionStart = labels.length;

  predictionChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: allLabels,
      datasets: [
        {
          label: 'Historical Load',
          data: historicalLoad,
          borderColor: '#168AAD',
          backgroundColor: 'rgba(22,138,173,0.06)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
        {
          label: 'Risk Score',
          data: fullRisk,
          borderColor: getStatusColor(transformer.status),
          backgroundColor: `${getStatusColor(transformer.status)}10`,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            usePointStyle: true,
            pointStyle: 'line',
            font: { family: 'Inter', size: 11 },
            color: '#627D98',
            padding: 16,
          },
        },
        tooltip: {
          backgroundColor: '#102A43',
          titleFont: { family: 'Inter', size: 12 },
          bodyFont: { family: 'Inter', size: 11 },
          padding: 10,
          cornerRadius: 6,
        },
        annotation: {
          annotations: {
            todayLine: {
              type: 'line',
              xMin: labels.length - 1,
              xMax: labels.length - 1,
              borderColor: '#102A43',
              borderWidth: 2,
              borderDash: [4, 4],
              label: {
                display: true,
                content: 'TODAY',
                position: 'start',
                backgroundColor: '#102A43',
                color: '#fff',
                font: { family: 'Inter', size: 10, weight: '600' },
                padding: { x: 6, y: 3 },
              },
            },
            predictionZone: {
              type: 'box',
              xMin: labels.length - 1,
              xMax: allLabels.length - 1,
              backgroundColor: `${getStatusColor(transformer.status)}08`,
              borderColor: `${getStatusColor(transformer.status)}30`,
              borderWidth: 1,
              label: {
                display: true,
                content: 'PREDICTED FAILURE WINDOW',
                position: { x: 'center', y: 'start' },
                color: getStatusColor(transformer.status),
                font: { family: 'Inter', size: 10, weight: '600' },
                padding: { x: 6, y: 3 },
              },
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: 'Inter', size: 10 },
            color: '#627D98',
            maxTicksLimit: 10,
          },
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: '#F0F2F5' },
          ticks: {
            font: { family: 'Inter', size: 10 },
            color: '#627D98',
            callback: v => v + '%',
          },
        },
      },
    },
  });
}

// ============================================================
// 8. NETWORK INTELLIGENCE PAGE
// ============================================================

let networkCanvas, networkCtx;
let networkNodes = [];
let networkEdges = [];
let cascadeRunning = false;
let cascadeStep = 0;
let cascadeAnimFrame = null;
let selectedNetworkNode = null;

function initNetwork() {
  networkCanvas = document.getElementById('network-canvas');
  if (!networkCanvas) return;
  networkCtx = networkCanvas.getContext('2d');

  resizeNetworkCanvas();
  buildNetworkGraph();
  drawNetwork();
  buildCascadePanel();

  networkCanvas.addEventListener('click', handleNetworkClick);
  networkCanvas.addEventListener('mousemove', handleNetworkHover);
}

function resizeNetworkCanvas() {
  const container = networkCanvas.parentElement;
  const rect = container.getBoundingClientRect();
  networkCanvas.width = rect.width * window.devicePixelRatio;
  networkCanvas.height = rect.height * window.devicePixelRatio;
  networkCanvas.style.width = rect.width + 'px';
  networkCanvas.style.height = rect.height + 'px';
  networkCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

function buildNetworkGraph() {
  networkNodes = [];
  networkEdges = [];

  // Use a subset of interconnected transformers
  const subset = TRANSFORMERS.filter(t => t.connections.length > 0 || t.risk > 40).slice(0, 16);
  const width = networkCanvas.width / window.devicePixelRatio;
  const height = networkCanvas.height / window.devicePixelRatio;
  const centerX = width / 2;
  const centerY = height / 2;

  // Position nodes in a force-like layout
  subset.forEach((t, i) => {
    const angle = (i / subset.length) * Math.PI * 2 - Math.PI / 2;
    const radius = 140 + (i % 3) * 60;
    const x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 40;
    const y = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 40;

    networkNodes.push({
      ...t,
      x, y,
      displayRisk: t.risk,
      cascadeRisk: 0,
      pulsePhase: Math.random() * Math.PI * 2,
    });
  });

  // Build edges
  const drawn = new Set();
  networkNodes.forEach(node => {
    node.connections.forEach(cId => {
      const key = [node.id, cId].sort().join('-');
      if (drawn.has(key)) return;
      const target = networkNodes.find(n => n.id === cId);
      if (!target) return;
      drawn.add(key);
      networkEdges.push({
        source: node,
        target,
        cascadeProgress: 0,
        active: false,
      });
    });
  });
}

function drawNetwork() {
  if (!networkCtx) return;
  const width = networkCanvas.width / window.devicePixelRatio;
  const height = networkCanvas.height / window.devicePixelRatio;
  networkCtx.clearRect(0, 0, width, height);

  // Draw edges
  networkEdges.forEach(edge => {
    networkCtx.beginPath();
    networkCtx.moveTo(edge.source.x, edge.source.y);
    networkCtx.lineTo(edge.target.x, edge.target.y);

    if (edge.active) {
      networkCtx.strokeStyle = '#168AAD';
      networkCtx.lineWidth = 2.5;
      networkCtx.setLineDash([]);

      // Draw cascade pulse
      if (edge.cascadeProgress > 0 && edge.cascadeProgress < 1) {
        const px = edge.source.x + (edge.target.x - edge.source.x) * edge.cascadeProgress;
        const py = edge.source.y + (edge.target.y - edge.source.y) * edge.cascadeProgress;
        networkCtx.stroke();

        networkCtx.beginPath();
        networkCtx.arc(px, py, 5, 0, Math.PI * 2);
        networkCtx.fillStyle = '#168AAD';
        networkCtx.fill();

        // Glow
        networkCtx.beginPath();
        networkCtx.arc(px, py, 10, 0, Math.PI * 2);
        networkCtx.fillStyle = 'rgba(22,138,173,0.3)';
        networkCtx.fill();
        return;
      }
    } else {
      networkCtx.strokeStyle = 'rgba(72,101,129,0.2)';
      networkCtx.lineWidth = 1;
      networkCtx.setLineDash([4, 4]);
    }
    networkCtx.stroke();
    networkCtx.setLineDash([]);
  });

  // Draw nodes
  networkNodes.forEach(node => {
    const risk = Math.max(node.displayRisk, node.cascadeRisk);
    const color = risk >= 80 ? '#C0392B' : risk >= 60 ? '#E67E22' : risk >= 35 ? '#D99A00' : '#238636';
    const radius = risk >= 80 ? 24 : risk >= 60 ? 20 : 16;

    // Subtle pulse for high risk
    if (risk >= 60) {
      const pulse = Math.sin(Date.now() / 800 + node.pulsePhase) * 0.3 + 0.7;
      networkCtx.beginPath();
      networkCtx.arc(node.x, node.y, radius + 6, 0, Math.PI * 2);
      networkCtx.fillStyle = color.replace(')', `,${pulse * 0.15})`).replace('rgb', 'rgba');
      // Approximate: just use a low opacity fill
      networkCtx.fillStyle = `${color}20`;
      networkCtx.fill();
    }

    // Main circle
    networkCtx.beginPath();
    networkCtx.arc(node.x, node.y, radius, 0, Math.PI * 2);
    networkCtx.fillStyle = '#fff';
    networkCtx.fill();
    networkCtx.strokeStyle = color;
    networkCtx.lineWidth = 2.5;
    networkCtx.stroke();

    // Inner filled circle
    networkCtx.beginPath();
    networkCtx.arc(node.x, node.y, radius - 5, 0, Math.PI * 2);
    networkCtx.fillStyle = `${color}25`;
    networkCtx.fill();

    // Label
    networkCtx.fillStyle = '#102A43';
    networkCtx.font = '600 10px Inter';
    networkCtx.textAlign = 'center';
    networkCtx.fillText(node.id, node.x, node.y - radius - 8);

    // Risk text
    networkCtx.fillStyle = color;
    networkCtx.font = '700 11px Inter';
    networkCtx.fillText(Math.round(risk) + '%', node.x, node.y + 4);
  });

  if (cascadeRunning) {
    requestAnimationFrame(drawNetwork);
  }
}

function handleNetworkClick(e) {
  const rect = networkCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const clicked = networkNodes.find(n => {
    const dx = n.x - x;
    const dy = n.y - y;
    return Math.sqrt(dx * dx + dy * dy) < 24;
  });

  if (clicked) {
    selectedNetworkNode = clicked;
    openTransformerDetail(clicked.id);
  }
}

function handleNetworkHover(e) {
  const rect = networkCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const hovered = networkNodes.find(n => {
    const dx = n.x - x;
    const dy = n.y - y;
    return Math.sqrt(dx * dx + dy * dy) < 24;
  });

  networkCanvas.style.cursor = hovered ? 'pointer' : 'default';
}

function simulateCascade() {
  if (cascadeRunning) return;

  // Reset
  networkNodes.forEach(n => n.cascadeRisk = 0);
  networkEdges.forEach(e => { e.cascadeProgress = 0; e.active = false; });

  // Start from highest risk node
  const source = networkNodes.reduce((a, b) => a.risk > b.risk ? a : b);
  cascadeRunning = true;
  cascadeStep = 0;

  showNotification('Simulating cascade propagation...', 'info');

  // Animate cascade
  const propagate = (currentNodes, depth) => {
    if (depth > 3 || currentNodes.length === 0) {
      setTimeout(() => {
        cascadeRunning = false;
        showNotification('Cascade simulation complete', 'success');
        updateCascadePanel(source);
        drawNetwork();
      }, 500);
      return;
    }

    const nextNodes = [];
    currentNodes.forEach(node => {
      networkEdges.forEach(edge => {
        let target = null;
        if (edge.source.id === node.id) target = edge.target;
        if (edge.target.id === node.id) target = edge.source;
        if (!target || target.cascadeRisk > 0) return;

        edge.active = true;

        // Animate edge
        let progress = 0;
        const edgeCopy = edge;
        const animateEdge = () => {
          progress += 0.025;
          if (edge.source.id === node.id) {
            edgeCopy.cascadeProgress = progress;
          } else {
            edgeCopy.cascadeProgress = 1 - progress;
          }
          if (progress < 1) {
            requestAnimationFrame(animateEdge);
          } else {
            edgeCopy.cascadeProgress = 1;
            target.cascadeRisk = Math.min(target.risk + 15 - depth * 3, 95);
            nextNodes.push(target);
          }
        };
        animateEdge();
      });
    });

    setTimeout(() => propagate(nextNodes, depth + 1), 1200);
  };

  source.cascadeRisk = source.risk;
  drawNetwork();
  propagate([source], 0);
}

function buildCascadePanel() {
  const panel = document.getElementById('cascade-panel');
  if (!panel) return;

  panel.innerHTML = `
    <h4 class="cascade-panel-title">POTENTIAL CASCADE</h4>
    <p class="cascade-panel-desc">Click "Simulate Cascade" to visualize how a transformer failure could propagate through the feeder network.</p>
    <div id="cascade-results"></div>
    <div class="cascade-label">SIMULATED NETWORK PROPAGATION</div>
  `;
}

function updateCascadePanel(source) {
  const results = document.getElementById('cascade-results');
  if (!results) return;

  const affected = networkNodes.filter(n => n.cascadeRisk > 0 && n.id !== source.id);

  results.innerHTML = `
    <div class="cascade-flow">
      <div class="cascade-node source">
        <span class="cascade-node-id">${source.id}</span>
        <span class="cascade-node-risk" style="color:${getStatusColor(source.status)}">${source.risk}%</span>
      </div>
      ${affected.map(n => `
        <div class="cascade-arrow"><i data-lucide="arrow-down"></i></div>
        <div class="cascade-node">
          <span class="cascade-node-id">${n.id}</span>
          <span class="cascade-node-risk" style="color:#E67E22">${Math.round(n.cascadeRisk)}%</span>
        </div>
      `).join('')}
    </div>
    <p class="cascade-impact">${affected.length} neighboring transformer${affected.length !== 1 ? 's' : ''} may experience elevated stress.</p>
  `;

  safeCreateIcons(results);
}

// ============================================================
// 9. MAINTENANCE PRIORITIES PAGE
// ============================================================

let prioritySortField = 'priorityScore';
let prioritySortDir = 'desc';
let priorityFilterStatus = 'all';

function initPriorities() {
  renderPriorityTable();
  buildPrioritizationVisual();
}

function renderPriorityTable() {
  const container = document.getElementById('priority-table-body');
  if (!container) return;

  let list = getPrioritizedList();

  // Filter
  if (priorityFilterStatus !== 'all') {
    list = list.filter(t => t.status === priorityFilterStatus);
  }

  // Sort
  list.sort((a, b) => {
    let av = a[prioritySortField];
    let bv = b[prioritySortField];
    if (typeof av === 'string') av = av.toLowerCase();
    if (typeof bv === 'string') bv = bv.toLowerCase();
    return prioritySortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
  });

  container.innerHTML = list.map((t, i) => {
    const actionLabel = t.risk >= 80 ? 'INSPECT NOW' : t.risk >= 60 ? 'INSPECT WITHIN 48H' : t.risk >= 40 ? 'MONITOR' : 'PLAN INSPECTION';
    const actionClass = t.risk >= 80 ? 'action-critical' : t.risk >= 60 ? 'action-high' : t.risk >= 40 ? 'action-warning' : 'action-normal';

    return `
      <tr class="priority-row" onclick="openTransformerDetail('${t.id}')">
        <td class="priority-rank">${String(i + 1).padStart(2, '0')}</td>
        <td class="priority-id-cell">
          <span class="priority-id">${t.id}</span>
          <span class="priority-feeder">${t.feeder}</span>
        </td>
        <td>
          <div class="priority-risk-bar">
            <div class="priority-risk-fill" style="width:${t.risk}%;background:${getStatusColor(t.status)}"></div>
          </div>
          <span class="priority-risk-text" style="color:${getStatusColor(t.status)}">${t.risk}%</span>
        </td>
        <td>${t.farmers}</td>
        <td><span class="season-badge ${t.season}">${t.season === 'peak' ? 'Peak' : 'Normal'}</span></td>
        <td><span class="backup-badge ${t.backup ? 'available' : 'unavailable'}">${t.backup ? 'Yes' : 'No'}</span></td>
        <td><span class="action-badge ${actionClass}">${actionLabel}</span></td>
      </tr>
    `;
  }).join('');

  // Update empty state
  if (list.length === 0) {
    container.innerHTML = `<tr><td colspan="7" class="empty-state">No transformers match the selected filters.</td></tr>`;
  }
}

function sortPriority(field) {
  if (prioritySortField === field) {
    prioritySortDir = prioritySortDir === 'asc' ? 'desc' : 'asc';
  } else {
    prioritySortField = field;
    prioritySortDir = 'desc';
  }
  renderPriorityTable();
}

function filterPriority(status) {
  priorityFilterStatus = status;
  document.querySelectorAll('.priority-filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderPriorityTable();
}

function searchPriority(query) {
  const rows = document.querySelectorAll('.priority-row');
  const q = query.toUpperCase();
  rows.forEach(row => {
    const id = row.querySelector('.priority-id')?.textContent || '';
    row.style.display = id.includes(q) || !q ? '' : 'none';
  });
}

function buildPrioritizationVisual() {
  const container = document.getElementById('prioritization-visual');
  if (!container) return;

  const top = getTopPriority();
  if (!top) return;

  container.innerHTML = `
    <div class="prioritization-model">
      <h3 class="prioritization-title">PRIORITIZATION MODEL</h3>
      <div class="prioritization-factors">
        <div class="factor-block">
          <div class="factor-label">Technical Risk</div>
          <div class="factor-value">${top.risk}%</div>
        </div>
        <div class="factor-operator">×</div>
        <div class="factor-block">
          <div class="factor-label">Human Impact</div>
          <div class="factor-value">${top.farmers} farmers</div>
        </div>
        <div class="factor-operator">×</div>
        <div class="factor-block">
          <div class="factor-label">Season</div>
          <div class="factor-value">${top.season === 'peak' ? '1.25×' : '1.0×'}</div>
        </div>
        <div class="factor-operator">×</div>
        <div class="factor-block">
          <div class="factor-label">Backup</div>
          <div class="factor-value">${top.backup ? '1.0×' : '1.4×'}</div>
        </div>
      </div>
      <div class="factor-result">
        <div class="factor-equals">=</div>
        <div class="factor-block result">
          <div class="factor-label">Intervention Priority</div>
          <div class="factor-value" style="color:#C0392B">HIGH PRIORITY</div>
        </div>
      </div>
      <p class="prioritization-disclaimer">Demo prioritization model — weights shown for illustration.</p>
    </div>
  `;
}

// ============================================================
// 10. REPORTS PAGE
// ============================================================

function initReports() {
  createHealthDistributionChart();
  createRiskDistributionChart();
  createNetworkHealthChart();
  createInterventionsChart();
  buildImpactSnapshot();
}

function createHealthDistributionChart() {
  const ctx = document.getElementById('health-dist-chart');
  if (!ctx) return;
  if (chartsCreated['healthDist']) chartsCreated['healthDist'].destroy();

  const counts = {
    healthy: TRANSFORMERS.filter(t => t.status === 'healthy').length,
    warning: TRANSFORMERS.filter(t => t.status === 'warning').length,
    high: TRANSFORMERS.filter(t => t.status === 'high').length,
    critical: TRANSFORMERS.filter(t => t.status === 'critical').length,
  };

  chartsCreated['healthDist'] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Healthy', 'At Risk', 'High Risk', 'Critical'],
      datasets: [{
        data: [counts.healthy, counts.warning, counts.high, counts.critical],
        backgroundColor: ['#238636', '#D99A00', '#E67E22', '#C0392B'],
        borderWidth: 2,
        borderColor: '#fff',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            font: { family: 'Inter', size: 11 },
            color: '#627D98',
            padding: 16,
          },
        },
      },
    },
  });
}

function createRiskDistributionChart() {
  const ctx = document.getElementById('risk-dist-chart');
  if (!ctx) return;
  if (chartsCreated['riskDist']) chartsCreated['riskDist'].destroy();

  const ranges = [
    { label: '0-20%', min: 0, max: 20 },
    { label: '21-40%', min: 21, max: 40 },
    { label: '41-60%', min: 41, max: 60 },
    { label: '61-80%', min: 61, max: 80 },
    { label: '81-100%', min: 81, max: 100 },
  ];

  const data = ranges.map(r => TRANSFORMERS.filter(t => t.risk >= r.min && t.risk <= r.max).length);

  chartsCreated['riskDist'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ranges.map(r => r.label),
      datasets: [{
        label: 'Transformers',
        data,
        backgroundColor: ['#238636', '#D99A00', '#D99A00', '#E67E22', '#C0392B'],
        borderRadius: 4,
        barThickness: 32,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Inter', size: 11 }, color: '#627D98' },
        },
        y: {
          beginAtZero: true,
          grid: { color: '#F0F2F5' },
          ticks: {
            font: { family: 'Inter', size: 11 },
            color: '#627D98',
            stepSize: 2,
          },
        },
      },
    },
  });
}

function createNetworkHealthChart() {
  const ctx = document.getElementById('network-health-chart');
  if (!ctx) return;
  if (chartsCreated['networkHealth']) chartsCreated['networkHealth'].destroy();

  const labels = [];
  const data = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i);
    labels.push(d.toLocaleString('en', { month: 'short' }));
    data.push(88 + Math.random() * 8 - i * 0.3);
  }

  chartsCreated['networkHealth'] = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Network Health %',
        data: data.map(d => Math.round(d * 10) / 10),
        borderColor: '#168AAD',
        backgroundColor: 'rgba(22,138,173,0.08)',
        fill: true,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#168AAD',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Inter', size: 11 }, color: '#627D98' },
        },
        y: {
          min: 80,
          max: 100,
          grid: { color: '#F0F2F5' },
          ticks: {
            font: { family: 'Inter', size: 11 },
            color: '#627D98',
            callback: v => v + '%',
          },
        },
      },
    },
  });
}

function createInterventionsChart() {
  const ctx = document.getElementById('interventions-chart');
  if (!ctx) return;
  if (chartsCreated['interventions']) chartsCreated['interventions'].destroy();

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const predicted = [3, 5, 4, 7, 6, 8, 10, 12];
  const actioned = [2, 4, 3, 5, 5, 6, 8, 9];

  chartsCreated['interventions'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Predicted Failures',
          data: predicted,
          backgroundColor: '#E67E22',
          borderRadius: 4,
          barThickness: 20,
        },
        {
          label: 'Interventions Made',
          data: actioned,
          backgroundColor: '#168AAD',
          borderRadius: 4,
          barThickness: 20,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            font: { family: 'Inter', size: 11 },
            color: '#627D98',
            padding: 16,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Inter', size: 11 }, color: '#627D98' },
        },
        y: {
          beginAtZero: true,
          grid: { color: '#F0F2F5' },
          ticks: { font: { family: 'Inter', size: 11 }, color: '#627D98' },
        },
      },
    },
  });
}

function buildImpactSnapshot() {
  const container = document.getElementById('impact-snapshot');
  if (!container) return;

  container.innerHTML = `
    <div class="impact-grid">
      <div class="impact-item">
        <div class="impact-number">38</div>
        <div class="impact-label">Potential failures identified</div>
      </div>
      <div class="impact-item">
        <div class="impact-number">87</div>
        <div class="impact-label">High-risk transformers</div>
      </div>
      <div class="impact-item">
        <div class="impact-number">2,840</div>
        <div class="impact-label">Farmers potentially protected</div>
      </div>
      <div class="impact-item">
        <div class="impact-number">24</div>
        <div class="impact-label">Recommended interventions</div>
      </div>
    </div>
  `;
}

function exportReport() {
  showNotification('Report export simulated — feature available in production.', 'success');
}

function downloadSummary() {
  showNotification('Summary download simulated — feature available in production.', 'success');
}

// ============================================================
// 11. CASCADE TOGGLE ON MAPS
// ============================================================

function toggleCascadeMap(mapRef, markersRef, linesRef) {
  const btn = event.target;
  const isActive = btn.classList.toggle('active');

  if (isActive) {
    // Highlight connections of critical nodes
    const criticalNodes = TRANSFORMERS.filter(t => t.status === 'critical' || t.status === 'high');
    linesRef.forEach(line => {
      line.setStyle({ color: '#168AAD', weight: 2.5, opacity: 0.6, dashArray: '' });
    });
    showNotification('Cascade connections highlighted', 'info');
  } else {
    linesRef.forEach(line => {
      line.setStyle({ color: '#486581', weight: 1.5, opacity: 0.35, dashArray: '6 4' });
    });
  }
}

// ============================================================
// 12. INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Set up navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navigateTo(item.dataset.page);
    });
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('mobile-menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.querySelector('.sidebar').classList.toggle('open');
    });
  }

  // Detail panel close
  document.getElementById('detail-close')?.addEventListener('click', closeDetailPanel);
  document.getElementById('detail-overlay')?.addEventListener('click', closeDetailPanel);

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDetailPanel();
  });

  // Window resize
  window.addEventListener('resize', () => {
    if (mapInstance) setTimeout(() => mapInstance.invalidateSize(), 100);
    if (riskMapInstance) setTimeout(() => riskMapInstance.invalidateSize(), 100);
    if (networkCanvas && currentPage === 'network') {
      resizeNetworkCanvas();
      buildNetworkGraph();
      drawNetwork();
    }
  });

  // Initialize all Lucide icons
  safeCreateIcons();

  // Initial page load
  navigateTo('command-center');

  // Show loading then operational
  setTimeout(() => {
    showNotification('Analyzing transformer network...', 'info');
  }, 400);
  setTimeout(() => {
    showNotification('Risk analysis updated — 3 transformers require immediate attention.', 'warning');
  }, 2200);
});
