import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export type ProductType = 'money_systems' | 'work_systems' | 'media_company';

export interface Purchase {
  id: string;
  user_id: string;
  product_type: string;
  purchased_at: string;
  stripe_session_id: string | null;
}

export const usePurchases = () => {
  const { user } = useAuth();

  const { data: purchases, isLoading, error } = useQuery({
    queryKey: ['purchases', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_purchases')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as Purchase[];
    },
    enabled: !!user,
  });

  const hasMoneyAccess = purchases?.some(p => p.product_type === 'money_systems') ?? false;
  const hasWorkAccess = purchases?.some(p => p.product_type === 'work_systems') ?? false;
  const hasMediaCompanyAccess = purchases?.some(p => p.product_type === 'media_company') ?? false;
  const hasBothAccess = hasMoneyAccess && hasWorkAccess;

  return {
    purchases,
    isLoading,
    error,
    hasMoneyAccess,
    hasWorkAccess,
    hasMediaCompanyAccess,
    hasBothAccess,
  };
};
