// API Client for SmartPark Campus Backend
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function fetchParkingLots() {
  try {
    const res = await fetch(`${API_BASE}/lots`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Backend unavailable, using client fallback:', err.message);
    return null;
  }
}

export async function fetchBuildings() {
  try {
    const res = await fetch(`${API_BASE}/buildings`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

export async function fetchCommunityReports() {
  try {
    const res = await fetch(`${API_BASE}/reports`);
    if (!res.ok) throw new Error('API request failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

export async function submitOneTapReport(reportData) {
  try {
    const res = await fetch(`${API_BASE}/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reportData)
    });
    if (!res.ok) throw new Error('Failed to submit report');
    return await res.json();
  } catch (err) {
    console.warn('Failed to submit report to backend:', err.message);
    return null;
  }
}

export async function fetchRecommendation(destinationId, avoidLotId) {
  try {
    const res = await fetch(`${API_BASE}/recommend?destination=${destinationId}&avoidLot=${avoidLotId}`);
    if (!res.ok) throw new Error('Failed to fetch recommendation');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

/**
 * Connect to Real-time SSE Stream
 */
export function subscribeToRealtimeUpdates(onLotUpdated) {
  try {
    const eventSource = new EventSource(`${API_BASE}/stream`);

    eventSource.addEventListener('LOT_UPDATED', (e) => {
      try {
        const payload = JSON.parse(e.data);
        if (onLotUpdated) onLotUpdated(payload);
      } catch (err) {
        console.error('Error parsing SSE event:', err);
      }
    });

    eventSource.onerror = () => {
      // EventSource automatically retries connection
    };

    return () => {
      eventSource.close();
    };
  } catch (err) {
    console.warn('Real-time SSE not supported or blocked:', err);
    return () => {};
  }
}

