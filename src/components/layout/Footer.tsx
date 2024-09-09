import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { RequireExactlyOne } from "type-fest";

import { Icon, Icons } from "@/components/Icon";
import { BrandPill } from "@/components/layout/BrandPill";
import { WideContainer } from "@/components/layout/WideContainer";
import { shouldHaveDmcaPage } from "@/pages/Dmca";
import { conf } from "@/setup/config";

// to and href are mutually exclusive
type FooterLinkProps = RequireExactlyOne<
  {
    children: React.ReactNode;
    icon: Icons;
    to: string;
    href: string;
  },
  "to" | "href"
>;

function FooterLink(props: FooterLinkProps) {
  const navigate = useNavigate();

  const navigateTo = useCallback(() => {
    if (!props.to) return;

    navigate(props.to);
  }, [navigate, props.to]);

  
}

function Dmca() {
  const { t } = useTranslation();

  if (!shouldHaveDmcaPage()) return null;
  if (window.location.hash === "#/dmca") return null;

  return (
    <FooterLink to="/dmca" icon={Icons.DRAGON}>
      {t("footer.links.dmca")}
    </FooterLink>
  );
}

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-16 border-t border-type-divider py-16 md:py-8">
      <WideContainer ultraWide classNames="grid md:grid-cols-2 gap-16 md:gap-8">
        <div>
          <div className="inline-block">
            <BrandPill />
          </div>
          <p className="mt-4 lg:max-w-[400px]">{t("footer.tagline")}</p>
        </div>
        <div className="md:text-right">
          <h3 className="font-semibold text-type-emphasis">
            {t("footer.legal.disclaimer")}
          </h3>
          <p className="mt-3">{t("footer.legal.disclaimerText")}</p>
        </div>
        <div className="flex flex-wrap gap-[0.5rem] -ml-3">
         
          <div className="inline md:hidden">
            <Dmca />
          </div>
        </div>
        <div className="hidden items-center justify-end md:flex -mr-3">
          <Dmca />
        </div>
      </WideContainer>
    </footer>
  );
}

export function FooterView(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={["flex min-h-screen flex-col", props.className || ""].join(
        " ",
      )}
    >
      <div style={{ flex: "1 0 auto" }}>{props.children}</div>
      <Footer />
    </div>
  );
}
