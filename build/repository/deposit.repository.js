"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class DepositRepository {
    constructor() {
        this.Create = (args, model) => __awaiter(this, void 0, void 0, function* () {
            try {
                const create = yield model.create();
                return create;
            }
            catch (error) {
                return error;
            }
        });
        this.Findone = (args, model) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
            }
        });
        this.Find = (args, model) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
            }
        });
        this.wallet = (args, model) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
            }
        });
    }
}
exports.default = DepositRepository;
