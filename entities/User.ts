import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("email", ["email"], { unique: true })
@Entity("user", { schema: "perionica_vasic" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "name", length: 50, default: () => "'0'" })
  name: string;

  @Column("varchar", { name: "surname", length: 50, default: () => "'0'" })
  surname: string;

  @Column("varchar", {
    name: "email",
    unique: true,
    length: 50,
    default: () => "'0'",
  })
  email: string;

  @Column("varchar", {
    name: "message",
    nullable: true,
    length: 255,
    default: () => "'0'",
  })
  message: string | null;
}
