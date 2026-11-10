import React, { useState } from 'react';
import { X, Calculator, Clock, Calendar, AlertCircle, Sparkles, Navigation, Bell } from 'lucide-react';

export default function DepartureCalculatorModal({ isOpen, onClose, selectedBuilding, selectedLot, lang }) {
  if (!isOpen) return null;
  const isVi = lang === 'vi';

  const [commuteMinutes, setCommuteMinutes] = useState(15); // Distance from home to campus
  const [classStartTime, setClassStartTime] = useState('13:30'); // Ca chiều bắt đầu
  const [bufferMinutes, setBufferMinutes] = useState(5); // Dự phòng kẹt đèn đỏ

  // Walking time from chosen lot to building
  const walkingMin = selectedLot?.walkingInfo?.[selectedBuilding?.id]?.walkMinutes || 4;
  const parkingMin = selectedLot?.avgWaitTimeMin || 2;
  const totalPrepAndTravel = Number(commuteMinutes) + parkingMin + walkingMin + Number(bufferMinutes);

  // Compute recommended departure time
  const [startHour, startMin] = classStartTime.split(':').map(Number);
  const classDate = new Date();
  classDate.setHours(startHour, startMin, 0, 0);

  const departureDate = new Date(classDate.getTime() - totalPrepAndTravel * 60 * 1000);
  const departureTimeString = departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Peak Hours Heatmap data (Khung giờ giao ca 10 phút sinh viên)
  const peakSlots = [
    { slot: 'Ca 1: 06:45 - 07:00', level: 'high', label: 'Rất đông (Vào ca 1)' },
    { slot: 'Đổi ca: 09:15 - 09:30', level: 'peak', label: 'Cực kỳ ùn tắc (Đổi ca sáng)' },
    { slot: 'Ca trưa: 11:45 - 12:00', level: 'medium', label: 'Tan ca sáng' },
    { slot: 'Đổi ca: 13:15 - 13:30', level: 'peak', label: 'Đỉnh điểm hiện tại (Đổi ca chiều)' },
    { slot: 'Đổi ca: 15:15 - 15:30', level: 'high', label: 'Đổi ca chiều' },
    { slot: 'Tan học: 17:15 - 17:45', level: 'medium', label: 'Ra về' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Calculator className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">
                  {isVi ? 'Máy Tính Giờ Xuất Phát Chuẩn & Biểu Đồ Giờ Cao Điểm' : '登校出発時間計算機・ピーク予測'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500 text-white">
                  {isVi ? 'GIẢI PHÁP 11, 29, 30' : '解決策⑪・㉙・㉚'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isVi ? 'Chủ động tính toán thời điểm xuất phát từ nhà để không bị áp lực thời gian' : '自宅からの所要時間を逆算し、焦らず定時到着を可能にするツール'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Calculator Body */}
        <div className="my-5 space-y-5">
          {/* Inputs grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                {isVi ? 'Giờ vào lớp:' : '授業開始時刻:'}
              </label>
              <input
                type="time"
                value={classStartTime}
                onChange={(e) => setClassStartTime(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                {isVi ? 'Thời gian đi từ nhà đến cổng trường:' : '自宅〜学校までの所要時間:'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={commuteMinutes}
                  onChange={(e) => setCommuteMinutes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <span className="text-xs text-slate-400 font-medium">phút</span>
              </div>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <label className="text-[11px] font-bold text-slate-400 block mb-1">
                {isVi ? 'Dự phòng kẹt đèn đỏ / Thảnh thơi:' : '予備・余裕時間:'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={bufferMinutes}
                  onChange={(e) => setBufferMinutes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <span className="text-xs text-slate-400 font-medium">phút</span>
              </div>
            </div>
          </div>

          {/* Optimal Result Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-sky-950/60 border-2 border-emerald-500/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                {isVi ? 'THỜI ĐIỂM XUẤT PHÁT LÝ TƯỞNG TỪ NHÀ' : '推奨自宅出発時刻'}
              </span>
              <div className="text-3xl font-black text-white">
                {departureTimeString}
              </div>
              <p className="text-[11px] text-slate-300">
                {isVi 
                  ? `(Đi đường: ${commuteMinutes}p + Gửi ${selectedLot?.shortName || 'nhà xe'}: ${parkingMin}p + Đi bộ lên phòng: ${walkingMin}p + Dự phòng: ${bufferMinutes}p)`
                  : `(移動:${commuteMinutes}分 + 駐輪:${parkingMin}分 + 徒歩:${walkingMin}分 + 予備:${bufferMinutes}分)`}
              </p>
            </div>

            <div className="bg-emerald-500 text-slate-950 font-black px-4 py-2 rounded-xl text-center text-xs shrink-0 shadow-lg">
              {isVi ? '✅ ĐẾN LỚP ĐÚNG GIỜ' : '定時到着保証'}
            </div>
          </div>

          {/* Peak Hours Heatmap Chart (Khung giờ cao điểm giao ca) */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {isVi ? 'Biểu Đồ Mật Độ Nhà Xe Các Khung Giờ Đổi Ca:' : '時間帯別・混雑予測チャート:'}
              </span>
              <span className="text-[11px] text-slate-400">
                {isVi ? 'Đúc kết từ dữ liệu sinh viên' : '学生の過去実績データ'}
              </span>
            </div>

            <div className="space-y-2">
              {peakSlots.map((ps, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 text-xs">
                  <span className="font-semibold text-slate-300">{ps.slot}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">{ps.label}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ps.level === 'peak' ? 'bg-red-500 text-white animate-pulse' :
                      ps.level === 'high' ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white'
                    }`}>
                      {ps.level === 'peak' ? 'ÙN TẮC ĐỈNH ĐIỂM' : ps.level === 'high' ? 'ĐÔNG' : 'THÔNG THOÁNG'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>{isVi ? 'Căn cứ theo giải pháp số 11, 29, 30, 38 trong bảng khảo sát' : '要件一覧No.11, 29, 30, 38の実装'}</span>
          <button onClick={onClose} className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg">
            {isVi ? 'Đóng' : '閉じる'}
          </button>
        </div>
      </div>
    </div>
  );
}

