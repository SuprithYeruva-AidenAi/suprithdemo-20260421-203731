import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock } from 'lucide-react';

type LoginView = 'landing' | 'nric-login';

export default function Login() {
  const navigate = useNavigate();
  const [view, setView] = useState<LoginView>('landing');
  const [nric, setNric] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleNricLogin = () => {
    if (!nric) return;
    if (!password) return;
    setPasswordError('');
    setTimeout(() => navigate('/dashboard'), 500);
  };

  const handleForgotPassword = () => {
    navigate('/login-with-nric-fin-1-4-reset-password');
  };

  if (view === 'landing') {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#ffffff] bg-[linear-gradient(to_bottom,rgba(0,94,184,0.07)_0%,rgba(92,85,235,0.07)_73%)] font-[Noto_Sans]">
        <div className="w-full max-w-[420px] mx-auto px-[16px] flex flex-col items-center gap-[24px] py-[24px]">
          <div className="w-full bg-white/70 bg-[radial-gradient(circle,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.08)_100%)] rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-[32px] flex flex-col items-center gap-[32px]">
            <div className="flex flex-col items-center gap-[12px] w-full">
              <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
              <p className="text-[28px] font-bold leading-[33.6px] text-[#212121] text-center">Welcome to UOI Customer Portal</p>
              <p className="text-[14px] leading-[21px] text-[#212121] text-center">Manage all your policies in one portal.</p>
            </div>
            <div className="flex flex-col items-center gap-[24px] w-full">
              <img src="https://s3-alpha-sig.figma.com/img/5066/4d16/b727ff45ca18ad961c6d3df8c1fcd1b3?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FjqHumJtGyZGxD-rXOUogsw~Ee7zhArPCvFgWkRj7iPylXJtIpjUblIJEcXpIrx3-yZ~InFFfJXFj0J1AEfu8FUHqPgv3QHUJhGRbc~MoPLAH7I515FGP5c6H8orlkc2IDeON6kPGJqe3TJVYUcROI7GtBfB8J~5Z~8tkHnUdAvEkGlzd7-~MJDpCW7zcbZRCGHmDVLJudLB3woye9m0NF-qCKMKLH9VIdBRLKM5vR0GqLNMkdX1fXHty5PnjsXFHGW9SgcrSZ1J~Dg2AJgwYQDlSgLAk6sqoBcqGmqBI0YnL9W4YxIT5quGUQdrmvhDg0sBJxAL7CMrx4OXyh9e0g__" alt="Singpass" className="w-[200px] h-[42px] object-contain cursor-pointer" />
              <div className="flex items-center gap-[16px] w-full">
                <div className="flex-1 h-px bg-[#e0e0e0]" />
                <span className="text-[14px] leading-[21px] text-[#212121]">or</span>
                <div className="flex-1 h-px bg-[#e0e0e0]" />
              </div>
              <button
                onClick={() => setView('nric-login')}
                className="flex items-center justify-center px-[40px] py-[12px] gap-[10px] w-[200px] bg-white rounded-[8px] border border-[#005eb8] cursor-pointer hover:opacity-90 transition-opacity"
              >
                <span className="text-[16px] font-medium leading-[24px] text-[#005eb8]">Log in with NRIC/FIN</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-[12px] w-full max-w-[420px]">
            <p className="text-[14px] leading-[21px] text-[#6e6e6e] text-center">
              Don't have an account?{' '}
              <span className="text-[#005eb8] underline cursor-pointer" onClick={() => navigate('/create-account')}>Create an account</span>
            </p>
            <p className="text-[14px] leading-[21px] text-[#6e6e6e] text-center">
              If you're experiencing login issues, please contact us at{' '}
              <a href="mailto:help@uoi.com.sg" className="text-[#005eb8]">help@uoi.com.sg</a>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // NRIC/FIN Login view (desktop split layout)
  return (
    <div className="min-h-screen w-full flex flex-col font-[Noto_Sans]">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Form side */}
        <div className="w-full md:flex-1 flex flex-col items-center justify-center bg-white bg-[linear-gradient(to_bottom,rgba(0,94,184,0.07)_0%,rgba(92,85,235,0.07)_73%)] py-[32px] px-[16px] gap-[24px]">
          <div className="w-full max-w-[420px] bg-white/70 bg-[radial-gradient(circle,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.08)_100%)] rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-[32px] px-[24px] flex flex-col gap-[32px]">
            {/* Header */}
            <div className="flex flex-col items-center gap-[12px]">
              <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
              <p className="text-[28px] md:text-[32px] font-bold leading-[38.4px] text-[#212121] text-center">Welcome to UOI Customer Portal</p>
              <p className="text-[14px] md:text-[16px] leading-[24px] text-[#212121] text-center">Manage all your policies in one portal.</p>
            </div>
            {/* Fields */}
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[12px]">
                <label className="text-[14px] leading-[21px] text-[#212121]">NRIC/FIN</label>
                <input
                  type="text"
                  value={nric}
                  onChange={e => setNric(e.target.value)}
                  className="w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] outline-none"
                />
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-col gap-[12px]">
                  <label className="text-[14px] leading-[21px] text-[#212121]">Password</label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => { setPassword(e.target.value); setPasswordError(''); }}
                      className={`w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border ${passwordError ? 'border-[#dc3545]' : 'border-[#000000]'} text-[16px] leading-[24px] text-[#212121] outline-none pr-[48px]`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#212121]"
                    >
                      {showPassword ? <EyeOff className="w-[24px] h-[24px]" /> : <Eye className="w-[24px] h-[24px]" />}
                    </button>
                  </div>
                </div>
                {passwordError && (
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">!</span>
                    </div>
                    <span className="text-[12px] leading-[16.8px] text-[#dc3545]">{passwordError}</span>
                  </div>
                )}
              </div>
              <button
                onClick={handleForgotPassword}
                className="text-[14px] leading-[21px] text-[#6e6e6e] underline text-left cursor-pointer w-fit"
              >
                Forgot password?
              </button>
            </div>
            {/* Login button */}
            <button
              onClick={handleNricLogin}
              className="w-full flex items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="text-[16px] font-medium leading-[24px] text-white">Login</span>
            </button>
          </div>
          <div className="flex flex-col gap-[12px] w-full max-w-[420px]">
            <p className="text-[14px] leading-[21px] text-[#6e6e6e] text-center">
              Don't have an account?{' '}
              <span className="text-[#005eb8] underline cursor-pointer" onClick={() => navigate('/create-account')}>Create an account</span>
            </p>
            <p className="text-[14px] leading-[21px] text-[#6e6e6e] text-center">
              If you're experiencing login issues, please contact us at{' '}
              <a href="mailto:help@uoi.com.sg" className="text-[#005eb8]">help@uoi.com.sg</a>.
            </p>
          </div>
        </div>
        {/* Image side */}
        <div className="hidden md:block md:flex-1 relative">
          <img src="https://s3-alpha-sig.figma.com/img/aab6/0921/4d0afc4bf990cf584c0c3c3e94ab342d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=evV6xk8x8mXwhl5DIkzHg2YvXWJLdjUEE4QzPiw6skwI8IIpjBvimdVwPWI3lvrYlZLeVrGLuFRhJSyQ4GLkoIysQRqfpOJ8dmtuYTF0s9CS2fmpshgKg~eT~~cvuqARWBTTgJbpm4EKFFQe~kRYW2YGiRqEXepHLEst6q0xBDgHIiQabxEZE9VchjDafhutP34bXOqxyem451w8M82FG1pcJ~uI8MojTj-DkPpVSG9U6c-dXDkuPq2ZLzeGBzySFlIhRmWkDUzHDYlXHEUa6ro4WFSx71OMT6F2uglnWSRUKZQXRbtGsylqIereApngRcCLus72riI1Hx4ANuxYcA__" alt="Travel" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
      {/* Footer */}
      <div className="w-full flex items-center justify-between px-[24px] py-[16px] bg-[#005eb8] h-[53px]">
        <span className="text-[14px] leading-[21px] text-white">Copyright © 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.</span>
        <span className="text-[14px] leading-[21px] text-white text-right">All Rights Reserved.</span>
      </div>
    </div>
  );
}