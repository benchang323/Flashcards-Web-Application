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
exports.DecksController = void 0;
const decks_service_1 = require("./decks.service");
const deck_create_dto_1 = require("./deck-create.dto");
const deck_update_dto_1 = require("./deck-update.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const user_id_decorator_1 = require("../decorators/user-id.decorator");
const common_1 = require("@nestjs/common");
let DecksController = class DecksController {
    constructor(decksService) {
        this.decksService = decksService;
    }
    async create(createDeckDto, userId) {
        const createdDeck = await this.decksService.create(createDeckDto, userId);
        return createdDeck;
    }
    async findOne(id, userId) {
        const deck = await this.decksService.findOne(id, userId);
        if (!deck) {
            throw new common_1.NotFoundException(`Deck with ID ${id} not found`);
        }
        return deck;
    }
    async findAll(userId, limit, offset, search, withUserData) {
        const decks = await this.decksService.findAll(userId, limit, offset, search, withUserData);
        return {
            search,
            data: decks.map((deck) => {
                delete deck.userId;
                if (deck.user) {
                    delete deck.user.password;
                }
                return deck;
            }),
            pagination: {
                limit,
                offset,
            },
        };
    }
    async remove(id, userId) {
        await this.decksService.remove(id, userId);
    }
    async update(id, updateDeckDto, userId) {
        const deck = await this.decksService.update(id, updateDeckDto, userId);
        if (!deck) {
            throw new common_1.NotFoundException(`Deck with ID ${id} not found.`);
        }
        return deck;
    }
};
exports.DecksController = DecksController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deck_create_dto_1.CreateDeckDto, Number]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, user_id_decorator_1.UserId)()),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("offset")),
    __param(3, (0, common_1.Query)("search")),
    __param(4, (0, common_1.Query)("withUserData")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String, Boolean]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, deck_update_dto_1.UpdateDeckDto, Number]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "update", null);
exports.DecksController = DecksController = __decorate([
    (0, common_1.Controller)("decks"),
    __metadata("design:paramtypes", [decks_service_1.DecksService])
], DecksController);
//# sourceMappingURL=decks.controller.js.map