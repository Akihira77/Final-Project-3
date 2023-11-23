var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AllowNull, AutoIncrement, BeforeBulkCreate, BeforeCreate, Column, CreatedAt, DataType, Default, Is, IsEmail, Max, Min, Model, NotEmpty, PrimaryKey, Table, Unique, UpdatedAt, } from "sequelize-typescript";
import { hashPassword } from "../../utils/bcrypt.js";
export const Genders = ["male", "female"];
export const Roles = ["admin", "customer"];
let User = class User extends Model {
    static async hashingPassword(instance) {
        instance.password = await hashPassword(instance.password);
    }
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    AllowNull(false),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    AllowNull(false),
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "full_name", void 0);
__decorate([
    IsEmail,
    Unique,
    NotEmpty,
    AllowNull(false),
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    AllowNull(false),
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Is("Gender", (value) => {
        if (!Genders.includes(value)) {
            throw new Error("Gender is invalid");
        }
    }),
    AllowNull(false),
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    Default("customer"),
    Is("Role", (value) => {
        if (!Roles.includes(value)) {
            throw new Error("Role is invalid");
        }
    }),
    AllowNull(false),
    Column(DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    Max(100000000),
    Default(0),
    Min(0),
    AllowNull(false),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], User.prototype, "balance", void 0);
__decorate([
    CreatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    BeforeCreate,
    BeforeBulkCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashingPassword", null);
User = __decorate([
    Table({ tableName: "Users" })
], User);
export default User;
//# sourceMappingURL=user.model.js.map