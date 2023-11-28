var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, NotEmpty, PrimaryKey, Table, UpdatedAt, Model, } from "sequelize-typescript";
import Product from "./product.model.js";
import User from "./user.model.js";
let Transaction = class Transaction extends Model {
};
__decorate([
    PrimaryKey,
    AllowNull(false),
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Transaction.prototype, "id", void 0);
__decorate([
    AllowNull(false),
    ForeignKey(() => Product),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Transaction.prototype, "ProductId", void 0);
__decorate([
    BelongsTo(() => Product),
    __metadata("design:type", void 0)
], Transaction.prototype, "product", void 0);
__decorate([
    AllowNull(false),
    ForeignKey(() => User),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Transaction.prototype, "UserId", void 0);
__decorate([
    BelongsTo(() => User),
    __metadata("design:type", void 0)
], Transaction.prototype, "user", void 0);
__decorate([
    AllowNull(false),
    NotEmpty,
    Column(DataType.STRING),
    __metadata("design:type", Number)
], Transaction.prototype, "quantity", void 0);
__decorate([
    AllowNull(false),
    NotEmpty,
    Column(DataType.STRING),
    __metadata("design:type", Number)
], Transaction.prototype, "total_price", void 0);
__decorate([
    AllowNull(false),
    CreatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], Transaction.prototype, "createdAt", void 0);
__decorate([
    AllowNull(false),
    UpdatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], Transaction.prototype, "updatedAt", void 0);
Transaction = __decorate([
    Table({ tableName: "Transactions" })
], Transaction);
export default Transaction;
//# sourceMappingURL=transaction.model.js.map