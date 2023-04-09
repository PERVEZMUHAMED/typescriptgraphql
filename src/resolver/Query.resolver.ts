import { ApolloError } from "apollo-server-express";
import { getuser } from "../di/container.di"


export const queryResolver = {
    Query:{
        getUserAuditorDetails: async(parent, args, context)=>{
            try {
                const getusers = await getuser.getSpecificUserAuditorDetails(args);
                if(!getusers) throw new ApolloError("Data NotFound", "401");
                return getusers;
            } catch (error) {
                return error;
            }
        },
        getSpecificUserAuditorDetailsFDTD:async(parent, args, context)=>{
            try {
                const getusers = await getuser.getSpecificUserAuditorDetailsFDTD(args);
                if(!getusers) throw new ApolloError("Data NotFound", "401");
                return getusers;
            } catch (error) {
                return error;
            }
        },
        getSpecificUserAllDetails:async(parent, args, context)=>{
            try {
                const getusers = await getuser.getSpecificUserAllDetails(args);
                if(!getusers) throw new ApolloError("Data NotFound", "401");
                return getusers;
            } catch (error) {
                return error;
            }
        },
    }    
}
