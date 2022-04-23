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
           const user = await User.create(args);
           // create json web token
           const token = signToken(user);
           // return what is called an authorize type in the "typedef" for this mutation
           return {token, user}; 
       },
       login: async (parent,{email,password}) => {
           const user = await User.findOne({email})
           if(!user) {
               throw new AuthenticationError('incorrect credentials');
           }
           const correctPw = await user.isCorrectPassword(password);

           if(!correctPw) {
               throw new AuthenticationError('incorrect credentials');
           }
           const token = signToken(user);
      // this is considered the authorize type in "typeDefs"
           return {user,token}
       },
       saveBook: async (parent,{bookToSave},context) => {
           if(context.user) { 
           const userAddBook = await User.findOneAndUpdate(
               { _id: context.user._id },
               { $addToSet: { savedBooks: bookToSave } },
               { new: true }
           ).populate('savedBooks');
           return userAddBook;
       }
       throw new AuthenticationError('you need to be logged in first');
      
       },
       deleteBook: (parent,{bookId},context) => {
           if(context.user) {
               const userDeleteBook = User.findOneAndUpdate(
                   {_id: context.user._id},
                   {$pull:{ savedBooks: {bookId: bookId }}},
                   {new: true}
               ).populate('savedBooks');
               return userDeleteBook;
           }
           throw new AuthenticationError('you need to be logged in first');
       }
    }
};

module.exports = resolvers;