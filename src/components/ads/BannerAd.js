import { useState, useEffect } from "react";

const BannerAd = ({ isPremium }) => {
    const [isBannerVisible, setIsBannerVisible] = useState(true);

    const hideBanner = () => {
        setIsBannerVisible(false);
    };

    return isPremium
        ? null
        : isBannerVisible && (
              <div className="fixed right-8 top-20 z-50 flex h-[100px] w-[1000px] items-center justify-between rounded-2xl bg-background p-4 text-accent-foreground">
                  <span className="text-xl text-gray-600">Ad Banner</span>
                  <button
                      onClick={hideBanner}
                      className="cursor-pointer text-xl text-gray-600"
                  >
                      X
                  </button>
              </div>
          );
};

export default BannerAd;
