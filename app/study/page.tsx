'use client';
import {set, z} from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import {  useStudy } from '../studyProvider';

const formSchema = z.object({
    project_id: z.string().min(2).max(20)
});

export default function StudyPage() {
    const supabase = createClient()
    const router = useRouter();
    const study = useStudy();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            project_id: "",
        }
    })

    useEffect(() =>{
        console.log('render')
        if(study !== null && study.study !== null){
            form.setValue('project_id', study?.study?.project_id)
        }
    }, [study])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if(study !== null && study?.study !== null){
            const {data, error} = await supabase
            .from('Study')
            .update({project_id: values.project_id})
            .eq("id", study.study.id)

        form.reset()
        router.refresh()
        study.getStudy()
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="project_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project ID</FormLabel>
                            <FormControl>
                                <Input placeholder="project ID" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

