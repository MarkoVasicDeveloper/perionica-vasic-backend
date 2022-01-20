import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("refresh_token_id", ["refreshTokenId"], { unique: true })
@Entity("refresh_token", { schema: "perionica_vasic" })
export class RefreshToken {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "refresh_token_id",
    unsigned: true,
  })
  refreshTokenId: number;

  @Column("timestamp", {
    name: "create_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createAt: Date;

  @Column("varchar", { name: "refresh_token", length: 255 })
  refreshToken: string;

  @Column("timestamp", { name: "expire_at" })
  expireAt: Date;

  @Column("tinyint", { name: "is_valid", width: 1, default: () => "'1'" })
  isValid: boolean;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;
}
