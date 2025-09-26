import { session } from "@/db/schema"
import { HomeView } from "@/modules/home/ui/view/home-view"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import {redirect} from "next/navigation"

const page = async ()=>{
  const session= await auth.api.getSession({
    headers:await headers(),
  })
  if(!session){
    redirect("/sign-in");
  }
  return(
    <HomeView/>
  )
}
export default page;

// neeche vala starting of code hh jo kiya tha maine

// export default function Home() {
//   const {data:session} = authClient.useSession();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const onsubmit = ()=>{
//     authClient.signUp.email({
//       email,
//       name,
//       password
//     },{
//       onError:()=>{
//         window.alert("something went wrong");
//       },
//       onSuccess:()=>{
//         window.alert("successful it is");

//       }
//     })
//   }
//   const onLogin = ()=>{
//     authClient.signIn.email({
//       email,
//       password
//     },{
//       onError:()=>{
//         window.alert("something went wrong try again login");
//       },
//       onSuccess:()=>{
//         window.alert("successful it is login ");

//       }
//     })
//   }
//   if(session){
//     return (
//       <div className="flex flex-col p-4 gap-y-4">
//         <p>logged in as {session.user.name}</p>
//         <Button onClick={()=>{
//           authClient.signOut();
//         }}>sign out</Button>
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col gap-y-10">
//     <div className="flex flex-col gap-2 p-4"> 
//       <Input
//         placeholder="name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <Input
//         placeholder="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <Input
//         type="password"
//         placeholder="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <Button onClick={onsubmit}>create user</Button>
//     </div>
//     <div className="flex flex-col gap-2 p-4"> 
      
//       <Input
//         placeholder="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <Input
//         type="password"
//         placeholder="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <Button onClick={onLogin}>SignIn</Button>
//     </div>
//     </div>
//   );
// }
