'use client';
import {z} from 'zod';
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
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import { useRouter } from 'next/navigation'
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;

const formSchema = z.object({
    project_id: z.string().min(2).max(20)
});

export default  function StudyPage() {
    const supabase = createClient()
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            project_id: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const {data, error} = await supabase
            .from('Study')
            .insert({project_id: values.project_id})

        form.reset()
        router.refresh()
    }


    return (
        <Form {...form}>
            {Math.random()}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="project_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project ID</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

