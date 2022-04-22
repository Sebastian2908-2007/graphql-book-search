const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
         getMe: async (parent,args,context) => {
             if(context.user) {
                 const userData = await User.findOne({_id: context.user._id})
                 .select('-__v -password')
                 .populate('savedBooks');

                 return userData;
             }
             throw new AuthenticationError('your not logged in');
         },
    },
    Mutation: {
       addUser: async (parent,args) => {
           const user = User.create(args);
           // create json web token
           const token = signToken(user);
           // return what is called an authorize type in the "typedef" for this mutation
           return {token, user}; 
       },
    }
};

module.exports = resolvers;