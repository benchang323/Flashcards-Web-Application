"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecksModule = void 0;
const deck_entity_1 = require("./deck.entity");
const common_1 = require("@nestjs/common");
const decks_service_1 = require("./decks.service");
const typeorm_1 = require("@nestjs/typeorm");
const decks_controller_1 = require("./decks.controller");
let DecksModule = class DecksModule {
};
exports.DecksModule = DecksModule;
exports.DecksModule = DecksModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([deck_entity_1.Deck])],
        providers: [decks_service_1.DecksService],
        controllers: [decks_controller_1.DecksController],
        exports: [decks_service_1.DecksService],
    })
], DecksModule);
//# sourceMappingURL=decks.module.js.map