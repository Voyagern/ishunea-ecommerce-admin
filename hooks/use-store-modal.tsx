import {create} from "zustand";
import {set} from "yaml/dist/schema/yaml-1.1/set";

interface useStoreModalStore{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
};
export const useStoreModal=create<useStoreModalStore>((set)=>({
    isOpen:true,
    onOpen:()=> set({isOpen:true}),
    onClose:()=> set({isOpen:false}),

}));