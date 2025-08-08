
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // التحقق من حالة التحقق من الإيميل
      if (result.data.email_verification_required) {
        navigate('/auth/verify-email', { 
          state: { email: formData.email, message: result.data.message } 
        });
      } else {
        // التوجه للصفحة المطلوبة أو الصفحة الرئيسية
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      }
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="absolute max-w-[430px] border w-full p-[30px] rounded-md bg-white/30">
      <div className="w-full">
        <header className="text-[28px] font-semibold text-[#232836] text-center">
          تسجيل الدخول
        </header>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="mt-[30px]" onSubmit={handleSubmit}>
          <div className="relative h-[50px] w-full mt-[20px] rounded-md">
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              value={formData.email}
              onChange={handleInputChange}
              className="h-full w-full text-base font-normal rounded-md outline-none px-[15px] border border-solid border-[#CACACA] focus:border-b-2"
              required
            />
          </div>

          <div className="relative h-[50px] w-full mt-[20px] rounded-md">
            <input
              type="password"
              name="password"
              placeholder="كلمة المرور"
              value={formData.password}
              onChange={handleInputChange}
              className="h-full w-full text-base font-normal rounded-md outline-none px-[15px] border border-solid border-[#CACACA] focus:border-b-2"
              required
            />
          </div>

          <div className="relative h-[50px] w-full mt-[20px] rounded-md">
            <button 
              type="submit"
              disabled={loading}
              className="h-full w-full border-none text-base font-normal rounded-md text-white bg-[#0171d3] transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#016dcb] disabled:opacity-50"
            >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </div>
        </form>

        <div className="text-center mt-[10px]">
          <Link
            to="/auth/forgot-password"
            className="text-[#0171d3] text-sm cursor-pointer no-underline hover:underline"
          >
            نسيت كلمة المرور؟
          </Link>
        </div>

        <div className="text-center mt-[10px]">
          <span className="text-sm font-normal text-[#232836]">
            ليس لديك حساب؟{" "}
            <Link
              to="/auth/register"
              className="text-[#0171d3] cursor-pointer no-underline hover:underline"
            >
              تسجيل جديد
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
