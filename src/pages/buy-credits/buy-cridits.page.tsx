import BuyCreditsTable from "@/components/buy-credits/buy-credits-table";

import { useMutation } from "@tanstack/react-query";
import StripeAPI from "@/api/stripe";
import { useToast } from "@/utils/toaster/use-toast";
import { TypographyH1, TypographyMuted } from "@/components/ui/typography";

function BuyCreditsPage() {
  const { toast } = useToast();
  const paymentMutation = useMutation({ mutationFn: StripeAPI.payment });

  const handleSubmit = async (quantity: number) => {
    try {
      const response = await paymentMutation.mutateAsync(quantity);
      const stripeLink = response.data.url;
      window.open(stripeLink, "_self");
    } catch (error) {
      toast({
        title: "Error",
        description: error as string,
        variant: "destructive",
      });
    }
  };

  return (
    <section className="flex flex-col space-x-4 h-full">
      <div className="px-12 py-8">
        <TypographyH1>Buy Credits</TypographyH1>
        <TypographyMuted className="text-text_02">
          Elementum facilisis nunc in ultricies nibh. Est mattis nisl id in consequat sed.
        </TypographyMuted>
      </div>

      <div className="border-b border-input"></div>

      <BuyCreditsTable onSubmit={handleSubmit} />
    </section>
  );
}

export default BuyCreditsPage;
