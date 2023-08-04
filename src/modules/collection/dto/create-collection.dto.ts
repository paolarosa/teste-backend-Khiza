export class CreateCollectionDto {
  slug: string;
  name: string;
  image: string;
  floorSaleChange30Days: number;
  floorSale1Day?: number;
  floorSale7Days?: number;
  floorSale30Days?: number;
  floorSaleChange1Day?: number;
  floorSaleChange7Days?: number;
}
