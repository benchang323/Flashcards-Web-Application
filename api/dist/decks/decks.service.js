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
exports.DecksService = void 0;
const typeorm_1 = require("typeorm");
const deck_entity_1 = require("./deck.entity");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
let DecksService = class DecksService {
    constructor(deckRepository) {
        this.deckRepository = deckRepository;
    }
    async findOne(id, userId) {
        const deck = await this.deckRepository.findOneBy({ id });
        if (!deck) {
            throw new common_1.NotFoundException();
        }
        if (deck.userId !== userId) {
            throw new common_1.ForbiddenException();
        }
        return deck;
    }
    async addCard(deckId) {
        const deck = await this.deckRepository.findOneBy({ id: deckId });
        if (!deck) {
            throw new common_1.NotFoundException(`Deck with ID ${deckId} not found`);
        }
        deck.numberOfCards += 1;
        await this.deckRepository.save(deck);
    }
    async removeCard(deckId) {
        const deck = await this.deckRepository.findOneBy({ id: deckId });
        if (!deck) {
            throw new common_1.NotFoundException(`Deck with ID ${deckId} not found`);
        }
        deck.numberOfCards = Math.max(0, deck.numberOfCards - 1);
        await this.deckRepository.save(deck);
    }
    async create(createDeckDto, userId) {
        const deck = this.deckRepository.create({ ...createDeckDto, userId });
        return this.deckRepository.save(deck);
    }
    async findAll(userId, limit, offset, search, withUserData) {
        const queryBuilder = this.deckRepository.createQueryBuilder("deck");
        if (withUserData) {
            queryBuilder.leftJoinAndSelect("deck.user", "user");
        }
        queryBuilder.where("deck.userId = :userId", { userId });
        if (limit) {
            queryBuilder.limit(limit);
        }
        if (offset) {
            queryBuilder.offset(offset);
        }
        if (search) {
            queryBuilder.andWhere("deck.title LIKE :search", {
                search: `%${search}%`,
            });
        }
        return await queryBuilder.getMany();
    }
    async update(id, updateDeckDto, userId) {
        let deck = await this.findOne(id, userId);
        if (!deck) {
            throw new common_1.NotFoundException();
        }
        deck = this.deckRepository.merge(deck, updateDeckDto);
        return this.deckRepository.save(deck);
    }
    async remove(id, userId) {
        const deck = await this.findOne(id, userId);
        if (!deck) {
            throw new common_1.NotFoundException();
        }
        await this.deckRepository.remove(deck);
    }
    async incrementCardCount(deckId) {
        const deck = await this.deckRepository.findOneBy({ id: deckId });
        if (!deck) {
            throw new common_1.NotFoundException(`Deck with ID ${deckId} not found`);
        }
        deck.numberOfCards += 1;
        await this.deckRepository.save(deck);
    }
    async decrementCardCount(deckId) {
        const deck = await this.deckRepository.findOneBy({ id: deckId });
        if (!deck) {
            throw new common_1.NotFoundException(`Deck with ID ${deckId} not found`);
        }
        deck.numberOfCards = Math.max(0, deck.numberOfCards - 1);
        await this.deckRepository.save(deck);
    }
};
exports.DecksService = DecksService;
exports.DecksService = DecksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(deck_entity_1.Deck)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], DecksService);
//# sourceMappingURL=decks.service.js.map