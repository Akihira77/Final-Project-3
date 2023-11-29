var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, Default, HasMany, Model, NotEmpty, PrimaryKey, Table, Unique, UpdatedAt, } from "sequelize-typescript";
import ProductModel from "./product.model.js";
let CategoryModel = class CategoryModel extends Model {
};
__decorate([
    PrimaryKey,
    AutoIncrement,
    AllowNull(false),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], CategoryModel.prototype, "id", void 0);
__decorate([
    NotEmpty,
    AllowNull(false),
    Unique,
    Column(DataType.STRING),
    __metadata("design:type", String)
], CategoryModel.prototype, "type", void 0);
__decorate([
    NotEmpty,
    AllowNull(false),
    Default(0),
    Column(DataType.INTEGER),
    __metadata("design:type", Number)
], CategoryModel.prototype, "sold_product_amount", void 0);
__decorate([
    HasMany(() => ProductModel),
    __metadata("design:type", Array)
], CategoryModel.prototype, "Products", void 0);
__decorate([
    CreatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], CategoryModel.prototype, "createdAt", void 0);
__decorate([
    UpdatedAt,
    Column(DataType.DATE),
    __metadata("design:type", Date)
], CategoryModel.prototype, "updatedAt", void 0);
CategoryModel = __decorate([
    Table({ tableName: "Categories" })
], CategoryModel);
export default CategoryModel;
//# sourceMappingURL=category.model.js.map