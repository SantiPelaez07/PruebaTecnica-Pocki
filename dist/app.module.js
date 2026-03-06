"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const database_config_1 = require("./infrastructure/database/database.config");
const Message_entity_1 = require("./domain/entities/Message.entity");
const ResponseMessage_entity_1 = require("./domain/entities/ResponseMessage.entity");
const Chat_controller_1 = require("./infrastructure/controllers/Chat.controller");
const Chat_service_1 = require("./application/services/Chat.service");
const Openai_service_1 = require("./application/services/Openai.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(database_config_1.databaseConfig),
            typeorm_1.TypeOrmModule.forFeature([Message_entity_1.Message, ResponseMessage_entity_1.Response]),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
        ],
        controllers: [Chat_controller_1.ChatController],
        providers: [Chat_service_1.ChatService, Openai_service_1.OpenAIService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map