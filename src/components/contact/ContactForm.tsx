import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Loader2, Signature } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const FormSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  title: z.string().nonempty({ message: "Title is required" }),
  email: z
    .email({ message: "Not valid email" })
    .nonempty({ message: "Email is required" }),
  time: z.string(),
  message: z.string().nonempty({ message: "Message is required" }),
});
export default function ContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      title: "",
      time: new Date().toUTCString(),
    },
  });

  const onSubmit = useCallback(async (data: z.infer<typeof FormSchema>) => {
    const sendData = {
      service_id: "service_aysqtup",
      template_id: "template_zzpu4ld",
      user_id: "PRPyrNWK7RZRJhmKM",
      template_params: data,
    };
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "post",
      body: JSON.stringify(sendData),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      toast.success("Sending successful");
    } else {
      toast.error("Have something error");
    }
  }, []);

  return (
    <Card className="  max-w-xl  w-11/12 flex-1 z-0">
      <CardHeader>
        <CardTitle className=" flex items-center gap-3">
          <Signature
            size={48}
            className=" p-2 text-primary  bg-secondary rounded-full"
          />
          <span>
            <h1 className=" text-2xl">Contact Me</h1>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <Input placeholder="Small Z" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <Input placeholder="oscar48079@gmail.com  " {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <Input placeholder="Title" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <Textarea placeholder="Message" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2 className="  animate-spin" />
              )}
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
