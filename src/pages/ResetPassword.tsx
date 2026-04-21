import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';

type ResetStep = 'login-error' | 'new-device-otp' | 'forgot-password' | 'reset-password' | 'login-success';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<ResetStep>('login-error');
  const [nric, setNric] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError] = useState('Wrong password');
  const [otpCode, setOtpCode] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [emailSentToast, setEmailSentToast] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [passwordUpdatedToast, setPasswordUpdatedToast] = useState(false);

  const logoSrc = 'https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__';
  const heroSrc = 'https://s3-alpha-sig.figma.com/img/aab6/0921/4d0afc4bf990cf584c0c3c3e94ab342d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=evV6xk8x8mXwhl5DIkzHg2YvXWJLdjUEE4QzPiw6skwI8IIpjBvimdVwPWI3lvrYlZLeVrGLuFRhJSyQ4GLkoIysQRqfpOJ8dmtuYTF0s9CS2fmpshgKg~eT~~cvuqARWBTTgJbpm4EKFFQe~kRYW2YGiRqEXepHLEst6q0xBDgHIiQabxEZE9VchjDafhutP34bXOqxyem451w8M82FG1pcJ~uI8MojTj-DkPpVSG9U6c-dXDkuPq2ZLzeGBzySFlIhRmWkDUzHDYlXHEUa6ro4WFSx71OMT6F2uglnWSRUKZQXRbtGsylqIereApngRcCLus72riI1Hx4ANuxYcA__';

  const handleSendEmail = () => {
    setEmailSentToast(true);
    setTimeout(() => {
      setEmailSentToast(false);
      setStep('login-success');
    }, 2000);
  };

  const handleConfirmReset = () => {
    setPasswordUpdatedToast(true);
    setTimeout(() => {
      setPasswordUpdatedToast(false);
      setStep('login-success');
    }, 2000);
  };

  const handleVerify = () => {
    setTimeout(() => navigate('/dashboard'), 500);
  };

  const handleLogin = () => {
    setTimeout(() => navigate('/dashboard'), 500);
  };

  const renderCard = (content: React.ReactNode) => (
    <div className="w-full max-w-[420px] bg-white/70 bg-[radial-gradient(circle,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.08)_100%)] rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-[32px] px-[24px] flex flex-col gap-[32px]">
      {content}
    </div>
  );

  return (
    <div className="min-h-screen w-full flex flex-col font-[Noto_Sans] relative">
      {/* Toasts */}
      {emailSentToast && (
        <div className="absolute top-[24px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-[8px] px-[16px] py-[8px] bg-[#d8ffe2] rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <div className="w-[16px] h-[16px] rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-[10px]">✓</span>
          </div>
          <span className="text-[14px] leading-[21px] text-[#212121]">Password reset email sent.</span>
        </div>
      )}
      {passwordUpdatedToast && (
        <div className="absolute top-[24px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-[8px] px-[16px] py-[8px] bg-[#d8ffe2] rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <div className="w-[16px] h-[16px] rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-[10px]">✓</span>
          </div>
          <span className="text-[14px] leading-[21px] text-[#212121]">Password updated successfully.</span>
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Form side */}
        <div className="w-full md:flex-1 flex flex-col items-center justify-center bg-white bg-[linear-gradient(to_bottom,rgba(0,94,184,0.07)_0%,rgba(92,85,235,0.07)_73%)] py-[32px] px-[16px] gap-[24px]">

          {/* Step: Login with wrong password */}
          {(step === 'login-error' || step === 'login-success') && renderCard(
            <>
              <div className="flex flex-col items-center gap-[12px]">
                <img src={logoSrc} alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                <p className="text-[28px] md:text-[32px] font-bold leading-[38.4px] text-[#212121] text-center">Welcome to UOI Customer Portal</p>
                <p className="text-[14px] md:text-[16px] leading-[24px] text-[#212121] text-center">Manage all your policies in one portal.</p>
              </div>
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
                        onChange={e => setPassword(e.target.value)}
                        className={`w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border ${step === 'login-error' && password ? 'border-[#dc3545]' : 'border-[#000000]'} text-[16px] leading-[24px] text-[#212121] outline-none pr-[48px]`}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-[12px] top-1/2 -translate-y-1/2">
                        {showPassword ? <EyeOff className="w-[24px] h-[24px]" /> : <Eye className="w-[24px] h-[24px]" />}
                      </button>
                    </div>
                  </div>
                  {step === 'login-error' && password && (
                    <div className="flex items-center gap-[8px]">
                      <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center shrink-0">
                        <span className="text-white text-[10px] font-bold">!</span>
                      </div>
                      <span className="text-[12px] leading-[16.8px] text-[#dc3545]">Wrong password</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setStep('forgot-password')}
                  className="text-[14px] leading-[21px] text-[#6e6e6e] underline text-left cursor-pointer w-fit"
                >
                  Forgot password?
                </button>
              </div>
              <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
              >
                <span className="text-[16px] font-medium leading-[24px] text-white">Login</span>
              </button>
            </>
          )}

          {/* Step: New device OTP */}
          {step === 'new-device-otp' && renderCard(
            <>
              <div className="flex flex-col items-center gap-[12px]">
                <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                <p className="text-[28px] md:text-[32px] font-bold leading-[38.4px] text-[#212121] text-center">Logging in on a new device?</p>
                <p className="text-[14px] md:text-[16px] leading-[24px] text-[#212121] text-center">We've sent a one-time password (OTP) to<br />ch****@gmail.com</p>
              </div>
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[12px]">
                  <label className="text-[14px] leading-[21px] text-[#212121]">Enter Code</label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value)}
                    className="w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] outline-none"
                  />
                </div>
                <span className="text-[14px] leading-[21px] text-[#6e6e6e] cursor-pointer">
                  Didn't receive a code?{' '}
                  <span className="text-[#0d6efd] underline">Resend</span>
                </span>
              </div>
              <button
                onClick={handleVerify}
                className="w-full flex items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
              >
                <span className="text-[16px] font-medium leading-[24px] text-white">Verify</span>
              </button>
            </>
          )}

          {/* Step: Forgot Password */}
          {step === 'forgot-password' && renderCard(
            <>
              <button
                onClick={() => setStep('login-error')}
                className="flex items-center gap-[4px] text-[14px] leading-[21px] text-[#6e6e6e] cursor-pointer w-fit"
              >
                <ChevronLeft className="w-[20px] h-[20px]" />
                <span>Back</span>
              </button>
              <div className="flex flex-col items-center gap-[12px]">
                <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                <p className="text-[28px] md:text-[32px] font-bold leading-[38.4px] text-[#212121] text-center">Forgot Password</p>
                <p className="text-[14px] md:text-[16px] leading-[24px] text-[#212121] text-center">Enter your account's email address and we'll send you an email to reset password</p>
              </div>
              <div className="flex flex-col gap-[12px]">
                <label className="text-[14px] leading-[21px] text-[#212121]">Email</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  className="w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] outline-none"
                />
              </div>
              <button
                onClick={handleSendEmail}
                className="w-full flex items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
              >
                <span className="text-[16px] font-medium leading-[24px] text-white">Send Email</span>
              </button>
            </>
          )}

          {/* Step: Reset Password */}
          {step === 'reset-password' && renderCard(
            <>
              <button
                onClick={() => setStep('login-error')}
                className="flex items-center gap-[4px] text-[14px] leading-[21px] text-[#6e6e6e] cursor-pointer w-fit"
              >
                <ChevronLeft className="w-[20px] h-[20px]" />
                <span>Back to Login</span>
              </button>
              <div className="flex flex-col items-center gap-[12px]">
                <img src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__" alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                <p className="text-[28px] md:text-[32px] font-bold leading-[38.4px] text-[#212121] text-center">Reset Password</p>
                <p className="text-[14px] md:text-[16px] leading-[24px] text-[#212121] text-center">Check that information you provide is accurate before proceeding.</p>
              </div>
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[12px]">
                  <label className="text-[14px] leading-[21px] text-[#212121]">Password</label>
                  <div className="relative w-full">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] outline-none pr-[48px]"
                    />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-[12px] top-1/2 -translate-y-1/2">
                      {showNewPassword ? <EyeOff className="w-[24px] h-[24px]" /> : <Eye className="w-[24px] h-[24px]" />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <label className="text-[14px] leading-[21px] text-[#212121]">Confirm Password</label>
                  <div className="relative w-full">
                    <input
                      type={showConfirmNewPassword ? 'text' : 'password'}
                      value={confirmNewPassword}
                      onChange={e => setConfirmNewPassword(e.target.value)}
                      className="w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] outline-none pr-[48px]"
                    />
                    <button type="button" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} className="absolute right-[12px] top-1/2 -translate-y-1/2">
                      {showConfirmNewPassword ? <EyeOff className="w-[24px] h-[24px]" /> : <Eye className="w-[24px] h-[24px]" />}
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={handleConfirmReset}
                className="w-full flex items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
              >
                <span className="text-[16px] font-medium leading-[24px] text-white">Confirm</span>
              </button>
            </>
          )}

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
          <img src={heroSrc} alt="Travel" className="absolute inset-0 w-full h-full object-cover" />
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