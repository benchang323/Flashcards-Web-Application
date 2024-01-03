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
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const card_entity_1 = require("./card.entity");
const decks_service_1 = require("../decks/decks.service");
let CardsService = class CardsService {
    constructor(cardRepository, decksService) {
        this.cardRepository = cardRepository;
        this.decksService = decksService;
    }
    async create(deckId, createCardDto) {
        const card = this.cardRepository.create({
            ...createCardDto,
            deck: { id: deckId },
        });
        const savedCard = await this.cardRepository.save(card);
        await this.decksService.incrementCardCount(deckId);
        return savedCard;
    }
    async remove(deckId, cardId) {
        const card = await this.cardRepository.findOneBy({
            id: cardId,
            deck: { id: deckId },
        });
        if (!card) {
            throw new common_1.NotFoundException(`Card with ID ${cardId} not found in deck ${deckId}`);
        }
        await this.cardRepository.remove(card);
        await this.decksService.decrementCardCount(deckId);
    }
    async findAll(deckId, limit, offset) {
        return this.cardRepository.find({
            where: { deck: { id: deckId } },
            take: limit,
            skip: offset,
        });
    }
    async findOne(deckId, cardId) {
        const card = await this.cardRepository.findOne({
            where: {
                id: cardId,
                deck: { id: deckId },
            },
        });
        if (!card) {
            throw new common_1.NotFoundException(`Card with ID ${cardId} not found in deck ${deckId}`);
        }
        return card;
    }
    async update(deckId, cardId, updateCardDto) {
        const card = await this.findOne(deckId, cardId);
        return this.cardRepository.save({ ...card, ...updateCardDto });
    }
};
exports.CardsService = CardsService;
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(card_entity_1.Card)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        decks_service_1.DecksService])
], CardsService);
//# sourceMappingURL=cards.service.js.map