import React from 'react';
import { MapPin, Navigation2, Bike, Building2, Footprints } from 'lucide-react';

export default function CampusMap({ 
  parkingLots, 
  selectedLot, 
  onSelectLot, 
  selectedBuilding, 
  lang 
}) {
  const isVi = lang === 'vi';

  const getStatusColor = (status) => {
    switch (status) {
      case 'green':
        return { fill: '#10b981', stroke: '#059669', badgeBg: 'bg-emerald-500', text: 'text-emerald-400' };
      case 'yellow':
        return { fill: '#f59e0b', stroke: '#d97706', badgeBg: 'bg-amber-500', text: 'text-amber-400' };
      case 'red':
      default:
        return { fill: '#ef4444', stroke: '#dc2626', badgeBg: 'bg-rose-500', text: 'text-rose-400' };
    }
  };

  // Convert percentages (0-100) to SVG viewbox coords (0-800, 0-500)
  const toX = (p) => (p / 100) * 800;
  const toY = (p) => (p / 100) * 500;

  const currentWalkingInfo = selectedLot?.walkingInfo?.[selectedBuilding.id];

  return (
    <div className="relative w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Map Header Bar */}
      <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Navigation2 className="w-4 h-4 text-sky-400" />
          <span className="font-bold text-slate-200">
            {isVi ? 'Bản Đồ Khuôn Viên Số (Campus GIS)' : 'キャンパスGISマップ'}
          </span>
          <span className="text-slate-400">
            {isVi ? '• Chạm vào nhà xe để xem tình trạng' : '• 駐輪場をタップして状態確認'}
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-slate-300">{isVi ? 'Còn chỗ' : '空きあり'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-slate-300">{isVi ? 'Sắp đầy' : '混雑'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-slate-300">{isVi ? 'Hết chỗ' : '満車'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-sky-500"></span>
            <span className="text-slate-300">{isVi ? 'Phòng học' : '教室'}</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[500px]">
        <svg 
          viewBox="0 0 800 500" 
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background ground & roads */}
          <rect width="800" height="500" fill="#090d16" />
          
          {/* Campus green lawns */}
          <rect x="40" y="40" width="220" height="180" rx="16" fill="#0f1f1a" opacity="0.6" />
          <rect x="300" y="320" width="300" height="140" rx="16" fill="#0f1f1a" opacity="0.6" />
          <rect x="520" y="40" width="240" height="160" rx="16" fill="#0f1f1a" opacity="0.6" />

          {/* Internal Roads / Pathways */}
          {/* Main Loop Road */}
          <path 
            d="M 120 70 L 680 70 Q 720 70 720 120 L 720 400 Q 720 440 680 440 L 120 440 Q 80 440 80 400 L 80 120 Q 80 70 120 70 Z" 
            fill="none" 
            stroke="#1e293b" 
            strokeWidth="32" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M 120 70 L 680 70 Q 720 70 720 120 L 720 400 Q 720 440 680 440 L 120 440 Q 80 440 80 400 L 80 120 Q 80 70 120 70 Z" 
            fill="none" 
            stroke="#334155" 
            strokeWidth="4" 
            strokeDasharray="8 8" 
          />

          {/* Cross avenues */}
          <path d="M 80 250 L 720 250" stroke="#1e293b" strokeWidth="26" />
          <path d="M 400 70 L 400 440" stroke="#1e293b" strokeWidth="26" />
          <path d="M 80 250 L 720 250" stroke="#334155" strokeWidth="3" strokeDasharray="6 6" />
          <path d="M 400 70 L 400 440" stroke="#334155" strokeWidth="3" strokeDasharray="6 6" />

          {/* Pedestrian walkways */}
          <path d="M 250 160 L 380 175 L 440 230" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 4" opacity="0.4" />
          <path d="M 440 230 L 520 375" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 4" opacity="0.4" />

          {/* Active Walking Route (if a lot is selected) */}
          {selectedLot && (
            <g>
              {/* Route line */}
              <line
                x1={toX(selectedLot.coordinates.x)}
                y1={toY(selectedLot.coordinates.y)}
                x2={toX(selectedBuilding.coordinates.x)}
                y2={toY(selectedBuilding.coordinates.y)}
                stroke="#38bdf8"
                strokeWidth="5"
                strokeDasharray="8 8"
                strokeLinecap="round"
                className="animate-pulse"
              />
              {/* Walking time badge on mid-point of route */}
              <g 
                transform={`translate(${
                  (toX(selectedLot.coordinates.x) + toX(selectedBuilding.coordinates.x)) / 2
                }, ${
                  (toY(selectedLot.coordinates.y) + toY(selectedBuilding.coordinates.y)) / 2 - 14
                })`}
              >
                <rect 
                  x="-60" 
                  y="-14" 
                  width="120" 
                  height="26" 
                  rx="13" 
                  fill="#0369a1" 
                  stroke="#38bdf8" 
                  strokeWidth="1.5" 
                  className="shadow-lg"
                />
                <text 
                  x="0" 
                  y="4" 
                  textAnchor="middle" 
                  fill="#ffffff" 
                  fontSize="11" 
                  fontWeight="bold"
                >
                  🚶 {currentWalkingInfo ? `${currentWalkingInfo.walkMinutes} ${isVi ? 'phút' : '分'} (${currentWalkingInfo.distanceM}m)` : `~4 ${isVi ? 'phút' : '分'}`}
                </text>
              </g>
            </g>
          )}

          {/* Building Pins (Destinations) */}
          {/* Target Building highlight ring */}
          <circle
            cx={toX(selectedBuilding.coordinates.x)}
            cy={toY(selectedBuilding.coordinates.y)}
            r="30"
            fill="#38bdf8"
            opacity="0.15"
            className="animate-ping-slow"
          />
          <g 
            transform={`translate(${toX(selectedBuilding.coordinates.x)}, ${toY(selectedBuilding.coordinates.y)})`}
            className="cursor-pointer"
          >
            <rect 
              x="-40" 
              y="-28" 
              width="80" 
              height="40" 
              rx="8" 
              fill="#0284c7" 
              stroke="#e0f2fe" 
              strokeWidth="2" 
              className="shadow-lg filter drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
            />
            <text x="0" y="-8" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">
              {selectedBuilding.shortName}
            </text>
            <text x="0" y="6" textAnchor="middle" fill="#bae6fd" fontSize="9" fontWeight="600">
              {isVi ? 'ĐÍCH ĐẾN' : '目的地'}
            </text>
          </g>

          {/* Other Buildings footprint */}
          <rect x="210" y="270" width="70" height="40" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="245" y="295" textAnchor="middle" fill="#94a3b8" fontSize="10">Ký Túc Xá</text>

          <rect x="420" y="350" width="75" height="40" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x="457" y="375" textAnchor="middle" fill="#94a3b8" fontSize="10">Thư Viện</text>

          {/* Parking Lot Nodes */}
          {parkingLots.map((lot) => {
            const isSelected = selectedLot?.id === lot.id;
            const style = getStatusColor(lot.status);
            const posX = toX(lot.coordinates.x);
            const posY = toY(lot.coordinates.y);

            return (
              <g 
                key={lot.id} 
                transform={`translate(${posX}, ${posY})`}
                onClick={() => onSelectLot(lot)}
                className="cursor-pointer group"
              >
                {/* Glow ring if selected */}
                {isSelected && (
                  <circle
                    cx="0"
                    cy="0"
                    r="34"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                    className="animate-ping"
                  />
                )}

                {/* Main Lot Circle */}
                <circle
                  cx="0"
                  cy="0"
                  r={isSelected ? "26" : "22"}
                  fill={style.fill}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="transition-transform group-hover:scale-110 shadow-xl"
                />

                {/* Parking 'P' or bike icon symbol */}
                <text 
                  x="0" 
                  y="6" 
                  textAnchor="middle" 
                  fill="#ffffff" 
                  fontSize={isSelected ? "16" : "14"} 
                  fontWeight="900"
                >
                  P
                </text>

                {/* Label Box below */}
                <g transform="translate(0, 32)">
                  <rect
                    x="-55"
                    y="-12"
                    width="110"
                    height="24"
                    rx="6"
                    fill="#0f172a"
                    stroke={isSelected ? "#38bdf8" : "#334155"}
                    strokeWidth={isSelected ? "2" : "1"}
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {lot.shortName}
                  </text>
                </g>

                {/* Spot count badge */}
                <g transform="translate(18, -14)">
                  <rect
                    x="-18"
                    y="-9"
                    width="36"
                    height="18"
                    rx="9"
                    fill={lot.status === 'red' ? '#991b1b' : '#065f46'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="800"
                  >
                    {lot.status === 'red' ? 'HẾT' : `${lot.availableSpots}`}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Selected Lot floating mini-hud */}
        {selectedLot && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-2xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className={`w-3 h-3 rounded-full shrink-0 ${getStatusColor(selectedLot.status).badgeBg}`}></div>
              <div>
                <div className="font-bold text-white text-sm">
                  {isVi ? selectedLot.name : selectedLot.nameJa}
                </div>
                <div className="text-slate-400">
                  {selectedLot.status === 'red'
                    ? (isVi ? '⚠️ Hết chỗ • Đang ùn tắc' : '⚠️ 満車・混雑中')
                    : (isVi ? `Còn ${selectedLot.availableSpots} chỗ trống • Vào gửi ngay` : `空き${selectedLot.availableSpots}台・即駐輪可能`)}
                </div>
              </div>
            </div>
            <button
              onClick={() => onSelectLot(selectedLot)}
              className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold shrink-0 transition-colors"
            >
              {isVi ? 'Chọn bãi này' : '選択'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

