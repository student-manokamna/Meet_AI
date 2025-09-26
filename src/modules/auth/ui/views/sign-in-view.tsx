"use client";
import { Card, CardContent } from "@/components/ui/card";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OctagonAlert } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // correct for App Router
import {FaGithub, FaGoogle} from  "react-icons/fa"  

import { authClient } from "@/lib/auth-client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
const formSchema= z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long").max(32, "Password must be at most 32 characters long"),
    
})
export const SignInView = () => {
   const router=useRouter();
   const [error, setError]= useState<string| null>(null);
   const [pending, setPending]= useState(false);
     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onsubmit =(data: z.infer<typeof formSchema>)=>{
    setError(null);
    setPending(true);
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
         callbackURL: "/"
        
      },
      {
        onSuccess:()=>{
          setPending(false);
      
        },
onError:({error})=>{
  setError(error.message);
  setPending(false);
}
      }
    )
  }
   const onsocial =(provider:"github"|"google")=>{
    setError(null);
    setPending(true);
    authClient.signIn.social(
      {
        provider: provider,
         callbackURL: "/"
      },
      {
        onSuccess:()=>{
          setPending(false);
        
        },
onError:({error})=>{
  setError(error.message);
  setPending(false);
}
      }
    )
  }
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/*Form Col 1*/}
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
                    </div>
<div className="grid gap-4">
<FormField control={form.control} name = "email" render={({field}) => (
  <FormItem>
    <FormLabel>Email</FormLabel>
    <FormControl>
      <Input type="email" placeholder="Enter your email " {...field} />
    </FormControl>
    <FormMessage />
  </FormItem>
)}/>

</div>
<div>
  <FormField control={form.control} name = "password" render={({field}) => (
  <FormItem>
    <FormLabel>Password</FormLabel>
    <FormControl>
      <Input type="password" placeholder="Enter your password" {...field} />
    </FormControl>
    <FormMessage />
  </FormItem>
)}/>
</div>
{
  !!error && (
    <Alert className="destructive/10 bg-red-100 ">
      <OctagonAlert className="h-4 w-4 !text-destructive" />  
      <AlertTitle>{error}</AlertTitle>
    </Alert>
  )
}
<Button disabled={pending} type="submit" className="w-full">Sign In</Button>
<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
 <span className="bg-card text-muted-foreground relative px-2 z-10"> or continue with</span>
</div>
<div className="grid grid-cols-2 gap-4">
  <Button  onClick={()=>onsocial("google")} disabled={pending} variant="outline" type="button" >
  <FaGoogle/>
  </Button>

  <Button  onClick={()=>onsocial("github")}
 disabled={pending} variant="outline" type="button"  >
  <FaGithub/>
  </Button>

</div>
<div className="text-center text-sm text-muted-foreground">
  Don't have an account?{" "}
  <Link href="/sign-up" className="underline underline-offset-4 hover:text-primary">Sign-up</Link>
</div>

            </div>
          </form>
          </Form>
          <div className="bg-radial from-gray-400 to-purple-600 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]"/>
            <p className="text-2xl font-semibold text-white">
              Meet.AI
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
  By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
</div>
    </div>
  );
};