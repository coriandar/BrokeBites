import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/shadcn-ui/button";
import { XCircle } from "lucide-react";
import { Card } from "../ui/shadcn-ui/card";

const BannerAd = ({ isPremium }) => {
    const [isBannerVisible, setIsBannerVisible] = useState(true);

    const hideBanner = () => {
        setIsBannerVisible(false);
    };

    return isPremium
        ? null
        : isBannerVisible && (
              <Link href={"/paymentPage"}>
                  <Card className="fixed right-8 top-20 z-50 flex h-[100px] w-[840px] items-center justify-between rounded-2xl p-4 text-accent-foreground shadow-2xl">
                      <Button className="flex items-center justify-center">
                          <span className="text-xl">Subscribe to premium</span>
                      </Button>
                      <Button onClick={hideBanner} size="icon" variant="ghost">
                          <XCircle className="h-[1.2rem] w-[1.2rem]" />
                      </Button>
                  </Card>
              </Link>
          );
};

export default BannerAd;
