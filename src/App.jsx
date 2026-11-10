import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import S01_ParkingOverview from './components/S01_ParkingOverview';
import S02_LotDetailAndRoute from './components/S02_LotDetailAndRoute';
import S03_AlternativeLot from './components/S03_AlternativeLot';
import S04_OneTapReport from './components/S04_OneTapReport';
import FlowDiagramModal from './components/FlowDiagramModal';
import ArrivalSuccessModal from './components/ArrivalSuccessModal';
import FlowProgressIndicator from './components/FlowProgressIndicator';

import { 
  CAMPUS_BUILDINGS, 
  INITIAL_PARKING_LOTS, 
  INITIAL_REPORTS 
} from './data/mockData';

import {
  fetchParkingLots,
  fetchBuildings,
  fetchCommunityReports,
  submitOneTapReport,
  subscribeToRealtimeUpdates
} from './services/api';

import { Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('vi'); // 'vi' | 'ja'
  const isVi = lang === 'vi';

  // Navigation state (Strictly matching Image 1 flowchart)
  // 'S01' | 'S02' | 'S03' | 'S04'
  const [currentScreen, setCurrentScreen] = useState('S01');

  // Selected Classroom / Destination
  const [selectedBuilding, setSelectedBuilding] = useState(CAMPUS_BUILDINGS[0]);

  // Master Parking Lot data
  const [parkingLots, setParkingLots] = useState(INITIAL_PARKING_LOTS);

  // Active / Selected Lot
  const [selectedLot, setSelectedLot] = useState(INITIAL_PARKING_LOTS[1]); // Default to Lot C or B
  const [failedLot, setFailedLot] = useState(INITIAL_PARKING_LOTS[0]); // Lot A (Full)

  // Community reports
  const [communityReports, setCommunityReports] = useState(INITIAL_REPORTS);

  // Backend connection status
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Modals
  const [isFlowchartOpen, setIsFlowchartOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  // 10-Minute Transition countdown timer
  const [remainingSeconds, setRemainingSeconds] = useState(412); // ~6m52s

  // Initial load from backend
  useEffect(() => {
    async function loadData() {
      const lotsData = await fetchParkingLots();
      if (lotsData && lotsData.length > 0) {
        setParkingLots(lotsData);
        setIsBackendConnected(true);
        const fullOne = lotsData.find(l => l.status === 'red') || lotsData[0];
        const greenOne = lotsData.find(l => l.status === 'green') || lotsData[1];
        setFailedLot(fullOne);
        setSelectedLot(greenOne);
      }

      const reps = await fetchCommunityReports();
      if (reps && reps.length > 0) {
        setCommunityReports(reps);
      }
    }
    loadData();

    // Subscribe to Realtime SSE stream from backend
    const unsubscribe = subscribeToRealtimeUpdates((event) => {
      if (event && event.lot) {
        setParkingLots(prev => prev.map(l => l.id === event.lot.id ? event.lot : l));
        if (event.newReport) {
          setCommunityReports(prev => [event.newReport, ...prev.filter(r => r.id !== event.newReport.id)]);
        }
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds(prev => (prev > 0 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  /**
   * Transition Logic directly implementing Image 1 Decision Point:
   * Action from S01: "Chọn bãi định gửi"
   * Decision: "Tình trạng bãi?"
   * - Còn chỗ (xanh / vàng) -> Chuyển sang S02
   * - Hết chỗ (đỏ) -> Chuyển sang S03
   */
  const handleSelectLotFromS01 = (lot) => {
    if (lot.status === 'red') {
      // Bãi hết chỗ (đỏ) -> Đi sang S03: Bãi xe thay thế
      setFailedLot(lot);
      setCurrentScreen('S03');
      showToast(
        isVi 
          ? `⚠️ ${lot.name} hiện đã HẾT CHỖ! Hệ thống tự động chuyển sang S03 để gợi ý bãi thay thế.` 
          : `⚠️ ${lot.nameJa} は満車です！S03 代替駐輪場案内へ自動切り替えしました。`,
        'warning'
      );
    } else {
      // Còn chỗ (xanh / vàng) -> Đi sang S02: Chi tiết & đi bộ
      setSelectedLot(lot);
      setCurrentScreen('S02');
      showToast(
        isVi 
          ? `Đã chọn ${lot.name}. Hiển thị chi tiết & lộ trình đi bộ tối ưu (S02).` 
          : `${lot.nameJa} を選択しました。教室への最短ルートを表示します（S02）。`,
        'success'
      );
    }
  };

  /**
   * Action from S03: "Chọn bãi gợi ý" -> Sang S02
   */
  const handleSelectAlternativeFromS03 = (altLot) => {
    setSelectedLot(altLot);
    setCurrentScreen('S02');
    showToast(
      isVi 
        ? `Đã chọn bãi thay thế: ${altLot.name}. Tiết kiệm 8 phút di chuyển!` 
        : `代替案 ${altLot.nameJa} を選択しました。混雑を回避して時間短縮！`,
      'success'
    );
  };

  /**
   * Action from S02: "Báo cáo" -> Sang S04
   */
  const handleGoToReportFromS02 = () => {
    setCurrentScreen('S04');
  };

  /**
   * Action from S04: "Chọn 1 chạm" -> Cập nhật dữ liệu & Quay lại S02
   */
  const handleOneTapReportSubmit = async (reportData) => {
    // 1. Send to Backend
    submitOneTapReport(reportData);

    // 2. Optimistic update in frontend state
    setParkingLots(prev => prev.map(l => {
      if (l.id === reportData.lotId) {
        let newSpots = l.availableSpots;
        if (reportData.status === 'green') {
          newSpots = Math.max(l.availableSpots, 45);
        } else if (reportData.status === 'yellow') {
          newSpots = 12;
        } else {
          newSpots = 0;
        }

        return {
          ...l,
          status: reportData.status,
          availableSpots: newSpots,
          lastUpdated: isVi ? 'Vừa xong (1-Tap)' : 'たった今（1タップ）',
          crowdLevelDescription: `${reportData.statusText} • Báo cáo bởi ${reportData.author}`
        };
      }
      return l;
    }));

    if (selectedLot?.id === reportData.lotId) {
      setSelectedLot(prev => ({
        ...prev,
        status: reportData.status,
        availableSpots: reportData.status === 'green' ? 45 : reportData.status === 'yellow' ? 12 : 0,
        lastUpdated: isVi ? 'Vừa xong' : 'たった今'
      }));
    }

    // 3. Add to community feed
    const newReport = {
      id: `rep-${Date.now()}`,
      lotId: reportData.lotId,
      author: reportData.author,
      timeAgo: isVi ? 'Vừa xong' : 'たった今',
      status: reportData.status,
      text: `${reportData.statusText}. ${reportData.tags?.join(', ') || ''} ${reportData.note || ''}`,
      textJa: `${reportData.statusText}. ${reportData.tags?.join('、') || ''} ${reportData.note || ''}`,
      upvotes: 1
    };
    setCommunityReports(prev => [newReport, ...prev]);

    // 4. Return to S02 as specified in Image 1
    setCurrentScreen('S02');
    showToast(
      isVi 
        ? '✓ Cảm ơn bạn! Báo cáo 1 chạm đã được lưu vào hệ thống và đồng bộ theo thời gian thực.' 
        : '✓ ご協力ありがとうございます！リアルタイム情報が更新されました。',
      'success'
    );
  };

  /**
   * Action from S02: "Xác nhận chọn bãi" -> Đến lớp đúng giờ (Vấn đề được giải quyết)
   */
  const handleConfirmArrival = () => {
    setIsSuccessModalOpen(true);
  };

  /**
   * Reset / Restart
   */
  const handleResetFlow = () => {
    setIsSuccessModalOpen(false);
    setCurrentScreen('S01');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-200">
          <div className={`px-4 py-2.5 rounded-2xl shadow-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 ${
            toastMessage.type === 'warning'
              ? 'bg-amber-950/95 border-amber-500/70 text-amber-200'
              : 'bg-emerald-950/95 border-emerald-500/70 text-emerald-200'
          }`}>
            {toastMessage.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{toastMessage.msg}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        selectedBuilding={selectedBuilding}
        setSelectedBuilding={setSelectedBuilding}
        lang={lang}
        setLang={setLang}
        onOpenFlowchart={() => setIsFlowchartOpen(true)}
        remainingSeconds={remainingSeconds}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-6">
        {/* Backend Connected Indicator Pill */}
        <div className="flex items-center justify-between text-xs px-1">
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${isBackendConnected ? 'bg-emerald-400 animate-pulse' : 'bg-sky-400'}`}></span>
            <span className="text-slate-400">
              {isVi ? 'Hệ thống Backend API & Real-time SSE:' : 'バックエンドAPI・リアルタイム同期:'}
            </span>
            <span className="font-bold text-sky-400">
              {isVi ? 'Sẵn sàng triển khai (Production Ready)' : '稼働準備完了'}
            </span>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            PORT 5000 / REST & SSE
          </span>
        </div>

        {/* Flow Progress Bar (Image 1 Tracker) */}
        <FlowProgressIndicator
          currentScreen={currentScreen}
          onSelectScreen={(screenId) => setCurrentScreen(screenId)}
          hasChosenAlternative={currentScreen === 'S03'}
          isVi={isVi}
        />

        {/* Dynamic Screen Renderer based on currentScreen */}
        {currentScreen === 'S01' && (
          <S01_ParkingOverview
            parkingLots={parkingLots}
            selectedBuilding={selectedBuilding}
            onSelectLotDirectly={handleSelectLotFromS01}
            communityReports={communityReports}
            lang={lang}
          />
        )}

        {currentScreen === 'S02' && (
          <S02_LotDetailAndRoute
            lot={selectedLot}
            selectedBuilding={selectedBuilding}
            onBackToOverview={() => setCurrentScreen('S01')}
            onGoToReport={handleGoToReportFromS02}
            onConfirmArrival={handleConfirmArrival}
            lang={lang}
          />
        )}

        {currentScreen === 'S03' && (
          <S03_AlternativeLot
            failedLot={failedLot}
            alternativeLots={parkingLots.filter(l => l.id !== failedLot?.id && l.status !== 'red')}
            selectedBuilding={selectedBuilding}
            onSelectAlternative={handleSelectAlternativeFromS03}
            onBackToOverview={() => setCurrentScreen('S01')}
            lang={lang}
          />
        )}

        {currentScreen === 'S04' && (
          <S04_OneTapReport
            lot={selectedLot}
            onSubmitReport={handleOneTapReportSubmit}
            onBackToS02={() => setCurrentScreen('S02')}
            lang={lang}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500 text-center space-y-1">
        <p className="font-semibold text-slate-400">
          SmartPark Campus • Dự án Giải pháp Giao ca 10 phút (ITSS 2)
        </p>
        <p>
          Full-stack Node.js + Express API & React Vite • Sẵn sàng Deploy lên Render, Railway, Vercel, VPS
        </p>
      </footer>

      {/* Interactive Flowchart Modal (Image 1) */}
      <FlowDiagramModal
        isOpen={isFlowchartOpen}
        onClose={() => setIsFlowchartOpen(false)}
        currentScreen={currentScreen}
        onSelectScreen={(scr) => setCurrentScreen(scr)}
        lang={lang}
      />

      {/* Success Modal: Đến lớp đúng giờ - Vấn đề được giải quyết */}
      <ArrivalSuccessModal
        isOpen={isSuccessModalOpen}
        onReset={handleResetFlow}
        lot={selectedLot}
        building={selectedBuilding}
        lang={lang}
      />
    </div>
  );
}
