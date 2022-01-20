import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("administrator", { schema: "perionica_vasic" })
export class Administrator {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "administrator_id",
    unsigned: true,
  })
  administratorId: number;

  @Column("varchar", { name: "username", length: 50, default: () => "'0'" })
  username: string;

  @Column("varchar", { name: "email", length: 50, default: () => "'0'" })
  email: string;
}
