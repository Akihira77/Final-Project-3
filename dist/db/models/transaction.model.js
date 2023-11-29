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
import ProductModel from "./product.model.js";
import UserModel from "./user.model.js";
let TransactionModel = class TransactionModel extends Model {
};
__decorate([
    PrimaryKey,
    AllowNull(false),
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], TransactionModel.prototype, "id", void 0);
__decorate([
    AllowNull(false),
    ForeignKey(() => ProductModel),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], TransactionModel.prototype, "ProductId", void 0);
__decorate([
    BelongsTo(() => ProductModel),
    __metadata("design:type", void 0)
], TransactionModel.prototype, "Product", void 0);
__decorate([
    AllowNull(false),
    ForeignKey(() => UserModel),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], TransactionModel.prototype, "UserId", void 0);
__decorate([
    BelongsTo(() => UserModel),
    __metadata("design:type", void 0)
], TransactionModel.prototype, "User", void 0);
__decorate([
    AllowNull(false),
    NotEmpty,
    Column(DataType.STRING),
    __metadata("design:type", Number)
], TransactionModel.prototype, "quantity", void 0);
__decorate([
    AllowNull(false),
    NotEmpty,
    Column(DataType.STRING),
    __metadata("design:type", Number)
], TransactionModel.prototype, "total_price", void 0);
__decorate([
    AllowNull(false),
    CreatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], TransactionModel.prototype, "createdAt", void 0);
__decorate([
    AllowNull(false),
    UpdatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], TransactionModel.prototype, "updatedAt", void 0);
TransactionModel = __decorate([
    Table({ tableName: "Transactions" })
], TransactionModel);
export default TransactionModel;
//# sourceMappingURL=transaction.model.js.map