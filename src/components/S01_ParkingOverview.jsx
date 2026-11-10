import React, { useState } from 'react';
import { 
  Bike, 
  MapPin, 
  Clock, 
  Footprints, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Filter, 
  Map, 
  ListFilter,
  Users,
  Shield,
  TrendingDown
} from 'lucide-react';
import CampusMap from './CampusMap';

export default function S01_ParkingOverview({ 
  parkingLots, 
  selectedBuilding, 
  onSelectLotDirectly, 
  communityReports,
  lang 
}) {
  const isVi = lang === 'vi';
  const [filterStatus, setFilterStatus] = useState('all'); // all | green | yellow | red
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // list | map
  const [highlightedLot, setHighlightedLot] = useState(null);

  // Filter lots
  const filteredLots = parkingLots.filter(lot => {
    const matchesFilter = filterStatus === 'all' || lot.status === filterStatus;
    const matchesSearch = lot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lot.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate totals
  const totalFreeSpots = parkingLots.reduce((acc, l) => acc + l.availableSpots, 0);
  const totalLotsReady = parkingLots.filter(l => l.status !== 'red').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Screen Title & Flow Banner */}
      <div className="bg-gradient-to-r from-sky-950/70 via-slate-900 to-indigo-950/60 border border-sky-800/40 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-sky-500 text-slate-950 tracking-wider">
                S01
              </span>
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wide">
                {isVi ? 'Tổng quan bãi xe theo thời gian thực' : '駐輪場空き状況一覧（リアルタイム）'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              {isVi ? 'Tìm Bãi Đỗ Xe & Giữ Đúng Giờ Lên Lớp' : '駐輪場を選んで最短時間で教室へ'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {isVi 
                ? `Đang tính lộ trình đến ${selectedBuilding.name}. Chọn một bãi xe bạn dự định gửi để xem chỉ dẫn chi tiết.`
                : `${selectedBuilding.nameJa} への最短ルートを算出中。利用したい駐輪場を選択してください。`}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 sm:border-l sm:border-slate-800 sm:pl-4">
            <div className="bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700/80">
              <div className="text-[10px] text-slate-400 font-medium">
                {isVi ? 'Chỗ trống toàn trường' : '全学空き台数'}
              </div>
              <div className="text-lg font-black text-emerald-400">
                {totalFreeSpots} <span className="text-xs font-normal text-slate-300">{isVi ? 'chỗ' : '台'}</span>
              </div>
            </div>
            <div className="bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700/80">
              <div className="text-[10px] text-slate-400 font-medium">
                {isVi ? 'Bãi sẵn sàng' : '利用可能'}
              </div>
              <div className="text-lg font-black text-sky-400">
                {totalLotsReady}/{parkingLots.length} <span className="text-xs font-normal text-slate-300">{isVi ? 'bãi' : '箇所'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls: Search, Filter & View Mode */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isVi ? "Tìm theo tên nhà xe, khu vực..." : "駐輪場名・エリアで検索..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filter Pills & View Mode */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter buttons */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filterStatus === 'all' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isVi ? 'Tất cả' : 'すべて'}
            </button>
            <button
              onClick={() => setFilterStatus('green')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                filterStatus === 'green' ? 'bg-emerald-600 text-white shadow' : 'text-emerald-400 hover:bg-slate-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {isVi ? 'Còn chỗ' : '空き'}
            </button>
            <button
              onClick={() => setFilterStatus('yellow')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                filterStatus === 'yellow' ? 'bg-amber-600 text-white shadow' : 'text-amber-400 hover:bg-slate-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              {isVi ? 'Sắp đầy' : '混雑'}
            </button>
            <button
              onClick={() => setFilterStatus('red')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                filterStatus === 'red' ? 'bg-rose-600 text-white shadow' : 'text-rose-400 hover:bg-slate-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              {isVi ? 'Hết chỗ' : '満車'}
            </button>
          </div>

          {/* Toggle Map / List view */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title={isVi ? "Xem dạng danh sách thẻ" : "一覧リスト表示"}
            >
              <ListFilter className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'map' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title={isVi ? "Xem trên bản đồ khuôn viên" : "キャンパスマップ表示"}
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Map View Mode */}
      {viewMode === 'map' && (
        <div className="space-y-4">
          <CampusMap
            parkingLots={parkingLots}
            selectedLot={highlightedLot}
            onSelectLot={(lot) => onSelectLotDirectly(lot)}
            selectedBuilding={selectedBuilding}
            lang={lang}
          />
          <div className="text-center text-xs text-slate-400">
            {isVi 
              ? '💡 Nhấn vào một nhà xe trên bản đồ để kích hoạt luồng kiểm tra tình trạng (Ảnh 1)' 
              : '💡 マップ上の駐輪場をタップして詳細または迂回案内へ進みます'}
          </div>
        </div>
      )}

      {/* List View Mode: Parking Lot Cards */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLots.map((lot) => {
            const walking = lot.walkingInfo?.[selectedBuilding.id] || {
              walkMinutes: 4,
              distanceM: 250,
              parkingTimeMin: 2
            };
            const totalEstimatedTime = walking.walkMinutes + (lot.avgWaitTimeMin || 2);
            const isFull = lot.status === 'red';

            return (
              <div
                key={lot.id}
                onClick={() => onSelectLotDirectly(lot)}
                className={`group relative rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isFull
                    ? 'bg-gradient-to-br from-rose-950/30 via-slate-900 to-slate-900 border-rose-800/60 hover:border-rose-500 hover:shadow-lg hover:shadow-rose-500/10'
                    : lot.status === 'yellow'
                    ? 'bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border-amber-800/60 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/10'
                    : 'bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900 border-emerald-800/60 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10'
                }`}
              >
                {/* Recommended Alternative Badge if applicable */}
                {lot.isRecommendedAlternative && (
                  <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-[11px] font-black shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {isVi ? 'ĐỀ XUẤT TỐI ƯU GIAO CA' : '一番おすすめ'}
                  </div>
                )}

                <div>
                  {/* Top Bar: Code + Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {lot.code}
                    </span>

                    {/* Status Pill */}
                    {isFull ? (
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5 animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        {isVi ? 'HẾT CHỖ (ĐỎ)' : '満車 (赤)'}
                      </span>
                    ) : lot.status === 'yellow' ? (
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        {isVi ? 'SẮP ĐẦY (VÀNG)' : '混雑 (黄)'}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        {isVi ? 'CÒN CHỖ (XANH)' : '空きあり (緑)'}
                      </span>
                    )}
                  </div>

                  {/* Lot Name & Type */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {isVi ? lot.name : lot.nameJa}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <span>{isVi ? lot.type : lot.typeJa}</span>
                    <span>•</span>
                    <span>{lot.coverType}</span>
                  </p>

                  {/* Real-time Status Details */}
                  <div className="mt-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{isVi ? 'Chỗ trống hiện tại:' : '現在の空き台数:'}</span>
                      <span className={`font-black text-sm ${isFull ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {isFull ? (isVi ? '0 chỗ (Kín 100%)' : '0台 (満車)') : `${lot.availableSpots}/${lot.capacity} chỗ`}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          isFull ? 'bg-rose-500 w-full' : lot.status === 'yellow' ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${Math.min(100, ((lot.capacity - lot.availableSpots) / lot.capacity) * 100)}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {lot.queueCount > 0 
                          ? (isVi ? `Hàng đợi: ~${lot.queueCount} xe` : `待機列: 約${lot.queueCount}台`) 
                          : (isVi ? 'Không cần xếp hàng' : '待機列なし')}
                      </span>
                      <span>{lot.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Description quote */}
                  <p className="text-xs text-slate-300 mt-2 italic bg-slate-900/60 px-2.5 py-1.5 rounded-lg border-l-2 border-slate-600">
                    "{isVi ? lot.crowdLevelDescription : lot.crowdLevelDescriptionJa}"
                  </p>
                </div>

                {/* Bottom Route Summary & Button */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center gap-1 text-slate-300 font-medium">
                      <Footprints className="w-4 h-4 text-sky-400" />
                      <span>{isVi ? 'Đi bộ đến lớp:' : '教室まで徒歩:'}</span>
                      <span className="font-bold text-white">
                        {walking.walkMinutes} {isVi ? 'phút' : '分'} ({walking.distanceM}m)
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isVi ? `Tổng: ~${totalEstimatedTime}p` : `合計: 約${totalEstimatedTime}分`}</span>
                    </div>
                  </div>

                  {/* Decision Action Button (Exact flowchart behavior) */}
                  {isFull ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLotDirectly(lot);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>
                        {isVi ? 'HẾT CHỖ! Xem Bãi Thay Thế (S03) →' : '満車！代替駐輪場へ（S03）→'}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLotDirectly(lot);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-900/40 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-200" />
                      <span>
                        {isVi ? 'CHỌN BÃI NÀY & XEM LỘ TRÌNH (S02) →' : 'この駐輪場を選択・ルート表示（S02）→'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Live Crowd-sourced Community Ticker (Yêu cầu ảnh 2: Báo cáo nhanh chia sẻ sinh viên) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <h4 className="text-sm font-bold text-white">
              {isVi ? 'Cộng đồng SV chia sẻ nhanh (Crowdsource Feed)' : '学生コミュニティのリアルタイム共有'}
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">
            {isVi ? 'Dữ liệu tự hết hạn sau 10 phút' : '10分で自動更新・最新情報'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {communityReports.slice(0, 3).map((rep) => (
            <div key={rep.id} className="bg-slate-800/70 border border-slate-700/60 rounded-xl p-3 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sky-300">{rep.author}</span>
                <span className="text-[10px] text-slate-400">{rep.timeAgo}</span>
              </div>
              <p className="text-slate-300 italic line-clamp-2">
                "{isVi ? rep.text : rep.textJa}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

