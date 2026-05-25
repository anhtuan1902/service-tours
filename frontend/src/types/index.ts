export type TourType = 'FIT' | 'GIT' | 'MICE';

export interface ServiceItem {
  serviceType: string;
  serviceName: string;
  supplier: string;
  quantity: number;
  unitPrice: number;
  note: string;
}

export interface TourRequest {
  id: string;
  tourName: string;
  departureDate: string;
  personInCharge: string;
  tourType: TourType;
  guestCount: number;
  services: ServiceItem[];
  totalCost: number;
  status: string;
  createdAt: string;
}

export interface CreateTourRequestDto {
  tourName: string;
  departureDate: string;
  personInCharge: string;
  tourType: TourType;
  guestCount: number;
  services: ServiceItem[];
}

export interface CreateResponse {
  data: TourRequest;
  warning?: string;
}
