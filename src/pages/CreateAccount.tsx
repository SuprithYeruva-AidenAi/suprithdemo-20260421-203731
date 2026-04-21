import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronLeft, Eye, EyeOff } from 'lucide-react';

type Step = 'step1' | 'step2-otp' | 'step3-password';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('step1');
  const [nric, setNric] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpToast, setOtpToast] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (val: string) => /^[^@]+@[^@]+\.[^@]+$/.test(val);

  const passwordChecks = {
    length: password.length >= 8,
    upperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
    numberSymbol: /[0-9!@#$%^&*]/.test(password),
  };
  const allChecks = passwordChecks.length && passwordChecks.upperLower && passwordChecks.numberSymbol;

  const handleGetOtp = () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }
    setEmailError('');
    setOtpSent(true);
    setOtpToast(true);
    setTimeout(() => setOtpToast(false), 3000);
  };

  const handleStep1Next = () => {
    if (!email) return;
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }
    setEmailError('');
    if (!otpSent) {
      handleGetOtp();
      return;
    }
    setStep('step2-otp');
  };

  const handleStep2Next = () => {
    if (!otp) return;
    setOtpError('');
    setStep('step3-password');
  };

  const handleCreateAccount = () => {
    let hasError = false;
    if (!allChecks) {
      setPasswordError('Password must be at least 8 characters and include letters and numbers.');
      hasError = true;
    } else {
      setPasswordError('');
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Password do not match, try again.');
      hasError = true;
    } else {
      setConfirmPasswordError('');
    }
    if (hasError) return;
    setTimeout(() => navigate('/login'), 800);
  };

  const logoSrc = 'https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ShoM0pDLFtIglvPWeRLcrNHkP-8DajZ~UfTydATZnIyvxRx0Q8vNaKu-xBitsol0veqqwq1r4p1azXwhatXwj7sKArxvuNthVWmFirx22koohe8997mFNM6GF2P9FJZQ6hnguVRCcCTWizRFgiWWnqabTviIJl1EuaMxA65dwinn4u47OVQuKOW4HPfBJ49i-x-lqHrsAbGLy9XfBAQqpYzMCSsmnWFH-jgrpSRysU3HqoilRLqyQb6LtiIX7mix4qKeTiJI50ywXWQYf5zHXGyqc7Ry5JQaJUdS88v~1e1Kd-i6t7RipipnfhyJG71UbhW-m-9vh~8Pv9t2nKWPxg__';
  const heroSrc = 'https://s3-alpha-sig.figma.com/img/aab6/0921/4d0afc4bf990cf584c0c3c3e94ab342d?Expires=1777852800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=evV6xk8x8mXwhl5DIkzHg2YvXWJLdjUEE4QzPiw6skwI8IIpjBvimdVwPWI3lvrYlZLeVrGLuFRhJSyQ4GLkoIysQRqfpOJ8dmtuYTF0s9CS2fmpshgKg~eT~~cvuqARWBTTgJbpm4EKFFQe~kRYW2YGiRqEXepHLEst6q0xBDgHIiQabxEZE9VchjDafhutP34bXOqxyem451w8M82FG1pcJ~uI8MojTj-DkPpVSG9U6c-dXDkuPq2ZLzeGBzySFlIhRmWkDUzHDYlXHEUa6ro4WFSx71OMT6F2uglnWSRUKZQXRbtGsylqIereApngRcCLus72riI1Hx4ANuxYcA__';

  return (
    <div className="min-h-screen w-full flex flex-col font-[Noto_Sans] relative">
      {/* OTP Toast */}
      {otpToast && (
        <div className="absolute top-[24px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-[8px] px-[16px] py-[8px] bg-[#d8ffe2] rounded-[8px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <div className="w-[16px] h-[16px] rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-[10px]">✓</span>
          </div>
          <span className="text-[14px] leading-[21px] text-[#212121]">OTP sent to email address.</span>
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Form side */}
        <div className="w-full md:flex-1 flex flex-col items-center justify-center bg-white bg-[linear-gradient(to_bottom,rgba(0,94,184,0.07)_0%,rgba(92,85,235,0.07)_73%)] py-[32px] px-[16px] gap-[24px]">

          {step === 'step1' && (
            <>
              <div className="w-full max-w-[420px] bg-white/70 bg-[radial-gradient(circle,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.08)_100%)] rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-[32px] px-[24px] flex flex-col gap-[32px]">
                <div className="flex flex-col items-center gap-[12px]">
                  <img src={logoSrc} alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                  <p className="text-[28px] md:text-[32px] font-bold leading-[38.4px] text-[#212121] text-center">Create Account</p>
                  <p className="text-[14px] md:text-[16px] leading-[24px] text-[#212121] text-center">Check that information you provide is accurate before proceeding.</p>
                </div>
                <div className="flex flex-col gap-[16px]">
                  {/* NRIC/FIN */}
                  <div className="flex flex-col gap-[12px]">
                    <label className="text-[14px] leading-[21px] text-[#212121]">NRIC/FIN</label>
                    <input
                      type="text"
                      value={nric}
                      onChange={e => setNric(e.target.value)}
                      className="w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] outline-none"
                    />
                  </div>
                  {/* Date of Birth */}
                  <div className="flex flex-col gap-[12px]">
                    <label className="text-[14px] leading-[21px] text-[#212121]">Date of Birth</label>
                    <div className="relative w-full">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                        className="w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000] text-[16px] leading-[24px] text-[#212121] outline-none pr-[48px]"
                      />
                      <Calendar className="absolute right-[16px] top-1/2 -translate-y-1/2 w-[24px] h-[24px] text-[#212121]" />
                    </div>
                  </div>
                  {/* Email Address */}
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex flex-col gap-[12px]">
                      <label className="text-[14px] leading-[21px] text-[#212121]">Email Address</label>
                      <div className="flex items-center gap-[8px] w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border border-[#000000]">
                        <input
                          type="email"
                          value={email}
                          onChange={e => { setEmail(e.target.value); setEmailError(''); }}
                          className={`flex-1 bg-transparent text-[16px] leading-[24px] text-[#212121] outline-none border-none`}
                        />
                        {!otpSent && (
                          <button
                            onClick={handleGetOtp}
                            className="flex items-center justify-center px-[16px] py-[8px] h-[32px] bg-white rounded-[8px] border border-[#005eb8] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] cursor-pointer hover:opacity-90 shrink-0"
                          >
                            <span className="text-[14px] font-medium leading-[21px] text-[#005eb8]">Get OTP</span>
                          </button>
                        )}
                      </div>
                    </div>
                    {emailError && (
                      <div className="flex items-center gap-[8px]">
                        <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center shrink-0">
                          <span className="text-white text-[10px] font-bold">!</span>
                        </div>
                        <span className="text-[12px] leading-[16.8px] text-[#dc3545]">{emailError}</span>
                      </div>
                    )}
                  </div>
                  {/* OTP field shown after OTP sent */}
                  {otpSent && (
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex flex-col gap-[12px]">
                        <input
                          type="text"
                          placeholder="Enter code"
                          value={otp}
                          onChange={e => { setOtp(e.target.value); setOtpError(''); }}
                          className={`w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border ${otpError ? 'border-[#dc3545]' : 'border-[#000000]'} text-[16px] leading-[24px] text-[#212121] outline-none`}
                        />
                      </div>
                      {otpError && (
                        <div className="flex items-center gap-[8px]">
                          <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center shrink-0">
                            <span className="text-white text-[10px] font-bold">!</span>
                          </div>
                          <span className="text-[12px] leading-[16.8px] text-[#dc3545]">{otpError}</span>
                        </div>
                      )}
                      <span className="text-[14px] leading-[21px] text-[#0d6efd] cursor-pointer" onClick={handleGetOtp}>Didn't receive a code? Resend</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    if (!validateEmail(email)) { setEmailError('Invalid email address'); return; }
                    if (!otpSent) { handleGetOtp(); return; }
                    setStep('step3-password');
                  }}
                  className="w-full flex items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <span className="text-[16px] font-medium leading-[24px] text-white">Next</span>
                </button>
              </div>
              <div className="flex flex-col gap-[12px] w-full max-w-[420px]">
                <p className="text-[14px] leading-[21px] text-[#6e6e6e] text-center">
                  Already have an account?{' '}
                  <span className="text-[#005eb8] underline cursor-pointer" onClick={() => navigate('/login')}>Log in</span>
                </p>
                <p className="text-[14px] leading-[21px] text-[#6e6e6e] text-center">
                  If you're experiencing login issues, please contact us at{' '}
                  <a href="mailto:help@uoi.com.sg" className="text-[#005eb8]">help@uoi.com.sg</a>.
                </p>
              </div>
            </>
          )}

          {step === 'step3-password' && (
            <>
              <div className="w-full max-w-[420px] bg-white/70 bg-[radial-gradient(circle,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.08)_100%)] rounded-[24px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-[32px] px-[24px] flex flex-col gap-[32px]">
                <button
                  onClick={() => setStep('step1')}
                  className="flex items-center gap-[4px] text-[14px] leading-[21px] text-[#6e6e6e] cursor-pointer w-fit"
                >
                  <ChevronLeft className="w-[20px] h-[20px]" />
                  <span>Back</span>
                </button>
                <div className="flex flex-col items-center gap-[12px]">
                  <img src={logoSrc} alt="UOI Logo" className="w-[100px] h-[50px] object-contain" />
                  <p className="text-[28px] md:text-[32px] font-bold leading-[38.4px] text-[#212121] text-center">Set Password</p>
                  <p className="text-[14px] md:text-[16px] leading-[24px] text-[#212121] text-center">Enter a password for your new account.</p>
                </div>
                <div className="flex flex-col gap-[32px]">
                  <div className="flex flex-col gap-[16px]">
                    {/* Password */}
                    <div className="flex flex-col gap-[12px]">
                      <label className="text-[14px] leading-[21px] text-[#212121]">Password</label>
                      <div className="relative w-full">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={e => { setPassword(e.target.value); setPasswordError(''); }}
                          className={`w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border ${passwordError ? 'border-[#dc3545]' : 'border-[#000000]'} text-[16px] leading-[24px] text-[#212121] outline-none pr-[48px]`}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-[12px] top-1/2 -translate-y-1/2">
                          {showPassword ? <EyeOff className="w-[24px] h-[24px]" /> : <Eye className="w-[24px] h-[24px]" />}
                        </button>
                      </div>
                      {passwordError && (
                        <div className="flex items-start gap-[8px]">
                          <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center shrink-0 mt-[1px]">
                            <span className="text-white text-[10px] font-bold">!</span>
                          </div>
                          <span className="text-[12px] leading-[16.8px] text-[#dc3545]">{passwordError}</span>
                        </div>
                      )}
                      {/* Password requirements */}
                      <div className="flex flex-col gap-[8px]">
                        <span className="text-[12px] leading-[16.8px] text-[#6e6e6e]">Your password must contain at least:</span>
                        {[
                          { key: 'length', label: '8 characters', met: passwordChecks.length },
                          { key: 'upperLower', label: '1 uppercase and lowercase letter', met: passwordChecks.upperLower },
                          { key: 'numberSymbol', label: '1 number or symbol (e.g. !, @, #)', met: passwordChecks.numberSymbol },
                        ].map(req => (
                          <div key={req.key} className="flex items-center gap-[8px]">
                            <div className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center ${req.met ? 'bg-green-500 border-green-500' : 'border-[#6e6e6e]'}`}>
                              {req.met && <span className="text-white text-[10px]">✓</span>}
                            </div>
                            <span className="text-[12px] leading-[16.8px] text-[#6e6e6e]">{req.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Confirm Password */}
                    <div className="flex flex-col gap-[12px]">
                      <label className="text-[14px] leading-[21px] text-[#212121]">Confirm Password</label>
                      <div className="relative w-full">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={e => { setConfirmPassword(e.target.value); setConfirmPasswordError(''); }}
                          className={`w-full h-[48px] px-[16px] py-[12px] bg-white rounded-[8px] border ${confirmPasswordError ? 'border-[#dc3545]' : 'border-[#000000]'} text-[16px] leading-[24px] text-[#212121] outline-none pr-[48px]`}
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-[12px] top-1/2 -translate-y-1/2">
                          {showConfirmPassword ? <EyeOff className="w-[24px] h-[24px]" /> : <Eye className="w-[24px] h-[24px]" />}
                        </button>
                      </div>
                      {confirmPasswordError && (
                        <div className="flex items-center gap-[8px]">
                          <div className="w-[16px] h-[16px] rounded-full bg-[#dc3545] flex items-center justify-center shrink-0">
                            <span className="text-white text-[10px] font-bold">!</span>
                          </div>
                          <span className="text-[12px] leading-[16.8px] text-[#dc3545]">{confirmPasswordError}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleCreateAccount}
                    className="w-full flex items-center justify-center px-[40px] py-[14px] gap-[10px] bg-[#005eb8] rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <span className="text-[16px] font-medium leading-[24px] text-white">Create Account</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-[12px] w-full max-w-[420px]">
                <p className="text-[14px] leading-[21px] text-[#6e6e6e] text-center">
                  Already have an account?{' '}
                  <span className="text-[#005eb8] underline cursor-pointer" onClick={() => navigate('/login')}>Log in</span>
                </p>
                <p className="text-[14px] leading-[21px] text-[#6e6e6e] text-center">
                  If you're experiencing login issues, please contact us at{' '}
                  <a href="mailto:help@uoi.com.sg" className="text-[#005eb8]">help@uoi.com.sg</a>.
                </p>
              </div>
            </>
          )}
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