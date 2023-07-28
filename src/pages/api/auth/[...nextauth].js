import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import {checkUserEmailPassword} from 'database/models/autentication';


export const authOptions = {
  
  providers: [
    CredentialsProvider({
      
      name: "Credentials",
      
      credentials: {
        username: { label: "Nombre Usuario", type: "text", placeholder: "usuario" },
        password: { label: "Contraseña", type: "password", placeholder: 'Contraseña' }
      },
      async authorize(credentials, req) {

      const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
      //const user = await checkUserEmailPassword(credentials.username, credentials.password);

        if (user) {
         
          return user;
        } else {
          return null;
  
         } 
      }
    })
  ],
  // rutas de las vistas
  pages: {
    signIn: '/login',
    error: '/login',
    //newUser: '/auth/register'
  },

  session: {
    maxAge: 86400, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },

  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log("jwt");
      
      return token
    },
    async session({ session, token, user }){
      console.log("session");
      console.log({ session, token, user });
      //session.user = token.session?.user;
      //session.userRole = token.userRole;

      return session;
    }
  },
}

export default NextAuth(authOptions)
