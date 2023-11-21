var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, NotEmpty, PrimaryKey, Table, UpdatedAt, Model, } from "sequelize-typescript";
let Product = class Product extends Model {
};
__decorate([
    PrimaryKey,
    AllowNull(false),
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    AllowNull(false),
    NotEmpty,
    Column(DataType.STRING),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    AllowNull(false),
    NotEmpty,
    Column(DataType.STRING),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    AllowNull(false),
    NotEmpty,
    Column(DataType.STRING),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    AllowNull(false),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], Product.prototype, "CategoryId", void 0);
__decorate([
    AllowNull(false),
    CreatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    AllowNull(false),
    UpdatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
Product = __decorate([
    Table
], Product);
export default Product;
//# sourceMappingURL=product.model.js.map