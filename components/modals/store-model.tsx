"use client";

import * as z from "zod";

import {Modal} from "../ui/modal"
import {useStoreModal} from "@/hooks/use-store-modal";
import {Form, FormControl, FormField, FormItem, FormMessage, useFormField} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema=z.object({
    name: z.string().min(1),

});

export const StoreModal = () =>{
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
        },
    }) ;
    const onSubmit=async (values:z.infer<typeof formSchema>)=>{

        try{
            setLoading(true);

            const response= await axios.post('/api/stores',values);

           window.location.assign(`/${response.data.id}`)
        }catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return(
    <Modal title="create store"
           description="add a new astore to manage products"
           isOpen={storeModal.isOpen}
           onCLose={storeModal.onClose}>
       <div>
        <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    control={form.control}
                    name="name"
                    render={({field})=>(
                        <FormItem>
                            <FormItem>Name</FormItem>
                            <FormControl>
                                <Input disabled={loading} placeholder="E-commers"{...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                        <Button variant="outline" onClick={storeModal.onClose}
                        disabled={loading}>
                            Cancel
                        </Button>

                        <Button typeof="submit"
                        disabled={loading}>
                            Continue
                        </Button>

                    </div>


                </form>
            </Form>
        </div>
        </div>
    </Modal>
    )}