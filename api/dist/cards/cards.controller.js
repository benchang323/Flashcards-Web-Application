"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsController = void 0;
const common_1 = require("@nestjs/common");
const cards_service_1 = require("./cards.service");
const card_create_dto_1 = require("./card-create.dto");
const card_update_dto_1 = require("./card-update.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let CardsController = class CardsController {
    constructor(cardsService) {
        this.cardsService = cardsService;
    }
    async create(deckId, createCardDto) {
        return this.cardsService.create(deckId, createCardDto);
    }
    async findAll(deckId, limit, offset) {
        return this.cardsService.findAll(deckId, limit, offset);
    }
    async findOne(deckId, cardId) {
        return this.cardsService.findOne(deckId, cardId);
    }
    async update(deckId, cardId, updateCardDto) {
        return this.cardsService.update(deckId, cardId, updateCardDto);
    }
    async remove(deckId, cardId) {
        return this.cardsService.remove(deckId, cardId);
    }
};
exports.CardsController = CardsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)("deckId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, card_create_dto_1.CreateCardDto]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)("deckId")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("offset")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(":cardId"),
    __param(0, (0, common_1.Param)("deckId")),
    __param(1, (0, common_1.Param)("cardId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(":cardId"),
    __param(0, (0, common_1.Param)("deckId")),
    __param(1, (0, common_1.Param)("cardId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, card_update_dto_1.UpdateCardDto]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(":cardId"),
    __param(0, (0, common_1.Param)("deckId")),
    __param(1, (0, common_1.Param)("cardId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "remove", null);
exports.CardsController = CardsController = __decorate([
    (0, common_1.Controller)("decks/:deckId/cards"),
    __metadata("design:paramtypes", [cards_service_1.CardsService])
], CardsController);
//# sourceMappingURL=cards.controller.js.map