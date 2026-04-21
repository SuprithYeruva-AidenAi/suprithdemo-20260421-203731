import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DashboardService } from '../services/dashboardService';
import { UOITimeoutError, UOIUnavailableError, UOIUpstreamError } from '../api/uoi';

const PRODUCT_NAMES: Record<string, string> = {
  TR01: 'Travel',
  HM01: 'Home',
  MO01: 'Motor',
  DH01: 'Domestic Helper',
};

export default function ProductList() {
  const { productCode } = useParams<{ productCode: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<Array<{ id: string; title: string; status?: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productCode) return;
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    DashboardService.listByProduct(productCode, ctrl.signal)
      .then((data: any) => {
        if (Array.isArray(data)) setItems(data);
        else setItems([]);
      })
      .catch((e: any) => {
        if (e?.name === 'AbortError') return;
        if (e instanceof UOITimeoutError) setError('The service timed out. Please try again.');
        else if (e instanceof UOIUnavailableError) setError('The service is temporarily unavailable. Please try again shortly.');
        else if (e instanceof UOIUpstreamError) setError('Something went wrong. Please try again.');
        else setError('Something went wrong. Please try again.');
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [productCode]);

  const productName = productCode ? (PRODUCT_NAMES[productCode] ?? productCode) : 'Product';

  return (
    <div className="min-h-screen w-full flex flex-col font-[Noto_Sans] bg-white bg-[linear-gradient(to_bottom,rgba(0,94,184,0.07)_0%,rgba(92,85,235,0.07)_73%)]">
      <div className="flex-1 max-w-[800px] mx-auto w-full px-[24px] py-[48px] flex flex-col gap-[24px]">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-[8px] text-[14px] leading-[21px] text-[#6e6e6e] cursor-pointer hover:opacity-70 w-fit"
        >
          <ChevronLeft className="w-[20px] h-[20px]" />
          <span>Back to Dashboard</span>
        </button>

        <h1 className="text-[32px] font-bold leading-[38.4px] text-[#212121]">{productName} Policies</h1>

        {error && (
          <div className="flex items-center justify-between px-[16px] py-[12px] bg-red-50 border border-red-200 rounded-[8px]">
            <span className="text-[14px] text-[#dc3545]">{error}</span>
            <button
              onClick={() => {
                if (!productCode) return;
                const ctrl = new AbortController();
                setLoading(true);
                setError(null);
                DashboardService.listByProduct(productCode, ctrl.signal)
                  .then((data: any) => {
                    if (Array.isArray(data)) setItems(data);
                    else setItems([]);
                  })
                  .catch(() => setError('Something went wrong. Please try again.'))
                  .finally(() => setLoading(false));
              }}
              className="text-[14px] font-medium text-[#005eb8] underline cursor-pointer ml-[16px]"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col gap-[16px]">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[80px] bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 && !error ? (
          <div className="flex flex-col items-center justify-center py-[64px] gap-[16px]">
            <p className="text-[16px] leading-[24px] text-[#6e6e6e] text-center">No policies found for {productName}.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center px-[24px] py-[12px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90"
            >
              <span className="text-[16px] font-medium text-white">Back to Dashboard</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-[16px]">
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-[12px] px-[16px] py-[16px] bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90"
              >
                <div className="flex flex-col gap-[4px] flex-1">
                  <span className="text-[16px] font-medium leading-[24px] text-[#212121]">{item.title}</span>
                  {item.status && (
                    <span className={`text-[12px] font-medium px-[8px] py-[2px] rounded-full w-fit ${
                      item.status === 'In Force' ? 'bg-green-100 text-green-700' :
                      item.status === 'Expired' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{item.status}</span>
                  )}
                  <span className="text-[14px] leading-[21px] text-[#6e6e6e]">Policy ID: {item.id}</span>
                </div>
                <ChevronRight className="w-[16px] h-[16px] text-[#212121] shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-between px-[24px] py-[16px] bg-[#005eb8] h-[53px]">
        <span className="text-[14px] leading-[21px] text-white">Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
        <span className="text-[14px] leading-[21px] text-white text-right">All Rights Reserved.</span>
      </div>
    </div>
  );
}