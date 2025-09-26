
import { Card } from "@/components/ui/card"
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {redirect} from "next/navigation"
const Page =async ()=>{
    console.log("sign-in page");
    const session= await auth.api.getSession({
        headers:await headers(),
      })
      if(!!session){
        redirect("/");
      }
    return(
        <SignInView/>
      
    )
}
export default Page; 