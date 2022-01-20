import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("photo", { schema: "perionica_vasic" })
export class Photo {
  @PrimaryGeneratedColumn({ type: "int", name: "photo_id", unsigned: true })
  photoId: number;

  @Column("varchar", { name: "photo_path", length: 255 })
  photoPath: string;

  @Column("int", { name: "user_id", default: () => "'0'" })
  userId: number;
}
