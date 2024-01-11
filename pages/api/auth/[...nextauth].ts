import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // !!! Should be stored in .env file.
    GoogleProvider({
      clientId: `777977236389-hgfcfkqd4jutu0oki56fbnivdtdu19t8.apps.googleusercontent.com`,
      clientSecret: `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`,
    }),
  ],
  secret: `UItTuD1HcGXIj8ZfHUswhYdNd40Lc325R8VlxQPUoR0=`,
};
export default NextAuth(authOptions);
