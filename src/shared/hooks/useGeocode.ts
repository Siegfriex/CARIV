/**
 * 주소 → 좌표/placeId 변환 (Google Geocoding API)
 * config.getGoogleMapsApiKey 사용
 */

import { apiClient } from '@/shared/api/client';

export interface GeocodeResult {
  placeId: string;
  lat: number;
  lng: number;
  formattedAddress?: string;
}

/**
 * 주소 문자열로 Geocoding 요청
 * @param address - 검색할 주소
 * @returns placeId, lat, lng 또는 null (실패 시)
 */
export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  if (!address?.trim()) return null;
  try {
    const result = await apiClient.config.getGoogleMapsApiKey();
    const apiKey = result?.apiKey;
    if (!apiKey) return null;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const res = await fetch(url);
    const json = (await res.json()) as { results?: Array<{ place_id: string; geometry: { location: { lat: number; lng: number } }; formatted_address?: string }> };
    const first = json?.results?.[0];
    if (!first) return null;
    return {
      placeId: first.place_id,
      lat: first.geometry.location.lat,
      lng: first.geometry.location.lng,
      formattedAddress: first.formatted_address,
    };
  } catch {
    return null;
  }
}
