import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const bookingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  businessName: z.string().min(1, "Business name is required"),
  businessLink: z.string().min(1, "Business website is required"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  phoneNumber: z.string().optional(),
  industry: z.string().min(1, "Industry is required"),
  targetAudience: z.string().optional(),
  keyMessage: z.string().optional(),
  visualReferences: z.string().optional(),
}).refine((data) => data.email || data.phoneNumber, {
  message: "Please provide at least an email or phone number",
  path: ["email"],
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      businessName: "",
      businessLink: "",
      email: "",
      phoneNumber: "",
      industry: "",
      targetAudience: "",
      keyMessage: "",
      visualReferences: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        name: data.name,
        businessName: data.businessName,
        businessLink: data.businessLink,
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        industry: data.industry,
        targetAudience: data.targetAudience || "",
        keyMessage: data.keyMessage || "",
        visualReferences: data.visualReferences || "",
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(
        "https://drewp.app.n8n.cloud/webhook/de92f751-0138-4303-b1c6-434349a84d02",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", response.status, errorText);
        throw new Error(`Failed to submit form: ${response.status}`);
      }

      toast({
        title: "Success!",
        description: "Your booking request has been submitted successfully.",
      });

      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" data-testid="text-form-title">
            Book Your Campaign
          </h1>
          <p className="mt-2 text-muted-foreground">
            Fill out the form below to get started
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your full name"
                      data-testid="input-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your business name"
                      data-testid="input-business-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Website *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="yourbusiness.com"
                      data-testid="input-business-link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      data-testid="input-email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      data-testid="input-phone-number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm text-muted-foreground -mt-4">
              * At least one contact method (email or phone) is required
            </p>

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Technology, Healthcare, Finance"
                      data-testid="input-industry"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Target Audience (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your target audience..."
                      data-testid="input-target-audience"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keyMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Message to Communicate (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What message do you want to convey?"
                      data-testid="input-key-message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visualReferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visual References/Examples (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste links to visual references or examples..."
                      data-testid="input-visual-references"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              data-testid="button-submit"
            >
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
