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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const mongoose_1 = require("mongoose");
require("reflect-metadata");
const TYPES_1 = require("../di/TYPES");
const user_model_1 = __importDefault(require("../Model/user.model"));
const getuser_repository_1 = __importDefault(require("../repository/getuser.repository"));
let ObjectId = mongoose_1.Types.ObjectId;
let GetUserBusiness = class GetUserBusiness {
    constructor(_getuser) {
        this._getuser = _getuser;
        this.getSpecificUserAuditorDetails = (args) => __awaiter(this, void 0, void 0, function* () {
            console.log("args", args._id);
            try {
                const getSpecificUserauditordetails = yield this.getuser.getUserDetails([
                    { $match: { _id: new ObjectId(args._id) } },
                    {
                        $lookup: {
                            from: "auditors",
                            localField: "_id",
                            foreignField: "user_id",
                            as: "userAuditorDetails"
                        }
                    },
                ], user_model_1.default);
                console.log("getSpecificUserauditordetails", getSpecificUserauditordetails);
                return getSpecificUserauditordetails;
            }
            catch (error) {
                return error;
            }
        });
        this.getSpecificUserAuditorDetailsFDTD = (args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getSpecificUserauditordetailsfdtd = yield this.getuser.getUserDetails([
                    { $match: { _id: new ObjectId(args._id) } },
                    {
                        $lookup: {
                            from: "auditors",
                            pipeline: [
                                {
                                    $match: {
                                        createdAt: {
                                            $gte: new Date(args.FromDate),
                                            $lte: new Date(args.ToDate),
                                        }
                                    }
                                }
                            ],
                            localField: "_id",
                            foreignField: "user_id",
                            as: "userAuditorDetails"
                        }
                    },
                ], user_model_1.default);
                console.log("getSpecificUserauditordetailsfdtd", getSpecificUserauditordetailsfdtd);
                return getSpecificUserauditordetailsfdtd;
            }
            catch (error) {
                return error;
            }
        });
        this.getSpecificUserAllDetails = (args) => __awaiter(this, void 0, void 0, function* () {
            console.log("args", args._id);
            try {
                const getSpecificUseralldetails = yield this.getuser.getUserDetails([
                    { $match: { _id: new ObjectId(args._id) } },
                    {
                        $lookup: {
                            from: "wallets",
                            localField: "_id",
                            foreignField: "user_id",
                            as: "walletDetails"
                        },
                    },
                    {
                        $lookup: {
                            from: "deposits",
                            localField: "_id",
                            foreignField: "user_id",
                            as: "depositDetails"
                        }
                    },
                    {
                        $lookup: {
                            from: "withdraws",
                            localField: "_id",
                            foreignField: "user_id",
                            as: "withdrawDetails"
                        },
                    }
                ], user_model_1.default);
                console.log("getSpecificUseralldetails", getSpecificUseralldetails);
                return getSpecificUseralldetails;
            }
            catch (error) {
                return error;
            }
        });
        this.getuser = _getuser;
    }
};
GetUserBusiness = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(TYPES_1.TYPES.GetUser)),
    __metadata("design:paramtypes", [getuser_repository_1.default])
], GetUserBusiness);
exports.default = GetUserBusiness;
