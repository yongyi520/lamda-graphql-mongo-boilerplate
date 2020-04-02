const rootResolvers = {
  Query: {
    _: async (parentValue, args, { ctx }, info) => {
      console.log('root query')
      return 'Root Query'
    }
  },
  Mutation: {
    _: async (parentValue, args, { ctx }, info) => {
      console.log('root mutation')
      return 'Root Mutation'
    } 
  }
}

module.exports = rootResolvers