var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, NotEmpty, PrimaryKey, Table, UpdatedAt, Model, Max, Min, } from "sequelize-typescript";
import CategoryModel from "./category.model.js";
let ProductModel = class ProductModel extends Model {
};
__decorate([
    PrimaryKey,
    AllowNull(false),
    AutoIncrement,
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], ProductModel.prototype, "id", void 0);
__decorate([
    AllowNull(false),
    NotEmpty,
    Column(DataType.STRING),
    __metadata("design:type", String)
], ProductModel.prototype, "title", void 0);
__decorate([
    Max(50000000),
    Min(0),
    AllowNull(false),
    NotEmpty,
    Column(DataType.STRING),
    __metadata("design:type", Number)
], ProductModel.prototype, "price", void 0);
__decorate([
    Min(5),
    AllowNull(false),
    NotEmpty,
    Column(DataType.STRING),
    __metadata("design:type", Number)
], ProductModel.prototype, "stock", void 0);
__decorate([
    AllowNull(false),
    ForeignKey(() => CategoryModel),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], ProductModel.prototype, "CategoryId", void 0);
__decorate([
    BelongsTo(() => CategoryModel),
    __metadata("design:type", void 0)
], ProductModel.prototype, "Category", void 0);
__decorate([
    AllowNull(false),
    CreatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], ProductModel.prototype, "createdAt", void 0);
__decorate([
    AllowNull(false),
    UpdatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], ProductModel.prototype, "updatedAt", void 0);
ProductModel = __decorate([
    Table({ tableName: "Products" })
], ProductModel);
export default ProductModel;
//# sourceMappingURL=product.model.js.map