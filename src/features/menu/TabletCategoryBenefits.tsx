import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";

export function TabletCategoryBenefits({
  isDrinksCategory,
}: {
  isDrinksCategory: boolean;
}) {
  return (
    <div className="mt-4 grid grid-cols-4 rounded-[14px] border border-white/14 bg-white/[0.035] p-4">
      {isDrinksCategory ? (
        <>
          <TabletBenefit icon={icons.flower} title="Pairing Logic">
            Matched By Course
          </TabletBenefit>
          <TabletBenefit icon={icons.crown} title="Sake Cellar">
            Reserve In-House
          </TabletBenefit>
          <TabletBenefit icon={icons.chef} title="Zero Proof">
            Online Ready
          </TabletBenefit>
          <TabletBenefit icon={icons.clock} title="Tea Service">
            Order Or Reserve
          </TabletBenefit>
        </>
      ) : (
        <>
          <TabletBenefit icon={icons.flower} title="Premium Ingredients">
            Market Fresh
          </TabletBenefit>
          <TabletBenefit icon={icons.crown} title="Expert Craftsmanship">
            By Master Chefs
          </TabletBenefit>
          <TabletBenefit icon={icons.chef} title="Authentic Experience">
            Traditional. Refined.
          </TabletBenefit>
          <TabletBenefit icon={icons.bag} title="Allergen Info">
            Available Upon Request
          </TabletBenefit>
        </>
      )}
    </div>
  );
}

function TabletBenefit({
  children,
  icon,
  title,
}: {
  children: string;
  icon?: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4 border-r border-white/10 px-4 last:border-r-0">
      <AssetIcon size={36} src={icon} />
      <p>
        <span className="block text-sm uppercase text-white/78">{title}</span>
        <span className="mt-1 block text-sm text-white/64">{children}</span>
      </p>
    </div>
  );
}
