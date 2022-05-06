export type RestaurantReadDto = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  isOpen: boolean;
  isPublic: boolean;
  zipCode: string;
  country: string;
  city: string;
  streetNumber: string;
  streetName: string;
  addressExtraInformation: string;
  closingDates: ClosingDateReadDto[];
  placeOpeningTimes: OpeningTimeReadDto[];
  orderOpeningTimes: OpeningTimeReadDto[];
  base64Image: string;
  base64Logo: string;
  isPublished: boolean;
  isCurrentlyOpenToOrder: boolean;
  isCurrentlyOpenInPlace: boolean;
};

export type OpeningTimeReadDto = {
  id: string;
  restaurantId: string;
  dayOfWeek: DayOfWeek;
  offsetInMinutes: number;
  durationInMinutes: number;
};

export type ClosingDateReadDto = {
  id: string;
  restaurantId: string;
  closingDate: DateConstructor;
};

export enum DayOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
