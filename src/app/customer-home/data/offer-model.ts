export enum RateType {
    FLAT = 'FLAT',
    PERCENTAGE = 'PERCENTAGE',
  }

  export enum EventOfferType {
    EVENT = 'EVENT',
    OFFER = 'OFFER',
  }

  export interface Offer {
    id: number;
    name: string;
    description?: string;
    start_date: Date;
    end_date: Date;
    rate: number;
    rate_type: RateType;
    type: EventOfferType;
  }
