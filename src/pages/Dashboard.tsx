import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Shield,
  File,
  Settings,
  PanelLeft,
  HelpCircle,
  Bell,
  ChevronRight,
  Car,
  ArrowRight,
  ShieldCheck,
  User,
} from 'lucide-react';
import {
  DashboardService,
  type DashboardModel,
  type DashboardCard,
} from '../services/dashboardService';
import { UOITimeoutError, UOIUnavailableError, UOIUpstreamError } from '../api/uoi';

export default function Dashboard() {
  const navigate = useNavigate();
  const [model, setModel] = useState<DashboardModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    DashboardService.getSummary(ctrl.signal)
      .then((m) => setModel(m))
      .catch((e) => {
        if (e?.name === 'AbortError') return;
        if (e instanceof UOITimeoutError) setError('The service timed out. Please try again.');
        else if (e instanceof UOIUnavailableError) setError('The service is temporarily unavailable. Please try again shortly.');
        else if (e instanceof UOIUpstreamError) setError('Something went wrong. Please try again.');
        else setError('Something went wrong. Please try again.');
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  const handleRefresh = () => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    DashboardService.refreshSummary(ctrl.signal)
      .then(setModel)
      .catch(() => setError('Something went wrong. Please try again.'))
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    DashboardService.invalidate();
    navigate('/');
  };

  const coverageCards = [
    {
      id: 'travel',
      icon: <span className="text-[16px]">✈️</span>,
      title: 'Travel',
      covered: true,
      productCode: 'TR01',
      content: (
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center gap-[8px] px-[12px] py-[8px] bg-white bg-[linear-gradient(to_bottom,rgba(0,94,184,0.07)_0%,rgba(92,85,235,0.07)_73%)] rounded-[8px] border border-[#e0e0e0]">
            <span className="flex-1 text-[14px] font-medium leading-[21px] bg-gradient-to-r from-[#005eb8] to-[#5c55eb] bg-clip-text text-transparent">New trip? Get covered in 2 minutes.</span>
            <button className="flex items-center justify-center px-[16px] py-[8px] h-[32px] bg-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90">
              <span className="text-[14px] font-medium leading-[21px] text-white">Buy Now</span>
            </button>
          </div>
          <div className="flex items-center gap-[4px] px-[12px] py-[12px] bg-[#f9f9f9] rounded-[12px] cursor-pointer hover:opacity-90">
            <div className="flex flex-col gap-[4px] flex-1">
              <span className="text-[14px] font-medium leading-[21px] text-[#212121]">InsureTravel (Annual Trip)</span>
              <div className="flex items-center gap-[4px]">
                <span className="text-[12px] font-medium text-green-600 bg-green-100 px-[6px] py-[2px] rounded-full">In Force</span>
              </div>
              <span className="text-[14px] leading-[21px] text-[#6e6e6e]">Policy No: PNF320104124A23</span>
            </div>
            <ChevronRight className="w-[16px] h-[16px] text-[#212121]" />
          </div>
          <div className="flex items-center gap-[4px] px-[12px] py-[12px] bg-[#f9f9f9] rounded-[12px] cursor-pointer hover:opacity-90">
            <div className="flex flex-col gap-[4px] flex-1">
              <span className="text-[14px] font-medium leading-[21px] text-[#212121]">UniTravel (Single Trip)</span>
              <div className="flex items-center gap-[4px]">
                <span className="text-[12px] font-medium text-red-600 bg-red-100 px-[6px] py-[2px] rounded-full">Expired</span>
              </div>
              <span className="text-[14px] leading-[21px] text-[#6e6e6e]">Policy No: PNF320104124A23</span>
            </div>
            <ChevronRight className="w-[16px] h-[16px] text-[#212121]" />
          </div>
        </div>
      ),
    },
    {
      id: 'home',
      icon: <Home className="w-[24px] h-[24px]" />,
      title: 'Home',
      covered: true,
      productCode: 'HM01',
      content: (
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center gap-[4px] px-[12px] py-[12px] bg-[#f9f9f9] rounded-[12px] cursor-pointer hover:opacity-90">
            <div className="flex flex-col gap-[4px] flex-1">
              <div className="flex items-center gap-[8px]">
                <span className="text-[14px] font-medium leading-[21px] text-[#212121]">UniHome</span>
                <span className="text-[12px] font-medium text-orange-600 bg-orange-100 px-[6px] py-[2px] rounded-full">Renewal Due</span>
              </div>
              <span className="text-[14px] leading-[21px] text-[#6e6e6e]">Policy No: PNF320104124A23</span>
            </div>
            <ChevronRight className="w-[16px] h-[16px] text-[#212121]" />
          </div>
        </div>
      ),
    },
    {
      id: 'motor',
      icon: <Car className="w-[24px] h-[24px]" />,
      title: 'Motor',
      covered: false,
      productCode: 'MO01',
      content: (
        <p className="text-[16px] leading-[24px] text-[#212121]">
          Protect your car from $X/year with your pre-filled details. Get quote{' '}
          <span className="text-[#005eb8] underline cursor-pointer">here</span>.
        </p>
      ),
    },
    {
      id: 'helper',
      icon: <User className="w-[24px] h-[24px]" />,
      title: 'Helper',
      covered: true,
      productCode: 'DH01',
      content: (
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center gap-[4px] px-[12px] py-[12px] bg-[#f9f9f9] rounded-[12px] cursor-pointer hover:opacity-90">
            <div className="flex flex-col gap-[4px] flex-1">
              <div className="flex items-center gap-[8px]">
                <span className="text-[14px] font-medium leading-[21px] text-[#212121]">UniHelper</span>
                <span className="text-[12px] font-medium text-green-600 bg-green-100 px-[6px] py-[2px] rounded-full">In Force</span>
              </div>
              <span className="text-[14px] leading-[21px] text-[#6e6e6e]">Policy No: PNF320104124A23</span>
            </div>
            <ChevronRight className="w-[16px] h-[16px] text-[#212121]" />
          </div>
        </div>
      ),
    },
    {
      id: 'hospitalisation',
      icon: <Shield className="w-[24px] h-[24px]" />,
      title: 'Hospitalisation Protection',
      covered: false,
      productCode: null,
      content: (
        <p className="text-[16px] leading-[24px] text-[#212121]">
          Cover day-to-day expenses when hospitalised from $X/year. Get quote{' '}
          <span className="text-[#005eb8] underline cursor-pointer">here</span>.
        </p>
      ),
    },
    {
      id: 'personal-accident',
      icon: <User className="w-[24px] h-[24px]" />,
      title: 'Personal Accident',
      covered: false,
      productCode: null,
      content: (
        <p className="text-[16px] leading-[24px] text-[#212121]">
          Get medical coverage for accidents from $X/year with your pre-filled details. Get quote{' '}
          <span className="text-[#005eb8] underline cursor-pointer">here</span>.
        </p>
      ),
    },
  ];

  const rewardCards = [
    {
      img: 'https://s3-alpha-sig.figma.com/img/3ccc/e6dc/76312628f87fe4b2face85c5785f97c9?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GhaZPejTzke73Bac0TcIa9Ka8QfE1svJkJKAmX9vBmxuxClyX5GI605d2rWLR02X70oJAWg~aalQBukfGG7TAupVf84tGtC8uA3mFFdtu~CpDDoZ5Mds6AJuHjxSvF-aAU2s7q9cTSrC7J-hZ9Lud0ik~M9Kpl7AGE1nll7LSB0tXKhuyDrgHoQ0POfuhs766Iv7Bf6dFmdIQXNB0fDua5xyOuI7jUYQu3LyrFBt8--0QBFEi9TMQpLiszMlxmo2MYx7TnEVa7aAalfEuO81Uc9UoOQDZuS3jxs1umlWslzCFI32G7Z5NDCj5UhTMnQSRhIxjPOtQ9S6PftVMJW03g__',
      logo: 'https://s3-alpha-sig.figma.com/img/86bf/5a50/b8f3a3749921a7a5868d0591a840460d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=roDYZCuP6L95dqOCJWUcchZ3j2HP8gd~x9MbTBJCHBULbSAd3GRACaGNZVY5f2SBbAQ5~gPFsFBMqRfz~Wmpxl7Zza0ZpLgIX5D-zdEe1BVX7EPzQXCMs26Afyrz1A-k0-TDwjDGZZsfftsUINAIE~iOkoXjGMtgScU6xOOTHNW~JL6Ip4AgOGfElYKGOeHY--5sMXi6qw~KPrMS8JG~FYUqwiIZlSpEeul~A~FGVIiHHqBOi~ZO-i0OUtklAkZsjLb3iBV~NtHCeWGa6G4zy2x6cPzDyTRqHozLZSh05vQYxseV-o361MFESUfScUeQMPNGr5tIyjDkLY-BvqOaSA__',
      title: '10% off KITH by Casa Products',
      desc: 'Enter promo code UOIKITH10 at checkout on www.kith.sg to enjoy the offer.',
      btn: 'Shop Now',
    },
    {
      img: 'https://s3-alpha-sig.figma.com/img/85ca/0b3b/5576e86be97d861823edf673af1c11f8?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=a6Q-4PS8zNmSpAlOSoIJckd-Mt0qPamBFfQwVawVB17k1R2k9ZcuGq~PaW-ZT2ay39Qh8WjdKmxuuBYNPbv5lOgShBkXaAcv3ruXC9eMwKH9PX9v3fCc5~zoDXLOYJqxtDA5bhwtsvSPYkBzux3Zfy~SMuQp2xHuTup6mt6YBAU1v0fsvO~oTQz0m4ZSCJauehADpfMW1t~SGV9iRdMU9FyYMBzG6FSD0sQwyGelAAtRYF036ATKHMGRAGK-pCF1cZ51tzAsQ8QNn6bRnPHXXqc1inCVU4sS6iajgHw0dF1~ZtExq32bAJ-BvfBu3EMwZhHmbuih0NRGLGfmCXciyw__',
      logo: 'https://s3-alpha-sig.figma.com/img/0a97/bee0/ba771711c17f9b573620e9c39ee75371?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AaIqBKwZJBxD-AYIr1D7d-Z-tU9A4QIBUyszzsTsVZizP~YcsLXaaYNg7RPa9KLFNbjlb6o1dlvRj4xnQvG8VIKpThOeQx1BpwcAA6dnnXi0Fy82kW4OkQPf4vdo8UU01vpg50tFd85zpcPGfYitrrXI7qRctA0f0cGceOhaYnBVVrLP2ALIEMUQ8otnv7v6hkXG7O~wtmP982yugkwlmjf0eSf155azufB4AmbUPrl8q1Jd6XRkHBCXFNmg03L7jtWSwFvpFl4gk2rNCoyQHU50~aWwtJmn0WqoGC-SyEjL6AMcU6FbN-OGFnwCFjfeKR76n2hGjcKMRC2-r0phng__',
      title: '10% off Cat & the Fiddle Cakes',
      desc: 'Enter promo code UOICATFIDDLE10 at checkout on www.catandthefiddle to enjoy the offer.',
      btn: 'Shop Now',
    },
    {
      img: 'https://s3-alpha-sig.figma.com/img/8287/f018/93dadb02e8922d16e90a39a645f04366?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FvBJcOyMPYJHiTC4X9l8Vkx13O3GdrJe7wpaabFamd~EcJzIoVR3jvqG2QnO98WXacHJpRnCEAR9wgS5aRkeBPplVEFH9F6t2AS56pHoZxV498Os0MDS0UrLQaG-4rGLR7p2LOOQ4EEXMvv09A6st8XqSQMUGZSuV1J8vH27mPhK6-udbegy~TWKGmOZ7VDiVZgGVt9isDg7u5LTihrUGxbcKtABoSkFE0CaO36TjvHaRRwbgMesxCzovYOA~~utbTHg1RZiBZqTUFxDDUgxybvkMNkYLCoH9~uQGrAS~8fPPx-ljm8iDmFwEdLR-L0rzG-u-lR9g0HBGraZdeAajA__',
      logo: 'https://s3-alpha-sig.figma.com/img/3aa6/8189/82dafd597dffb5e00a3a6d89d162beec?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TOw1O9cQBy-MGUjIPJVPwkDsmgJIL4PN5crLB9WM5I73zJiYN1UpUItZE1A6iz9GEBi-E6tJjUDsrH4nAjaRlDbhKLQ7lENfpvExbfAW6nlRTMUyJscu5BqxVgmO1bSq1xhwnJqwxKZSWwKspmbPRjudGhOnEL3qq4YTvu9CygBP~P8nUDXRTFj2a0LBGNoig~VmfFFxZzTVpkgAP0SqKBi4cI-fKJQOspOmYGSqozxVqXI66MvEFy4~dbIoCUOV68OvGqYh4yoploGPlWvii7by00kY6JHa3c~PaAWEMihmm2S9InzyDdfq7y0~-zJqdGjbe-qHdeqW-Iq6-kRMEg__',
      title: '$5 Credit Reward for HEYMAX New User Sign Up ',
      desc: 'Enter promo code UOIHEYMAX5 during registration to enjoy $5 credit.',
      btn: 'Sign Up',
    },
  ];

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden font-[Noto_Sans]">
      <div className="flex-1 flex flex-row overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`h-full shrink-0 flex flex-col bg-white border-r border-[#000000] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] transition-all duration-300 overflow-y-auto ${
            sidebarOpen ? 'w-[240px]' : 'w-[72px]'
          }`}
        >
          <div className="flex flex-col gap-[24px] p-[24px] px-[16px] flex-1">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[51px] object-contain" />
              )}
            </div>
            <nav className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[12px] px-[12px] py-[10px] rounded-[8px] bg-white bg-[linear-gradient(to_right,rgba(0,94,184,0.10)_1%,rgba(92,85,235,0.10)_100%)] cursor-pointer">
                <Home className="w-[24px] h-[24px] text-[#005eb8] shrink-0" />
                {sidebarOpen && <span className="text-[16px] font-medium leading-[24px] text-[#005eb8]">Dashboard</span>}
              </div>
              <div className="flex items-center gap-[12px] px-[12px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#f5f5f5]">
                <Shield className="w-[24px] h-[24px] text-[#212121] shrink-0" />
                {sidebarOpen && <span className="text-[16px] leading-[24px] text-[#212121]">Policies</span>}
              </div>
              <div className="flex items-center gap-[12px] px-[12px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#f5f5f5]">
                <File className="w-[24px] h-[24px] text-[#212121] shrink-0" />
                {sidebarOpen && <span className="text-[16px] leading-[24px] text-[#212121]">Claims</span>}
              </div>
              <div className="flex items-center gap-[12px] px-[12px] py-[10px] rounded-[8px] cursor-pointer hover:bg-[#f5f5f5]">
                <Settings className="w-[24px] h-[24px] text-[#212121] shrink-0" />
                {sidebarOpen && <span className="text-[16px] leading-[24px] text-[#212121]">Rewards</span>}
              </div>
            </nav>
          </div>
          <div className="flex items-center justify-end gap-[12px] px-[16px] py-[24px]">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="cursor-pointer hover:opacity-70">
              <PanelLeft className="w-[24px] h-[24px] text-[#212121]" />
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="w-full flex items-center justify-between px-[24px] py-[12px] bg-white border-b border-[#000000] h-[56px] shrink-0">
            <div className="flex-1" />
            <div className="flex items-center gap-[20px]">
              <HelpCircle className="w-[24px] h-[24px] text-[#212121] cursor-pointer" />
              <Bell className="w-[24px] h-[24px] text-[#212121] cursor-pointer" />
              <div className="w-px h-[32px] bg-black/[0.09] rounded-full" />
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-[56px] h-[32px] bg-[#b3d1ff] rounded-full cursor-pointer hover:opacity-90"
              >
                <span className="text-[14px] font-medium text-[#005eb8]">CW</span>
              </button>
            </div>
          </header>

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto bg-white bg-[linear-gradient(to_bottom,rgba(0,94,184,0.07)_0%,rgba(92,85,235,0.07)_73%)]">
            <div className="max-w-[980px] mx-auto px-[32px] py-[48px] pb-[100px] flex flex-col gap-[28px]">

              {/* Error banner */}
              {error && (
                <div className="w-full flex items-center justify-between px-[16px] py-[12px] bg-red-50 border border-red-200 rounded-[8px]">
                  <span className="text-[14px] text-[#dc3545]">{error}</span>
                  <button
                    onClick={handleRefresh}
                    className="text-[14px] font-medium text-[#005eb8] underline cursor-pointer ml-[16px]"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Greeting */}
              <div className="flex flex-col gap-[12px]">
                <h1 className="text-[32px] font-bold leading-[38.4px] text-[#212121]">
                  {loading && !model
                    ? 'Good evening, …'
                    : model
                    ? `${model.greeting}, ${model.userName} 👋`
                    : 'Good evening, Chris 👋'}
                </h1>
                <p className="text-[16px] leading-[24px] text-[#6e6e6e]">Here's an overview of your insurance policies and recent activities</p>
              </div>

              {/* Banner */}
              <div className="w-full h-[270px] rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                <img src="https://s3-alpha-sig.figma.com/img/b174/518e/b937b0d57f4c2d0945d9af6744ea37cb?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=IgUA6SYvFf2bjGgsXM9J5LdtV64i7P4flXUmwMMHKPU2p-1U2k5xNVoMDLJGb36~0R9fhLA3-R4J8Oa6ZcLqag1QpNk-HKKxxuU-CGLDPXJ2bCTGjAYI75AgmPGXwCbFnru0pQrP17-RGZWVmZztqjrrj0iyzMaGAQi~e3rOYgP~wEvKIk~GREpl6aAlwcSxDSPWAwZ2HudtFnl80kbsFHUXAwYD7eLzdB1NQekU82kBZTpg1MxSE~pEY11CYUeEZ84SO-hyRPP68HVlYDyWBWmAFvksSIFj7q4WsTeptzmtxQeWEv2o2YTErSwcjm4BaJC1BmcmX7hfIVbtkZtFbw__" alt="Marketing Banner" className="w-full h-full object-cover" />
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-[20px]">
                <h2 className="text-[20px] font-bold leading-[24px] text-[#212121]">Quick Actions</h2>
                <div className="flex flex-col md:flex-row gap-[20px]">
                  {[
                    { title: 'Submit Claim', desc: 'Prepare documents for claims' },
                    { title: 'Buy New Policy', desc: 'Explore a wide range of policies' },
                    { title: 'Help & Support', desc: 'Learn more about our FAQs' },
                  ].map(action => (
                    <div
                      key={action.title}
                      className="flex-1 flex flex-col gap-[24px] p-[16px] bg-white rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90"
                    >
                      <div className="flex items-start gap-[12px]">
                        <div className="w-[24px] h-[24px] flex items-center justify-center shrink-0">
                          <File className="w-[20px] h-[20px] text-[#212121]" />
                        </div>
                        <div className="flex flex-col gap-[4px]">
                          <span className="text-[16px] font-medium leading-[24px] text-[#212121]">{action.title}</span>
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e]">{action.desc}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Your Coverage */}
              <div className="flex flex-col gap-[20px]">
                <div className="flex items-center gap-[28px]">
                  <div className="flex items-center gap-[8px] flex-1">
                    <span className="text-[20px] font-bold leading-[24px] text-[#212121]">Your Coverage</span>
                    <span className="text-[20px] leading-[24px] text-[#6e6e6e]">(5)</span>
                  </div>
                  <button className="flex items-center gap-[4px] cursor-pointer hover:opacity-70">
                    <span className="text-[14px] text-[#0d6efd]">View All</span>
                    <ArrowRight className="w-[16px] h-[16px] text-[#0d6efd]" />
                  </button>
                </div>

                {loading && !model ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-[260px] bg-white rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                    {coverageCards.map(card => (
                      <div
                        key={card.id}
                        className="flex flex-col rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer"
                        onClick={() => card.productCode && navigate(`/product/${card.productCode}`)}
                      >
                        {/* Card header */}
                        <div className="flex items-center gap-[8px] px-[16px] py-[16px] bg-white border-b border-[#000000]">
                          <div className="flex items-center gap-[8px] flex-1">
                            <div className="w-[24px] h-[24px] flex items-center justify-center">{card.icon}</div>
                            <span className="text-[16px] font-medium leading-[24px] text-[#212121]">{card.title}</span>
                          </div>
                          {card.covered ? (
                            <div className="flex items-center gap-[4px] px-[8px] py-[4px] bg-[#005eb8] rounded-[24px]">
                              <ShieldCheck className="w-[12px] h-[12px] text-white" />
                              <span className="text-[12px] font-medium text-white">COVERED</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-[4px] px-[8px] py-[4px] bg-[#f5f5f5] rounded-[24px]">
                              <span className="text-[12px] font-medium text-[#8d8d8d]">NOT COVERED</span>
                            </div>
                          )}
                        </div>
                        {/* Card body */}
                        <div className="flex-1 p-[16px] bg-white">
                          {card.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rewards */}
              <div className="flex flex-col gap-[20px]">
                <div className="flex items-center gap-[28px]">
                  <span className="text-[20px] font-bold leading-[24px] text-[#212121] flex-1">Rewards</span>
                  <button className="flex items-center gap-[4px] cursor-pointer hover:opacity-70">
                    <span className="text-[14px] text-[#0d6efd]">View All</span>
                    <ArrowRight className="w-[16px] h-[16px] text-[#0d6efd]" />
                  </button>
                </div>
                <div className="flex flex-row gap-[20px] overflow-x-auto scrollbar-hide pb-[8px]">
                  {rewardCards.map((r, i) => (
                    <div key={i} className="flex flex-col w-[313px] shrink-0 rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                      <div className="relative">
                        <img src={r.img} alt={r.title} className="w-[313px] h-[176px] object-cover rounded-tl-[8px] rounded-tr-[8px]" />
                        <img src={r.logo} alt="logo" className="absolute bottom-[-26px] left-[16px] w-[52px] h-[52px] rounded-full object-cover border-2 border-white" />
                      </div>
                      <div className="flex flex-col justify-between gap-[24px] p-[16px] pt-[36px] bg-white flex-1 rounded-bl-[8px] rounded-br-[8px]">
                        <div className="flex flex-col gap-[12px]">
                          <span className="text-[16px] font-medium leading-[24px] text-[#212121]">{r.title}</span>
                          <span className="text-[14px] leading-[21px] text-[#6e6e6e]">{r.desc}</span>
                        </div>
                        <button className="flex items-center justify-center px-[16px] py-[12px] bg-[#005eb8] rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 w-fit">
                          <span className="text-[16px] font-medium leading-[24px] text-white">{r.btn}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="flex items-center justify-center w-[40px] h-[40px] shrink-0 self-center cursor-pointer hover:opacity-70">
                    <ChevronRight className="w-[40px] h-[40px] text-[#212121]" />
                  </button>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full flex items-center justify-between px-[24px] py-[16px] bg-[#005eb8] h-[53px] shrink-0">
        <span className="text-[14px] leading-[21px] text-white">Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
        <span className="text-[14px] leading-[21px] text-white text-right">All Rights Reserved.</span>
      </div>
    </div>
  );
}