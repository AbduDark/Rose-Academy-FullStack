
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    gender: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // مسح الخطأ عند تغيير القيمة
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const result = await register(formData);

    if (result.success) {
      // توجيه للتحقق من الإيميل
      navigate('/auth/verify-email', { 
        state: { email: formData.email, message: result.data.message } 
      });
    } else {
      if (typeof result.error === 'object') {
        setErrors(result.error);
      } else {
        setErrors({ general: result.error });
      }
    }
    setLoading(false);
  };

  return (
    <div className="absolute max-w-[430px] border w-full p-[30px] rounded-md bg-white/30">
      <div className="w-full">
        <header className="text-[28px] font-semibold text-[#232836] text-center">
          تسجيل جديد
        </header>
        
        {errors.general && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
          </div>
        )}

        <form className="mt-[30px]" onSubmit={handleSubmit}>
          <div className="relative h-[50px] w-full mt-[20px] rounded-md">
            <input
              type="text"
              name="name"
              placeholder="الاسم الكامل"
              value={formData.name}
              onChange={handleInputChange}
              className="h-full w-full text-base font-normal rounded-md outline-none px-[15px] border border-solid border-[#CACACA] focus:border-b-2"
              required
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name[0]}</span>}
          </div>

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
            {errors.email && <span className="text-red-500 text-sm">{errors.email[0]}</span>}
          </div>

          <div className="relative h-[50px] w-full mt-[20px] rounded-md">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="h-full w-full text-base font-normal rounded-md outline-none px-[15px] border border-solid border-[#CACACA] focus:border-b-2"
              required
            >
              <option value="">اختر الجنس</option>
              <option value="male">ذكر</option>
              <option value="female">أنثى</option>
            </select>
            {errors.gender && <span className="text-red-500 text-sm">{errors.gender[0]}</span>}
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
            {errors.password && <span className="text-red-500 text-sm">{errors.password[0]}</span>}
          </div>

          <div className="relative h-[50px] w-full mt-[20px] rounded-md">
            <input
              type="password"
              name="password_confirmation"
              placeholder="تأكيد كلمة المرور"
              value={formData.password_confirmation}
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
              {loading ? "جاري التسجيل..." : "تسجيل"}
            </button>
          </div>
        </form>

        <div className="text-center mt-[10px]">
          <span className="text-sm font-normal text-[#232836]">
            لديك حساب بالفعل؟{" "}
            <Link
              to="/auth/login"
              className="text-[#0171d3] cursor-pointer no-underline hover:underline"
            >
              تسجيل الدخول
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
