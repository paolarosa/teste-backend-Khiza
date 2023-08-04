import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CollectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  slug: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  name: string;

  @Column('text')
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  floorSale1Day?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  floorSale7Days?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  floorSale30Days: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  floorSaleChange1Day?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  floorSaleChange7Days?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  floorSaleChange30Days?: number;
}
