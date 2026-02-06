import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export type ProductType = 'money_systems' | 'work_systems' | 'media_company';

export interface Purchase {
  id: string;
  user_id: string;
  product_type: string;
  purchased_at: string;
  created_at: string;
  updated_at: string;
}

export const usePurchases = () => {
  const { user } = useAuth();

  const { data: purchases, isLoading, error } = useQuery({
    queryKey: ['purchases', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // Use the safe view that excludes sensitive stripe_session_id
      // Cast to unknown first since the view isn't in generated types
      const { data, error } = await supabase
        .from('user_purchases_safe' as 'user_purchases')
        .select('id, user_id, product_type, purchased_at, created_at, updated_at')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return (data ?? []) as unknown as Purchase[];
      return data as Purchase[];
    },
    enabled: !!user,
  });

  const hasMoneyAccess = purchases?.some(p => p.product_type === 'money_systems') ?? false;
  const hasWorkAccess = purchases?.some(p => p.product_type === 'work_systems') ?? false;
  const hasMediaCompanyAccess = purchases?.some(p => p.product_type === 'media_company') ?? false;
  const hasWealthCodeBook = purchases?.some(p => p.product_type === 'wealth_code_book') ?? false;
  const hasBothAccess = hasMoneyAccess && hasWorkAccess;

  // Wealth Code Book is included with Money Systems bundle
  const hasEbookAccess = hasWealthCodeBook || hasMoneyAccess;

  return {
    purchases,
    isLoading,
    error,
    hasMoneyAccess,
    hasWorkAccess,
    hasMediaCompanyAccess,
    hasWealthCodeBook,
    hasEbookAccess,
    hasBothAccess,
  };
};
