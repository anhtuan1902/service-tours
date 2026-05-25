import { CreateTourRequestDto, TourRequest, CreateResponse } from '@/types';

const API_BASE = 'http://localhost:5000/api';

export async function getRequests(): Promise<TourRequest[]> {
  const res = await fetch(`${API_BASE}/requests`);
  if (!res.ok) throw new Error('Failed to fetch requests');
  return res.json();
}

export async function getRequestById(id: string): Promise<TourRequest> {
  const res = await fetch(`${API_BASE}/requests/${id}`);
  if (!res.ok) throw new Error('Failed to fetch request');
  return res.json();
}

export async function createRequest(
  dto: CreateTourRequestDto
): Promise<{ data: TourRequest; warning?: string }> {
  const res = await fetch(`${API_BASE}/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });

  const data: CreateResponse = await res.json();

  if (!res.ok && res.status !== 201) {
    const error = await res.json();
    throw error;
  }

  return { data: data.data, warning: data.warning };
}
