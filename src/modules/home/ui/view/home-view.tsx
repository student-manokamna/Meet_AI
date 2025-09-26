"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { authClient } from "@/lib/auth-client"; 
import { useState } from "react";
import { useRouter  } from "next/navigation";



 export const HomeView =()=>{
  const router= useRouter();
  const {data:session} = authClient.useSession();
  if(!session){
    return(
<p>Loading....</p>
    )
  }
  return(
    <div className="flex flex-col p-4 gap-y-4">
      <p>logged in as {session.user.name}</p>
      <Button onClick={()=>{
        authClient.signOut({fetchOptions:{onSuccess:()=>{
          router.push("/");
        }}});
      }}>sign out</Button>
    </div>  
  )
}
