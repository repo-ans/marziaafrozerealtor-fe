// Mirrors the RESO/AMPRE OData field names verbatim, matching the contract
// already used by Dream Valley Realty's live site (dvr-website-backend),
// so the same AMPRE feed can power this site without re-mapping fields.

export type PropertyListingType =
  | "all"
  | "residential"
  | "condo"
  | "commercial"
  | "open-houses"
  | "pre-construction";

export type PropertySource = "idx" | "office" | "mine";

export interface IPropertyRoom {
  RoomKey?: string;
  RoomType?: string | null;
  RoomLevel?: string | null;
  RoomLength?: number | null;
  RoomWidth?: number | null;
  RoomDescription?: string | null;
}

export interface IPriceHistoryEntry {
  ListingKey: string;
  ListingId?: string | null;
  ListingContractDate?: string | null;
  CloseDate?: string | null;
  ListPrice?: number | null;
  ClosePrice?: number | null;
  MlsStatus?: string | null;
  StandardStatus?: string | null;
  TransactionType?: string | null;
  ListOfficeName?: string | null;
}

export interface IProperty {
  ListingKey: string;
  ListingId?: string | null;
  ListPrice?: number | null;
  UnparsedAddress?: string | null;
  StreetNumber?: string | null;
  StreetName?: string | null;
  City?: string | null;
  StateOrProvince?: string | null;
  PostalCode?: string | null;
  BedroomsTotal?: number | null;
  BathroomsTotalInteger?: number | null;
  BuildingAreaTotal?: number | null;
  LivingAreaRange?: string | null;
  PropertyType?: string | null;
  PropertySubType?: string | null;
  MlsStatus?: string | null;
  StandardStatus?: string | null;
  TransactionType?: string | null;
  ListOfficeName?: string | null;
  ListAgentFullName?: string | null;
  ListingContractDate?: string | null;
  ModificationTimestamp?: string | null;
  images: string[];
}

export interface IPropertyDetail extends IProperty {
  PublicRemarks?: string | null;
  LotSizeArea?: number | null;
  LotSizeUnits?: string | null;
  YearBuilt?: number | null;
  ParkingTotal?: number | null;
  AssociationFee?: number | null;
  TaxAnnualAmount?: number | null;
  CityRegion?: string | null;
  ArchitecturalStyle?: string[] | string | null;
  ContractStatus?: string | null;
  OriginalEntryTimestamp?: string | null;
  rooms?: IPropertyRoom[];
  priceHistory?: IPriceHistoryEntry[];
}

export interface IListResponse {
  success: boolean;
  message: string;
  data: {
    items: IProperty[];
    total: number;
    page: number;
    pageSize: number;
  };
}

export interface IDetailResponse {
  success: boolean;
  message: string;
  data: IPropertyDetail;
}

export interface IPropertyFilters {
  source?: PropertySource;
  city?: string;
  type?: PropertyListingType;
  q?: string;
  page?: number;
  pageSize?: number;
}
