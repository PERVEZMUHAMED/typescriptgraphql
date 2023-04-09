import { injectable, inject } from "inversify";
import { Types } from "mongoose";
import 'reflect-metadata';
import { TYPES } from "../di/TYPES";
import userModel from "../Model/user.model";
import GetUserRepository from "../repository/getuser.repository";
import { IGetUserBusiness } from "./Interface/getuser.business.repository.interface";
let ObjectId = Types.ObjectId

@injectable()
class GetUserBusiness implements IGetUserBusiness {
    private getuser: GetUserRepository;
    constructor(
        @inject(TYPES.GetUser) public _getuser:GetUserRepository,
    ){
        this.getuser = _getuser;
    }
    public getSpecificUserAuditorDetails = async(args)=>{
        console.log("args", args._id);
        try {
            const getSpecificUserauditordetails = await this.getuser.getUserDetails([
                {$match:{_id:new ObjectId(args._id)}},
                {
                    $lookup:{
                        from:"auditors",
                        localField:"_id",
                        foreignField:"user_id",
                        as:"userAuditorDetails"
                    }
                },
            ],userModel);
            console.log("getSpecificUserauditordetails", getSpecificUserauditordetails);
            return getSpecificUserauditordetails;
        } catch (error) {
            return error;
        }    
    }
    public getSpecificUserAuditorDetailsFDTD = async(args)=>{

        try {
            const getSpecificUserauditordetailsfdtd = await this.getuser.getUserDetails([
                {$match:{_id:new ObjectId(args._id)}},
                {
                    $lookup:{
                        from:"auditors",
                        pipeline:[
                            {
                                $match:{
                                    createdAt:{
                                        $gte:new Date(args.FromDate),
                                        $lte:new Date(args.ToDate),
                                    }
                                }
                            }
                        ],
                        localField:"_id",
                        foreignField:"user_id",
                        as:"userAuditorDetails"
                    }
                },
            ],userModel);
            console.log("getSpecificUserauditordetailsfdtd", getSpecificUserauditordetailsfdtd);
            return getSpecificUserauditordetailsfdtd;
        } catch (error) {
            return error;
        }
    }
    public getSpecificUserAllDetails = async(args)=>{
        console.log("args", args._id);
        try {
            const getSpecificUseralldetails = await this.getuser.getUserDetails([
                {$match:{_id:new ObjectId(args._id)}},
                {
                    $lookup:{
                        from:"wallets",
                        localField:"_id",
                        foreignField:"user_id",
                        as:"walletDetails"
                    },
                },
                {
                    $lookup:{
                        from:"deposits",
                        localField:"_id",
                        foreignField:"user_id",
                        as:"depositDetails"
                    }    
                },
                {
                    $lookup:{
                        from:"withdraws",
                        localField:"_id",
                        foreignField:"user_id",
                        as:"withdrawDetails"
                    },
                }
            ],userModel);
            console.log("getSpecificUseralldetails", getSpecificUseralldetails);
            return getSpecificUseralldetails;
        } catch (error) {
            return error;
        }    
    }
}
export default GetUserBusiness;