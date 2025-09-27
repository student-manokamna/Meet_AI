import {createAvatar} from '@dicebear/core';
import {botttsNeutral, initials} from '@dicebear/collection';
import {cn} from '@/lib/utils';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';

interface GenerateAvatarProps { 
    seed: string,
    className?: string,
    variant?: 'botttsNeutral' | 'initials';
}
export const GenerateAvatar =({
    seed, 
    className, 
    variant}:GenerateAvatarProps)=>{
        let avatar;
        if(variant==="botttsNeutral"){
            avatar=createAvatar(botttsNeutral,{
                seed,
                 })
                }
            else{
                avatar=createAvatar(initials,{
                    seed,
                    fontWeight:500,
                    fontSize:40,
                });

            }
            return (
  <Avatar className={cn(className)}>
    <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
    <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
  </Avatar>
)

    };


